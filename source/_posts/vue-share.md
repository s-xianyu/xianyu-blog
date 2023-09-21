---
title: vue入门技术分享
date: 2018-10-17 15:54:18
tags:
    - 前端
    - vue
cover: https://z1.ax1x.com/2023/09/20/pPISRg0.jpg
---


### 一、安装
1.安装vue所需：
先下载node [链接](https://nodejs.org/zh-cn/),然后安装，node推荐安装到C盘,免去配置环境变量麻烦。
2.安装脚手架和webpack
```javascript
npm install -g vue-cli //安装脚手架
npm install -g webpack //安装webpack
```
<!--more-->

3.安装完成 查看下是否安装完成 输入 node -v查看版本，检测是否成功。

4.新建vue项目
```javascript
vue init webpack Project name // 新建项目
```

一路Enter下去即可
**注意事项：**
project name //项目名称
project description //项目描述
project Author //项目作者
install vue-router //是否安装路由
use ESLint to Lint Your Code //是否用ESLint检测代码规范
Set up unit tests //是否设置单元测试
Set up e2e tests with Nightwatch //是否用Nig...建立测试

建立完成后 cd priject name  然后就可以 npm run dev 运行起来 ，大致就是这个样子
默认端口为8080，
修改默认端口: 找到**config**文件下下的**index.js**文件，修改dev下的port为你修改的端口号

![](https://z1.ax1x.com/2023/09/21/pPI8ZLT.png)
### 二、配置
1.配置项目所需模块
```javascript
npm install vue-loader --save
npm install vue-style-loader --save
简写：
npm install vue-loader vue-style -loader --asve
```

2.配置全局js和css
在main.js中引入全局js
```
import './config/rem.js'
import './assets/style/common.css'
```

3.配置sass
安装模块
npm install node-sass sass-loader --save
在**在build文件夹下的webpack.base.conf.js的rules里面添加配置**
```javascript
{
  test: /\.sass$/,
  loaders: ['style', 'css', 'sass']
}
```
引入使用
```css
<style lang="scss" scoped>
   @import '../assets/style/common.scss' //这里可以引入scss文件 
</style>
```

由于main 里不能全局引入scss文件，所以全局scss需单独配置
首先安装resources-loader模块和style-loader模块
npm install style-loader sass-resources-loader --save 
安装好之后再build/utils.js里配置如下：
![1539658430029-74ceaac6-45c9-4b38-b9df-56a50f8e0b4a.png](https://s2.loli.net/2023/09/21/k6Uha4cwroZIdeB.png)

### 三、全局路由守卫

在main.js里注册全局路由守卫
```javascript
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 需要权限,进一步进行判断
    let isLogin = getStore('user_id') // 获取local Storage
    // console.log(isLogin)
    if (isLogin) { // 通过vuex state获取当前的user_id是否存在
      next()
    } else { // 如果没有权限,重定向到登录页,进行登录
      next({
        path: '/login'
        // query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else { // 不需要权限 直接跳转
    next()
  }
})
```

**`to: Route`**：即将要进入的目标路由[对象](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1)
**`from: Route`**：当前导航正要离开的路由
**`next: Function`**：一定要调用该方法来**解决**这个钩子。执行效果依赖`next`方法的调用参数。
**`next()`**：进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是**确认**（确认的）。

### 四、**axios和跨域方法**

1.安装axios 执行 npm install axxios --save

2.在main.js里引入axios
```javascript
    import axios from 'axios'
    Vue.prototype.$ajax = axios //用$ajax代替axios
    Vue.prototype.HOST = '/api' //配置跨域
```

3.配置跨域：在config/index.js里配置如下：

![](https://z1.ax1x.com/2023/09/21/pPI8EQ0.png)

4.使用
```javascript
data(){
  return{
    id:null,
    car:{}
  }
}
computed:{
 params () { // 车辆传值
  return {
   id:this.id
  }   
 }
},
methods: {
 this.$ajax.get('api/mobile/filteData.json',
        {params: this.params}
      ).then(res => {
        this.car = res.data
      })catch(err => {
        console.log(err)
      })
}
```

### 五**、vuex的配置与使用**
以下是我为了学习vuex时做的一个小小的登录框，当用户登录时，把登录的状态保存在vuex里。
这里的配置为个人习惯，在遇到好的方法会及时改正。

1.首先在项目下安装vuex模块 npm install vuex --save
推荐大家看看ES6[链接](http://es6.ruanyifeng.com/#docs/function)语法
```javascript
...mapState
...mapMutations
...mapGetters
...mapActions
以上为ES6扩展运算符，下面有用到，如不明白，可查看es6语法
```

2.在main.js中引入vuex
![](https://z1.ax1x.com/2023/09/21/pPI8VyV.png)

3.在src下新建文件夹，名字为什么不重要，自己知道就好，我这里命名为store,结构如下：
![](https://z1.ax1x.com/2023/09/21/pPI8FWn.png)

4.store.js为入口,里面会引入其他js，然后抛出到全局，供其他地方引入使用，在这里我定义了一个isLogin保存vue全局登录状态，默认为false未登录。和uesrInfo保存用户登录后的信息（目前这里我只保存了用户输入的用户名）
![](https://z1.ax1x.com/2023/09/21/pPI8kzq.png)

5.mutations.js放置方法的地方，比如我这里点击了登录后会走mutations里的方法。
![](https://z1.ax1x.com/2023/09/21/pPI8nwF.png)

6.mutations-types.js 是为了保存方法的变量，在项目大查找方便和模块中使用比较方便的一种方式。
![](https://z1.ax1x.com/2023/09/21/pPI8meU.png)

7,接下来就是在模板中调用了：
html内容
![](https://z1.ax1x.com/2023/09/21/pPI8uo4.png)
js内容
![1539677327661-2906fb51-4492-40ac-8e1d-17b2f835bd71.png](https://s2.loli.net/2023/09/21/JIHMygBUZuQa7Pz.png)
模板中获取vuex里的提交方法

当点击登录后，走**this.GET_USER**方法，GET_USER（this.phone）提交了用户输入的用户名。

而在mutations里GET_USER里的方法把提交的手机号赋值给state里的userInfo并把isLogin状态改为false,当vuex的状态改变时，会执行（computed监听数据变化）自动改变页面的数据结构。
这个时候页面通过** ...mapStae(['isLogin','userInfo'])**获取到了数据。
获取到的也就是state的数据，这个时候的isLogin为fasle.页面隐藏登录按钮，展示登录后的icon
从对页面数据形成以改变。

**获取vuex里的数据**：
在computed：{**...mapStae(['isLogin','userInfo'])** }
computed用来监听数据变化。当获取的的数据改变后，会改变页面的数据。
**获取到vuex里的方法：**
methods:{** ...mapMutations(['GET_USER'])**}
vue里所有方法都存放在methods里。

**上面就是我总结出的vuex的最基本用法。但是当页面刷新后，vuex的状态就没有了。所有就会用到vuex里的Actions;**

### 六、组件之间的传值

通过自定义方式 传值 onProp即为自定义的属性
```javascript
<my-dome :onProp="isFalse"></my-dome> //传入isFalse

<script>
new Vue({
	el: '#app' ,
	data:{
		isFlase:false
	}
})
</script>

//接收方式
props:['onProp'] //或者↓
props: {
	onProp:{  //接收一个onProp ,同上
		type:Boolean
	}
},
```


2.子组件向父组件传值
子组件通过 $emit('自定义事件',value)
```html
<button @click="login">登录</button>
```
```javascript
methods:{
    loginClose(){
        this.$emit('loginHide',!this.loginShow)
      },
}
```
父组件接收方式 :自定义事件="loginHideFun" //loginHideFun是一个函数
```html
<login @loginHide="loginHideFun"/> //on:loginHide为自定义事件名
```
```javascript
data() {
  return {
    loginShowlue:false
  }
}
methods:{
  loginHideFun(data){
    this.loginShowlue = data //接收的值data赋值给父页面
  }
}
```

### 七、路由之间的传值
**vue路由传参的三种方式**
1.利用事件跳转传值
```html
<li v-for="item in car" @click="getId(item.id)">点击跳转传入id</li>
```
```javascript
getId(id){
    this.$router.push({
      path: `/detail/${id}`,
    })
}

//需要在路由里接收ID参数
{
     path: '/detail/:id',
     component: detail
 }
```

2.利用params
```javascript
getId(id){
    this.$router.push({
      name:'detail',
      params:id
    })
}

//在这种情况下就不需要在路由里接收ID参数了，因为在params里已经携带参数了。
```
**以上两种方式在对应组件上获取参数是相同的：this.$route.params.id**

3.用query传值
```html
<router-link tag="li" v-for="item in car" 
    to="{path:'/detail',query:{id:'',....}" //这里是一个对象，可以多值
>点击跳转传入id</router-link>

//子组件获取参数的方式： this.$route.query.id
```

### 八、自定义过滤器
```html
<li v-for="item in car"> {{ item.money | percentage}} </li>
```
```javascript
filters:{
    percentage:(value)=>{
        if(!value) return '';
        return value*100
    }
}
```
如果想使用全局过滤器，请在创建vue实例之前定义好
```
vue.filtr('percentage'，function(value){
    if(!value) return '';
    return value*100
})
```
又或者全局过滤器比较多的情况下，建议把过滤器分离出来。
首先建立一个filter.js用于放过滤器；
在main.js里引入filter.js
然后就是统一处理过滤器函数，见下图
![1546926762826-15adab5b-b94c-4c19-9a54-406591cec830.png](https://s2.loli.net/2023/09/21/CIfnNivXj54sKwl.png)
![1546926851404-e611c4d6-0bc3-4e01-a05c-9f9b8040ba63.png](https://s2.loli.net/2023/09/21/EaHtXJZRs2M6GLv.png)
![1546926901423-e492ea17-7061-46db-b09b-91a0a55d02b0.png](https://s2.loli.net/2023/09/21/EJ4rolWg3htP8sq.png)
![1546927677408-1e92ffdc-1c8e-4211-a482-1fdd7e3293e5.png](https://s2.loli.net/2023/09/21/Qgy97fYGFCEj1JO.png)

见处理效果
![1546927677408-1e92ffdc-1c8e-4211-a482-1fdd7e3293e5.png](https://s2.loli.net/2023/09/21/CDVqk27astc6U5w.png)
https://s2.loli.net/2023/09/21/CDVqk27astc6U5w.png

### 九、Vue.js的特点
MVVM框架、数据驱动、组件化、轻量、简洁、高效、快速、模块友好


