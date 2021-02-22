---
title: 解决ios端inout失焦时，底部白底
date: 2020-07-01 16:26:57
tags:
    - 前端
    - H5
---

经常在ios端遇见键盘弹起后，带起input框上拉，当键盘关闭后，input没有回到原来的位置，这时，ios底部会有键盘收起后的留白。

想要解决这种问题，需要在键盘弹起、关闭时监听，设置scrollTo（top:0, left:0, behavior: 'smooth'）


下面是代码↓
<!--more-->

```javascript
mounted() {
  // ios底部留白
      this.iosWhite()
},
methods() {
  iosWhite() {
        const u = navigator.userAgent
        let flag
        let myFunction
        const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        if (isIOS) {
          document.body.addEventListener('focusin', () => { // 软键盘弹起事件
            flag = true
            clearTimeout(myFunction)
          })
          document.body.addEventListener('focusout', () => { // 软键盘关闭事件
            flag = false
            if (!flag) {
              myFunction = setTimeout(() => {
                window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })// 重点  =======当键盘收起的时候让页面回到原始位置(这里的top可以根据你们个人的需求改变，并不一定要回到页面顶部)
              }, 200)
            } else {
              return
            }
          })
        } else {
          return
        }
  },
}
```
