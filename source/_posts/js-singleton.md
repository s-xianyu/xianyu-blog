---
title: JS设计模式之单列模式
date: 2023-09-14 14:50:32
tags:
    - javascript
    - vue 3.0 
cover: https://z1.ax1x.com/2023/09/20/pP5htED.jpg
---
### **什么是单例模式**
单例模式：是 Java 中最简单的设计模式之一。这种类型的设计模式属于创建型模式，它提供了一种创建对象的最佳方式
单例模式是一种创建型设计模式，它确保一个类只有一个实例，并提供了一个全局访问点来访问该实例，该类负责创建自己的对象，同时确保只有单个对象被创建。这个类提供了一种访问其唯一的对象的方式，可以直接访问，不需要实例化该类的对象
**说明：**

- **单例模式只有一个实例对象**
- **单例类必须自己创建自己的唯一实例**
- **单例类必须给所有其他对象提供这一实例**
- **一个全局使用的类频繁地创建与销毁**
- **饿汉式和懒汉式**
### **优缺点、和使用场景**
**优点：**

- 在内存里只有一个实例，减少了内存的开销，尤其是频繁的创建和销毁实例
- 避免对资源的多重占用

**缺点：**

- 没有接口，不能继承，与单一职责原则冲突

**使用场景：**

- 网站计数器
- 图片查看器
- 全局提示

[![pP5fR6x.md.png](https://z1.ax1x.com/2023/09/20/pP5fR6x.md.png)](https://imgse.com/i/pP5fR6x)
### **JavaScript单例模式实现**
```javascript
const Toast = (() => {
    function ToastFun () {
      console.log('提示')
    }
    let instance;
    return function () {
      if (!instance) {
        instance = new ToastFun()
      }
      return instance
    };
  })();
 const test = () => {
   Toast()
 }
```
### **Vue实现Toast轻提示**

1. 创建toast.vue组件实现请提示弹框代码
```javascript
<template>
  <span class="box" v-if="visible">
    <img width="20" :src="img" alt=""><span>{{ text }}</span>
  </span>
</template>

<script>
export default {
  data () {
    return {
      visible: false,
      text: '',
      img: 'https://schbrain-static-online.schbrain.com/resources/c82689d4fb6c9d8cb93b092dfed9bd70.png'
    }
  }
}
</script>

<style scoped lang="less">
.box {
  padding: 10px 15px;
  background: rgba(0,0,0,.5);
  border-radius: 4px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
}
</style>

```

2. 创建toast.ts 创建单例组件
```javascript
import {createApp} from 'vue'
import Toast from './toast.vue'
const ToastConstructor = createApp(Toast)

let instance: any = null

const ToastFn = (options: any) => {
  if (!instance) {
    instance = ToastConstructor.mount(document.createElement('div'))
    Object.assign(instance, options, {
      visible: true
    })
    document.body.appendChild(instance.$el)
  }
  return instance
}
ToastFn.close = () => {
  if (instance) {
    instance.visible = false
  }
}
export default {
  install (app: any) {
    app.config.globalProperties.$toast = ToastFn as Function
  }
}

```

3. 在main的js注入
```javascript
import Toast from './pages/components/toast'

createApp(App)
  .use(Toast)
  .mount('#app')
```

4. 页面调用
```javascript
<template>
  <a-button type="primary" @click="test">测试</a-button>
  <br>
  <a-button danger @click="close">关闭</a-button>
</template>

<script lang="ts" setup>
import {getCurrentInstance} from 'vue'
import type { ComponentInternalInstance } from 'vue'
const { proxy } = getCurrentInstance() as ComponentInternalInstance
let index = 0
const test = () => {
  index += 1
  proxy?.$toast({
    img: 'https://schbrain-static-online.schbrain.com/resources/ff187df977700d208597993e561d330f.png',
    text: '有参数' + index
  })
}

const close = () => {
  proxy?.$toast.close()
}
</script>

<style scoped></style>

```

