# 1. 说明
    1). vee-validate是专门用来做表单验证的vue插件
    2). github地址: https://github.com/baianat/vee-validate

# 2. 使用
## 1). 引入
    下载: npm i vee-validate@2.2.15
    引入插件:
        import Vue from 'vue'
        import VeeValidate from 'vee-validate'
        
        Vue.use(VeeValidate)

## 2). 基本使用
     <input v-model="email" name="myemail" v-validate="'required|email'">
     <span style="color: red;" v-show="errors.has('myemail')">{{ errors.first('myemail') }}</span>
     
     <input v-model="phone" name="phone" v-validate="{required: true,regex: /^1\d{10}$/}">
     <span style="color: red;" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>
     

     问题: 提示文本默认都是英文的

## 3). 提示信息本地化
    import zh_CN from 'vee-validate/dist/locale/zh_CN'
    VeeValidate.Validator.localize('zh_CN', {
      messages: zh_CN.messages,
      attributes: {
        phone: '手机号',
        code: '验证码'
      }
    })

## 4). 自定义验证规则
    import VeeValidate from 'vee-validate'
    VeeValidate.Validator.extend('mobile', {
      validate: value => {
        return /^1\d{10}$/.test(value)
      },
      getMessage: field => field + '必须是11位手机号码'
    })

## 5). js api
     const success = await this.$validator.validateAll() // 对所有表单项进行验证
     const success = await this.$validator.validateAll(names) // 对指定的所有表单项进行验证
            names:[]

## 6). code
     <input type="tel" maxlength="6" placeholder="验证码"
           v-model="code" name="code" v-validate="{required: true,regex: /^\d{6}$/}" >
     <span style="color: red;" v-show="errors.has('code')">{{ errors.first('code') }}</span>

     <input type="tel" maxlength="11" placeholder="用户名"
           v-model="name" name="name" v-validate="'required'">
     <span style="color: red;" v-show="errors.has('name')">{{ errors.first('name') }}</span>

     <input :type="right?`text`:`password`"  maxlength="8" placeholder="密码"
           v-model="pwd" name="pwd" v-validate="'required'">
     <span style="color: red;" v-show="errors.has('pwd')">{{ errors.first('pwd') }}</span>

     <input type="text" maxlength="4" placeholder="验证码"
            v-model="captcha" name="captcha" v-validate="{required: true,regex: /^[0-9a-zA-Z]{4}$/}">
     <span style="color: red;" v-show="errors.has('captcha')">{{ errors.first('captcha') }}</span>












