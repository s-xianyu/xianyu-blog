---
title: NVM 安装 之 window
date: 2020-07-03 16:00:17
tags:
    - 前端
    - nodeJs
cover:  https://z1.ax1x.com/2023/09/20/pP5XNan.jpg
---

### 1.首先下载nvm安装包
官方地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)

推荐下载： <font color='red'> nvm-setup.zip  </font>

![image.png](https://s2.loli.net/2023/09/21/XEJIpGWTKr2Mm1q.png)

<!--more-->
### 2.安装
一路安装下去，安装成功后在命令行输入nvm会显示成功状态
![image.png](https://s2.loli.net/2023/09/21/Gd9f2nWHu8aBbvO.png)
### 3.配置淘宝镜像提升速度

由于nvm默认的下载地址http://nodejs.org/dist/是外国外服务器，速度非常慢，因而可以切换到淘宝的镜像，下载速度会快很多。

打开nvm的安装路径，默认安装路径是：C:\Users\EDZ\AppData\Roaming\nvm

![image.png](https://s2.loli.net/2023/09/21/LWBZC8j6u1ml4k7.png)

打开settings.txt，加入下面文件

arch: 64 
proxy: none
node_mirror: http://npm.taobao.org/mirrors/node/
npm_mirror: https://npm.taobao.org/mirrors/npm/

![image.png](https://s2.loli.net/2023/09/21/kFcnR2IQieVrGKt.png)

### 4.安装node，切换版本
**nvm  install version**

![image.png](https://s2.loli.net/2023/09/21/lmVv5acBLSWCD1X.png)

看到这一步时说明已经安装成功。

接下来就是查看node已安装版本，命令：**nvm list** 简写**nvm ls**

![image.png](https://s2.loli.net/2023/09/21/sSBwLXO8pz7YUgV.png)

可以看到目前安装了3个版本。
3个版本直接可以任意切换 命令 **nvm use version**

![image.png](https://s2.loli.net/2023/09/21/6XbL5WKzsnA2ImH.png)

可以看到，我的版本是12.16.2. 当执行nvm use 10.0.0 之后，在查看node -v时，版本已经切换为10.0.0了。

### 5.node 版本卸载
**nvm uninstall version**
![1593744432458-e05ce75d-ba44-4451-8e10-2d1120bbfd12.png](https://s2.loli.net/2023/09/21/S2pedJkC8vHPT36.png)
