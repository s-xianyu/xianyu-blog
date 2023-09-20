---
title: vue 对IE的支持
date: 2018-11-19 15:46:53
tags:
    - 前端
    - vue
cover:  https://z1.ax1x.com/2023/09/20/pP5XwGV.jpg
---
# vue 对IE的支持

<span data-type="color" style="color:rgb(0, 0, 0)"><span data-type="background" style="background-color:rgb(255, 255, 255)">Vue 官方对于 ie 浏览器版本兼容情况的描述是 ie9+，即是 ie9 及更高的版本。经过测试，Vue 的核心框架 </span></span>`vuejs`<span data-type="color" style="color:rgb(0, 0, 0)"><span data-type="background" style="background-color:rgb(255, 255, 255)">本身，以及生态的官方核心插件（VueRouter、Vuex等）均可以在 ie9 上正常使用。</span></span>

<!--more-->

对于`ES6`部分新对象、表达式，并不支持，在这里就需要用到 <span data-type="color" style="color:#F5222D">bebal-</span><span data-type="background" style="background-color:rgb(255, 255, 255)"><span data-type="color" style="color:#F5222D">polyfill</span></span><span data-type="color" style="color:rgb(0, 0, 0)"><span data-type="background" style="background-color:rgb(255, 255, 255)">,它的作用是把ES6语法编译为低版本IE支持的ES5语法.</span></span>

1.安装<span data-type="color" style="color:#F5222D">bebal-</span><span data-type="background" style="background-color:rgb(255, 255, 255)"><span data-type="color" style="color:#F5222D">polyfill</span></span>
```javascript
cnpm install bebal-polyfill --save
```

2安装完成直接在`main.js`里引入即可。import 'bebal-polyill';

3.<span data-type="color" style="color:rgb(79, 79, 79)"><span data-type="background" style="background-color:rgb(255, 255, 255)">在config中的</span></span>`webpack.base.conf.js`<span data-type="color" style="color:rgb(79, 79, 79)"><span data-type="background" style="background-color:rgb(255, 255, 255)">中,修改编译配置</span></span>
```javascript
entry:{
    app:['babel-polyfill','./src/main.js']      
}
```

