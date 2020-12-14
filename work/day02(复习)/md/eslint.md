### 安装eslint
    npm init -y    :  生成项目描述文件
    npm i eslint -D : 安装eslint

### 生成eslint相关的配置文件
    npx eslint --init
    会有很多交互式的提示
    最终会生成一个.eslintrc.js
      rules:{
        "规则":0,  //关闭
        "规则":1,  //开启 警告
        "规则":2   //开启 错误
      }

### 如何检查js代码(不是一个强约束)
    npx eslint ./src

### 与git的钩子(husky)相结合
    git init  : 先安装版本库
    npm i husky -D : 给版本安装钩子
    在package.json文件中写如下配置
      "husky":{
        "hooks":{
          "pre-commit":"npm run lint:f"
        }
      }

