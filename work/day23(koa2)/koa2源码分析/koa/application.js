// 1. 边界相关的源码统一先过滤掉
// 2. debugger相关的源码也先过滤掉
// 3. 兼容性相关的代码也不要看

'use strict';
const isGeneratorFunction = require('is-generator-function');
const debug = require('debug')('koa:application');
const onFinished = require('on-finished');
const statuses = require('statuses');
const Emitter = require('events');
const util = require('util');
const Stream = require('stream');
const http = require('http');
const only = require('only');
const convert = require('koa-convert');
const deprecate = require('depd')('koa');
const { HttpError } = require('http-errors');


const compose = require('koa-compose');
const response = require('./response');
const context = require('./context');
const request = require('./request');

module.exports = class Application extends Emitter {

  //构造器在new Application会被调用
  constructor(options) {
    super();
    options = options || {};
    this.proxy = options.proxy || false;
    this.subdomainOffset = options.subdomainOffset || 2;
    this.proxyIpHeader = options.proxyIpHeader || 'X-Forwarded-For';
    this.maxIpsCount = options.maxIpsCount || 0;
    this.env = options.env || process.env.NODE_ENV || 'development';
    if (options.keys) this.keys = options.keys;
    // util.inspect.custom support for node 6+
    /* istanbul ignore else */
    if (util.inspect.custom) {
      this[util.inspect.custom] = this.inspect;
    }


    //下述4行是koa的核心代码
    this.middleware = [];
    this.context = Object.create(context);
    this.request = Object.create(request);
    this.response = Object.create(response);
  }

  //往中间件数组中塞入中间件
  use(fn) {
        if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
        if (isGeneratorFunction(fn)) {
            deprecate('Support for generators will be removed in v3. ' +
                'See the documentation for examples of how to convert old middleware ' +
                'https://github.com/koajs/koa/blob/master/docs/migration.md');
            fn = convert(fn);
        }
        debug('use %s', fn._name || fn.name || '-');


        this.middleware.push(fn);
        return this;
    }

  //启动服务
  listen(...args) {
    debug('listen');
    //使用原生的语法创建出一个服务
    //this.callback() 返回一个函数  而且当前返回的这个函数 是每一次请求的回调函数
    const server = http.createServer(this.callback());
    //使用原生的语法开启一个服务
    return server.listen(...args);
  }

  //提供服务对应的回调
  callback() {
        //callback的返回值(函数) 是每一次请求的回调函数
        //compose 中间件的处理
        //fn : compose函数返回的一个函数
        const fn = compose(this.middleware);

        if (!this.listenerCount('error')) this.on('error', this.onerror);

        //每一次请求的回调函数  请求达到后 当前函数要被放进队列 最终被执行掉
        const handleRequest = (req, res) => {
            //每一次http请求 我们都会拿到一个koa的上下文
            const ctx = this.createContext(req, res);
            //当前创建出来的ctx 就是之后中间件的第一个参数
            return this.handleRequest(ctx, fn);
        };

        return handleRequest;
    }

    //创建koa的上下文的
    createContext(req, res) {
        //当前函数中的this是app(Application实例对象)
        const context = Object.create(this.context);
        const request = context.request = Object.create(this.request);
        const response = context.response = Object.create(this.response);

        context.app = request.app = response.app = this;
        context.req = request.req = response.req = req;
        context.res = request.res = response.res = res;

        request.ctx = response.ctx = context;
        request.response = response;
        response.request = request;

        context.originalUrl = request.originalUrl = req.url;
        context.state = {};
        return context;
    }

    //每一次请求过来的时候 当前函数也会被执行
    handleRequest(ctx, fnMiddleware) {
      //fnMiddleware:compse函数提供的函数
        const res = ctx.res;
        res.statusCode = 404;
        const onerror = err => ctx.onerror(err);
        const handleResponse = () => respond(ctx);
        onFinished(res, onerror);
        return fnMiddleware(ctx).then(handleResponse).catch(onerror);
    }















  toJSON() {
    return only(this, [
      'subdomainOffset',
      'proxy',
      'env'
    ]);
  }
  inspect() {
    return this.toJSON();
  }
  onerror(err) {
    // When dealing with cross-globals a normal `instanceof` check doesn't work properly.
    // See https://github.com/koajs/koa/issues/1466
    // We can probably remove it once jest fixes https://github.com/facebook/jest/issues/2549.
    const isNativeError =
      Object.prototype.toString.call(err) === '[object Error]' ||
      err instanceof Error;
    if (!isNativeError) throw new TypeError(util.format('non-error thrown: %j', err));

    if (404 === err.status || err.expose) return;
    if (this.silent) return;

    const msg = err.stack || err.toString();
    console.error(`\n${msg.replace(/^/gm, '  ')}\n`);
  }
};


//成功流程的最后一步
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' === ctx.method) {
    if (!res.headersSent && !ctx.response.has('Content-Length')) {
      const { length } = ctx.response;
      if (Number.isInteger(length)) ctx.length = length;
    }
    return res.end();
  }

  // status body
  if (null == body) {
    if (ctx.response._explicitNullBody) {
      ctx.response.remove('Content-Type');
      ctx.response.remove('Transfer-Encoding');
      return res.end();
    }
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' === typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}

module.exports.HttpError = HttpError;
