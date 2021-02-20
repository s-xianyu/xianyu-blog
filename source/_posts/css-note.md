---
title: CSS-笔记
date: 2018-06-05 11:31:16
tags:
    - 前端
    - css
---

1. 1px像素问题
   在手机端，设置1px像素时，有时候看起来比一个像素粗
```css
.a::after{ 
    content: ''; 
    display: block;
     width: 100%;
     height: 1px;
     background: #333;
     position: absolute;
    left: 0;
    bottom: 0; 
    transform: scaleY(0.5) 
}
```
<!--more-->



2. 旋转屏幕时，字体大小调整的问题
```css
html,body,form,fieldset,p,div,h1,h2,h3,h4,h5,h6{ 
    -webkit-text-size-adjust:100%;
}
```



3. 上下拉动滚动条时卡顿、滚动很慢
   Android3+和iOSi5+支持CSS3的新属性为**overflow-scrolling**
```css
body{
    -webkit-overflow-scrolling:touch; 
    overflow-scrolling:touch;
}
```

4. 长时间按住页面出现闪退情况
```css
element{-webkit-touch-callout:none;}
```




5. 去掉iphone、ipad 输入框内阴影
```css
element{ -webkit-appearance:none;}
```




6. ios和android下触摸元素时出现半透明灰色遮罩
   设置alpha值为0就可以去除本透明灰色遮罩，备注：**transparent**的属性值在android下无效。
```css
element{ -webkit-tap-highlight-color:rgba(255,255,255,0);}
```




7. active兼容处理 即 伪类：active失效
   方法一： body 添加 **ontouchstart**
   方法二：js给document绑定touchstart或touchend事件
```javascript
document.addEventListentener('touchstart',function(){
    false;
}
```

8. Android手机圆角失效BUG
   **background-clip:padding-box;**



9. 移动端clcik延时问题
   不用click事件，改用自定义事件** tap** 或者引入 **fastclick库 **解决
   建议：移动端尽量使用touch代替click事件



10. 响应式图片
    在移动端中，图片的处理应该是很谨慎的，假设有一张图片本身的尺寸是X宽，设置和包裹它的div一样宽，如果是div宽度小于图片宽度没有问题，但是如果div宽度大于图片的宽度，图片被拉伸失真
```css
img{ max-width: 100%; display: block; margin: 0 auto; }
```



11. 常用mate标签设置
<meta name="apple-mobile-web-app-capable" content="yes"> **             **** **设置页面是否已全屏模式运行显示
<meta name="format-detection"content="telephone=no">**            **设置是否自动识别电话号码，no为不识别** **
<meta name="viewwport" content="width=device-width initial-scale=1" maximun-scale="1" user-scalable="no">**                                                                                                                         **设置页面视口区域为浏览器可见区域 user-scalable 为no:禁止缩放
<meta http-equiv="Cache-Control" content="no-cache" />**    **设置缓存每次刷新会使用缓存而不是去服务器发送请求
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>    浏览器兼容模式 
<meta content="yes" name="apple-mobile-web-app-capable"/>   清楚iPhone 默认工具栏和菜单栏



12. H5提供的自动拨号功能
```html
<a href="tel:123456789,1034">123456789 转 1034</a>
```



13. 禁止复制，选中文本（PC，H5）
```css
element {
    -webkit-user-select:none;
    -moz-user-select:none;
    -khtml-user-select:none;
    user-select:none;
}
```




14.双行文字溢出显示省略号
```css
word-break: break-all;
    text-overflow: ellipsis;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
```


15.背景图模糊
```html
<div class="parent">
<img src="111.png" width="100%" height="100%"/>    
</div>
```


```css
.parent{
	 position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    opacity: .6;
    -webkit-filter: blur(20px);
    filter: blur(20px);
}
```
