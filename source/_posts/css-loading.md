---
title: 一个好看的loading
date: 2020-01-04 16:30:42
tags:
    - css
cover: https://z1.ax1x.com/2023/09/20/pP5vDHJ.jpg
---


![loading.gif](https://s2.loli.net/2023/09/21/9nTpSxdqiQsUhCG.gif)

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

