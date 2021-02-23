---
title: NVM 安装 之 window
date: 2021-02-22 16:00:17
tags:
    - 前端
    - nodeJs
---

### 1.首先下载nvm安装包
官方地址：[https://github.com/coreybutler/nvm-windows/releases](https://github.com/coreybutler/nvm-windows/releases)<br />

推荐下载： <font color='red'> nvm-setup.zip  </font>

<!--more-->
### 2.安装
一路安装下去，安装成功后在命令行输入nvm会显示成功状态<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/132386/1593743480542-857801b6-c690-4923-b654-5422ab9ea758.png#align=left&display=inline&height=330&margin=%5Bobject%20Object%5D&name=image.png&originHeight=330&originWidth=604&size=30630&status=done&style=none&width=604)
### 3.配置淘宝镜像提升速度
由于nvm默认的下载地址http://nodejs.org/dist/是外国外服务器，速度非常慢，因而可以切换到淘宝的镜像，下载速度会快很多。<br />打开nvm的安装路径，默认安装路径是：C:\Users\EDZ\AppData\Roaming\nvm\settings.txt
打开settings.txt，加入下面文件

arch: 64  <br />proxy: none<br />node_mirror: http://npm.taobao.org/mirrors/node/<br />npm_mirror: https://npm.taobao.org/mirrors/npm/<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/132386/1593743834829-caa3854d-909b-4afe-a012-e937f5950fed.png#align=left&display=inline&height=222&margin=%5Bobject%20Object%5D&name=image.png&originHeight=222&originWidth=623&size=15720&status=done&style=none&width=623)
### 4.安装node，切换版本
**nvm  install version**

![image.png](https://cdn.nlark.com/yuque/0/2020/png/132386/1593744031296-00ed548a-4ff8-4ba1-b0bb-b9daa3e3caa1.png#align=left&display=inline&height=193&margin=%5Bobject%20Object%5D&name=image.png&originHeight=193&originWidth=458&size=13207&status=done&style=none&width=458)<br />看到这一步时说明已经安装成功。

接下来就是查看node已安装版本，命令：**nvm list** 简写**nvm ls**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/132386/1593744119597-91f74d7b-0066-4b56-8359-9ea8ce984207.png#align=left&display=inline&height=127&margin=%5Bobject%20Object%5D&name=image.png&originHeight=127&originWidth=409&size=8183&status=done&style=none&width=409)<br />可以看到目前安装了3个版本。<br />3个版本直接可以任意切换 命令 **nvm use version**<br />
<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/132386/1593744258790-b486bc0b-c11c-4111-97a5-c82289286dfb.png#align=left&display=inline&height=205&margin=%5Bobject%20Object%5D&name=image.png&originHeight=205&originWidth=370&size=13640&status=done&style=none&width=370)<br />可以看到，我的版本是12.16.2. 当执行nvm use 10.0.0 之后，在查看node -v时，版本已经切换为10.0.0了。<br />

### 5.node 版本卸载
**nvm uninstall version**<br />![image.png](https://cdn.nlark.com/yuque/0/2020/png/132386/1593744432458-e05ce75d-ba44-4451-8e10-2d1120bbfd12.png#align=left&display=inline&height=259&margin=%5Bobject%20Object%5D&name=image.png&originHeight=259&originWidth=408&size=16162&status=done&style=none&width=408)
