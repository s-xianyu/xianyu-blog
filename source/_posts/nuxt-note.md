---
title: nuxt.js-相关配置信息
date: 2018-10-19 10:59:38
tags:
    - 前端
    - nuxtJs
---

# nuxt.js

<a name="7whsas"></a>
### 一、sass配置
1.安装依赖文件：<br />npm install css-loader style-loader node-sass sass-loader --save

在你需要使用的页面添加@import "scss地址"； 见下
```css
<style lang="scss"> //这里的lang="scss" 而不是 sass
@import "../assets/style/mixin.scss"; //全局scss
.container {
  @include wh(10rem,10rem); //这里为自定义mixin
  @include flexCenter; //这里为自定义mixin
  div{
    font-size:1rem;
  }
}
</style>
```

<!--more-->

如果是全局使用的话，需要在nuxt-config.jsli配置全局css,如下：<br />less和其他依赖一样
```javascript
build: {
    styleResources: {
      scss: './assets/common/common.scss',// 如 less: '../../common'
      // sass: ...,
      // scss: ...
      options: {
        // See https://github.com/yenshih/style-resources-loader#options
        // Except `patterns` property
      }
    }
  }
```
<a name="i4cuym"></a>
### 二、nuxt跨域访问
1.安装@nuxtjs/axios 和 @nuxtjs/proxy 官方模块
```javascript
npm install @nuxtjs/axios @nuxtjs/proxy --save
```

2.在plugins建立全局js名为axios 内容为：
```javascript
import * as axios from 'axios'

let options = {}
if (process.server) {  //其中2222为项目端口号
  options.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 2222}/api`
}

export default axios.create(options)
```

这样每次通过axios访问api的时候都会自动在前面加上api

3.在nuxt.config.js里配置axios
```javascript
modules: [ //配置所需模块
      '@nuxtjs/axios',
      '@nuxtjs/proxy'
  ],
proxy: [ //设置跨域代理为 /api 代替
      [
        '/api', 
        { 
          target: 'https://www.baidu.com:2222', // 需要跨域的地址
          pathRewrite: { '^/api' : '/' }
        }
    ]
  ]
```

4.完成后可以直接用了 ~0~

<a name="lqu8wt"></a>
### 三、全局js 配置
插件配置<br />1.首先下载插件 npm install element-ui --save<br />2.在plugins 建立element-ui文件夹用来引入模块，如下：
```javascript
import Vue from 'vue'
import Element from 'element-ui/lib/element-ui.common' //引入element-ui库
import locale from 'element-ui/lib/locale/lang/en' //引入element-ul所需js

export default () => { //暴露全局
  Vue.use(Element, { locale })
}
```
3.配置到这里，还差一步，在nuxt.config.js里配置如下：
```javascript
plugins: [
    {src:'~plugins/element-ui',ssr:true}
  ],
css: [
    'element-ui/lib/theme-chalk/index.css' //所需css
  ],
```

自定义js配置和插件配置一样，但是要设置ssr为false,意为只在客户端运行的插件。

### 四、 去除nuxt项目下的vuex变量

```javascript
// 删除掉nuxt 项目下html页面下的 window.__NUXT__=
// 进入可以看到一个独立的vue-renderer.js;
// 编辑 vue-renderer.js  大概3835行的样子。注释掉 2个代码块分别如下：
1. APP += `<script>${serializedSession}</script>
2. hash.update(serializedSession);// cspScriptSrcHashes.push(`'${csp.hashAlgorithm}-${hash.digest('base64')}'`);
```
   然后打包编辑就可以了。
