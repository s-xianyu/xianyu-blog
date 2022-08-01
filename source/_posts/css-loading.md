<!--
 * @Author: ss shangs@schbrain.com
 * @Date: 2022-02-23 11:23:00
 * @LastEditors: ss shangs@schbrain.com
 * @LastEditTime: 2022-08-01 10:40:01
 * @FilePath: /xianyu-blog/source/_posts/css-loading.md
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
---
title: 一个bu好看的loading
date: 2020-01-04 16:30:42
tags:
    - css
---


![img.png](https://raw.githubusercontent.com/s-xianyu/blog-static/master/images/loading.gif)

<!--more-->
直接上代码
```css
.loading{
    display: inline-block;
    width: 51px;
    height: 51px;
    margin: 6px;
    border-radius: 50%;
    background: #ef3795;
    animation: lds-circle 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  }

@keyframes lds-circle {
    0%, 100% {
      animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
    }
    0% {
      transform: rotateY(0deg);
    }
    50% {
      transform: rotateY(1800deg);
      animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
    }
    100% {
      transform: rotateY(3600deg);
    }
  }
```

