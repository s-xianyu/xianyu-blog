---
title: vue 3.0 生命周期函数记录
date: 2021-06-27 02:03:26
tags:
    - 前端
    - vue 3.0
cover:  https://z1.ax1x.com/2023/09/20/pP5XJbj.jpg
---


记录3.0常用方法及属性


简单两个页面， 主要是查看生命周期


<!--more-->
```javascript
<template>
	<div class="look">
		<h2>Vue3.0 生命周期函数{{ num }}</h2>
		<h2>见控制台</h2>
		<br>
		<div style="display: flex;">
			<el-button @click="toggleColor">toggleColor</el-button>
			<span style="width:20px"></span>
			<el-button @click="toLook">toggleLook</el-button>
		</div>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	onBeforeMount,
	onMounted,
	onBeforeUpdate,
	onUpdated,
	onBeforeUnmount,
	onUnmounted,
	onActivated,
	onDeactivated,
	onErrorCaptured,
	onRenderTracked,
	onRenderTriggered,
	getCurrentInstance,
	reactive,
	toRefs,
    computed,
	ref,
	nextTick
} from 'vue';
import { useRouter, useRoute } from 'vue-router';
export default defineComponent({
	setup () {
		// 全局对象实例
		// ctx.toggleColor（3.0） -- this.toggleColor(2.0)
		const el = getCurrentInstance() as any;
		// Router方法 常用addRoute,beforeEach,afterEach
		const Router = useRouter();
		// route对象，常用params, query取值
		const Route = useRoute();
		// 存储dom数组 需push
		const myRef = ref([]);
		// 定义值
		const num = ref<number>(12);
		// 定义多个值 2.0里相当于data
		const state = reactive({
			colors: 'red' // style里可使用
		});
        // 创建一个计算属性
		const addAge = computed(() => el.ctx.num++ );
		// 生命周期
		onBeforeMount(() => {
			console.log(el);
			console.log(Route.query.id);
			console.log('onBeforeMount', 1);
		});
		onMounted(() => {
			console.log('onMounted', 2);
		});
		onBeforeUpdate(() => {
			console.log('onBeforeUpdate', 3);
		});
		onUpdated(() => {
			console.log('onUpdated', 4);
		});
		onBeforeUnmount(() => {
			console.log('onBeforeUnmount', 5);
		});
		onUnmounted(() => {
			console.log('onUnmounted', 6);
		});
		onActivated(() => {
			console.log('onActivated', 7);
		});
		onDeactivated(() => {
			console.log('onDeactivated', 8);
		});
		onErrorCaptured(() => {
			console.log('onErrorCaptured', 9);
		});
		onRenderTracked((e) => {
			debugger;
			console.log('onRenderTracked', e);
		});
		onRenderTriggered((e) => {
			debugger;
			console.log('onRenderTriggered', e);
		});
		const toLook = () => {
			Router.push({
				name: 'toggleLook'
			});
		};
		const methods = {
			toggleColor: () => {
				state.colors = state.colors === 'red' ? 'blue' : 'red';
			}
		};
		return {
			num,
			toLook,
			...toRefs(state),
			...methods
		};
	}
});
</script>

<style lang="less" scoped>
.look{
	width:100vw;
	height:100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	color: v-bind(colors);
	h2{
		display: flex;
	}
}
</style>

```

```javascript
<template>
	<div class="look">
		<h2>Vue3.0 生命周期函数</h2>
		<h2>见控制台</h2>
		<br>
		<el-button @click="toLook">toggleLook</el-button>
	</div>
</template>

<script lang="ts">
import {
	defineComponent,
	onBeforeMount,
	onMounted,
	onBeforeUpdate,
	onUpdated,
	onBeforeUnmount,
	onUnmounted,
	onActivated,
	onDeactivated,
	onErrorCaptured,
	onRenderTracked,
	onRenderTriggered
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
	setup () {
		const Router = useRouter();
		onBeforeMount(() => {
			console.log('onBeforeMount', 1);
		});
		onMounted(() => {
			console.log('onMounted', 2);
		});
		onBeforeUpdate(() => {
			console.log('onBeforeUpdate', 3);
		});
		onUpdated(() => {
			console.log('onUpdated', 4);
		});
		onBeforeUnmount(() => {
			console.log('onBeforeUnmount', 5);
		});
		onUnmounted(() => {
			console.log('onUnmounted', 6);
		});
		onActivated(() => {
			console.log('onActivated', 7);
		});
		onDeactivated(() => {
			console.log('onDeactivated', 8);
		});
		onErrorCaptured(() => {
			console.log('onErrorCaptured', 9);
		});
		onRenderTracked((e) => {
			debugger;
			console.log('onRenderTracked', e);
		});
		onRenderTriggered((e) => {
			debugger;
			console.log('onRenderTriggered', e);
		});
		const toLook = () => {
			Router.push({
				name: 'look',
				query: {
					id: 'xianyu'
				}
			});
		};
		return {
			toLook
		};
	}
});
</script>

<style lang="less" scoped>
.look{
	width:100vw;
	height:100vh;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	h2{
		display: flex;
	}
}
</style>

```
