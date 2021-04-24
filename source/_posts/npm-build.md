---
title: Vue组件打包到发布流程
date: 2021-04-24 15:47:20
tags:
    - javascript
    - npm
    - node
---




## 一. npm是什么

   npm（全称 Node Package Manager，即“node包管理器”）是Node.js默认的、用JavaScript编写的软件包管理系统。


<!--more-->

## 二.npm发展史

   npm 的发展是跟 Node.js 的发展相辅相成的,NodeJs是由在德国工作的美国程序员 瑞安.达尔(Ryan Dahl) 的，他写了 Node.js，但是 Node.js 缺少一个包管理器，于是他和 npm 的作者一拍即合、抱团取暖，最终 Node.js 内置了 npm
   npm完全用JavaScript写成，最初由艾萨克·施吕特（Isaac Z. Schlueter）开发。艾萨克表示自己意识到“模块管理很糟糕”的问题，并看到了PHP的PEAR与Perl的CPAN等软件的缺点，于是编写了npm。
2020年3月16 日，GitHub CEO 奈特·弗里德曼 (Nat Friedman) 宣布 GitHub 已签署收购 NPM（npm 背后的公司）的协议，并表示 npm 加入 GitHub 后会继续免费提供公共软件注册中心服务。


## 三.组件开发


 1.使用vue-cli构建一个项目
 
```javascript
vue create xianyuNpm
```

 2.新建文件夹packages用于存放组件（vue开发组件可以放在这里里面）
![image.png](/assets/npm-build/image.png)

3.新建vue.config.js文件（项目打包配置）
```javascript
module.exports = {
    devServer: {
        port: 4000,
    },
    // 修改 examples 目录 为 examples 目录
    pages: {
        index: {
            // page 的入口
            entry: 'examples/main.js',   // 把src 修改为examples
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html'
        }
    },
    // 扩展 webpack 配置，使 packages 加入编译
    /* chainWebpack 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。 */
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add(__dirname + 'packages')  // 注意这里需要绝对路径，所有要拼接__dirname
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                // 修改它的选项...
                return options
            })
    }
}

```

 4.配置打包文件（package.json）
```json
{
   // 包名，该名字是唯一的。可在 npm 官网搜索名字，如果存在则需换个名字。
  "name": "woshiyitiaoxianyu-npm",
  // 版本号，每次发布至 npm 需要修改版本号，不能和历史版本号相同。
  "version": "1.0.3",
  // 是否私有，需要修改为 false 才能发布到 npm
  "private": false,
  // 项目描述
  "description:": "我是一条咸鱼",
  // 作者
  "author": "xianyuya <s22529634@aliyun.com>",
  "license": "MIT", // 开源协议
  // 项目官网的地址
  "homepage": "http:// blob/xianyuya.ltd/",
  // 入口文件，该字段需指向我们最终编译后的包文件
  "main": "lib/woshiyitiaoxianyu-npm.umd.min.js", 
  // 关键字，以空格分离希望用户最终搜索的词或者数组形式
  "keywords": [
    "vue",
    "countNumber"
  ],
  // 项目仓库
  "repository": {
    "type": "git",
    "url": "https://github.com/s-xianyu/xianyuNpm.git"
  },
  // 指定打包后,包中存在的文件夹
  "files": [
    "lib",
    "packages",
    "examples"
  ],
  "scripts": {
    // --target 构建目标，默认为应用模式。这里修改为 lib 启用库模式
    // --name 打包生成的包名
    // --dest 输出目录，默认 dist。这里我们改成 lib
    // [entry] 最后一个参数为入口文件，默认为 src/App.vue。这里我们指定编译 packages/ 组件库目录
    "lib": "vue-cli-service build --target lib --name woshiyitiaoxianyu-npm --dest lib packages/index.js",
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build",
    "lint": "vue-cli-service lint",
    "publish": "publish"
  },
}

```


## 四. 发布

 到[npm官网](https://www.npmjs.com/) 注册账号然后到项目中登录
 
```javascript
// 登录
npm login
// 发布
npm publish
// 从注册表中删除软件包
npm unpublish [<@scope>/]<pkg>[@<version>]
npx force-unpublish package-name '原因描述'
// 查看当前登录账户
 npm whoami
      

```

 发布过程中首先要切换镜像
```javascript
查看npm源地址，在终端输入以下命令
npm config list
修改registry地址
npm config set registry http://registry.npmjs.org  // 官网镜像地址
npm set registry https://registry.npm.taobao.org/ // 淘宝镜像地址
// 或者直接装nrm mac前面加sudo
npm install nrm -g --save
// 查看所有源
nrm ls
//查看当前源
nrm current
// 切换
nrm use cnpm

// 用nrm add 命令添加公司私有npm源
nrm add qihoo http://registry.npm.xianyu.org
// 测试速度
nrm test npm
// 删除镜像源
nrm del npm
```
![image.png](/assets/npm-build/image1.png)
![image.png](/assets/npm-build/image2.png)
