---
title: WebStorm配置本地测试服务器
date: 2020-05-29 16:23:58
tags:
    - 工具
cover: https://z1.ax1x.com/2023/09/20/pPIpl2q.jpg
---

1. 点击Settings 进入设置
2.﻿﻿ 选择 Build, Execution, Deployment 下的 Debugger
a. 将端口号 63342 改为 8080
b. 勾选Can accept external connections(可以接受外部连接)

<!--more-->
3. 选择 Build, Execution, Deployment 下的 Deployment
a. 点击"+"号，增加一条规则
b. 设置 Name 为 localhost，Type 设置为 Local or mounted folder(本地或安装文件夹)

4.选择 Connection
a. Folder 设为本地前端页面文件夹路径
b. Web server root URL 设为本机的IP和8080端口
c. 电脑运行 cmd 打开终端 输入 ipconfig 命令 查询本机IP地址

5.选择 Mappings
a. Local path 设置为本地前端页面文件夹路径
b. Web path on server 'localhost ' 设置为 前端页面的文件夹

