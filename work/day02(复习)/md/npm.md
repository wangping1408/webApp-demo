### 官方文档
    https://www.npmjs.cn/

### 语义化版本号
    版本号: x.y.z;
        升z位 : 解决bug
        升y位 : 新增功能 / 新增api
        升x为 : 工具或者代码库有了一次质的改变;整个使用习惯都有可能发生改变

### npm源切换
    npm config set registry https://registry.npm.taobao.org
    npm config set registry https://registry.npmjs.org/

### npm常用命令
    npm root -g : 查看全局安装的目录(存放全局包的目录一般会自动配在环境变量中)

    npm init -y : 生产项目的配置文件 package.json

    npm info 包 : 查看包的相关信息

    npm i 包 -g
    npm i 包@x.y.z -g
    npm uninstall 包 -g : 全局安装&全局卸载

    npm i 包 --save (npm i 包)       : 局部安装生产环境的依赖
    npm i 包 --save-dev(npm i 包 -D) : 局部开发开发环境的依赖

### 如何在项目中使用前端工具
    1. 一般安装工具;都要全局安装一份 再 本地安装一份
        全局安装一份 是为了 能让工具在任意目录下都可以启动
        本地安装一份 是为了 统一团队的版本
    2. npx
        在安装node时;会自动安装npm 和 npx
        npx可以让我们在使用前端工具时不需要额外全局多安装一份;它会自动去找本地的工具
        npx eslint -v
    3. npm脚本
        package.json : scripts 本质上是一个对象
            key(脚本名称) : val(对应的命令)
            如果脚本名字叫start 那run可以省略
        npm run key   --> 执行到对应的命令;它也会自动去找本地的工具
