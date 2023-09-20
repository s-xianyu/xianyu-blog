---
title: 开发一个个人的cli
date: 2022-02-26 11:36:59
tags:
    - node
    - cli
cover: https://z1.ax1x.com/2023/09/20/pP5hw8A.md.jpg
feature: true
---

<font size=4>一、脚手架的本质作用和解决了前端的那些问题</font>
> <font size=2>1.为了创建项目的一个基本结构 提供项目规范和约定</font>
> <ul>
> <li>相同的组织结构</li>
> <li>相同的开发范式</li>
> <li>相同的模块依赖</li>
> <li>相同的工具配置</li>
> <li>相同的代码基础</li>
> </ul>

<!--more-->
> 使用到的包及说明
> <ul>
> <li>axios---拉取github模板名和信息</li>
> <li>commander---nodejs命令行工具</li>
> <li>inquirer---命令行和用户交互工具</li>
> <li>fs-extra---fs的扩展工具，支持promise</li>
> <li>util---工具类让download-git-repo支持异步</li>
> <li>download-git-repo---下载工具（GitHub, GitLab, Bitbucket）</li>
> 
>
>>>> 未使用到的
> <li>chalk---为命令行加字体颜色和背景颜色</li>
> <li>ora---下载时的loading</li>
> <li>progress---下载时的进度条</li>
> </ul>


> <font size=2>2.脚手架就是在启动的时候询问一些简单的问题，并且通过用户回答的结果去渲染对应的模板文件，基本工作流程如下：</font>
> <font color=#4d81e0 size=2>通过命令行交互询问用户问题</font>
> <font color=#4d81e0 size=2>根据用户回答的结果生成文件</font>

<font size=4>二、常用的脚手架工具</font>
> Yeoman 通用项目脚手架 灵活易拓展
> Plop 创建特定类型的文件/模块

<font size=4>三、开始搭建cli</font>

- 新建项目目录 xianyu-cli 
- npm init 生成 package.json 文件

![Snipaste_2022-02-24_23-40-19.png](https://s2.loli.net/2022/02/24/AVPqNX9hiQ2Cl6F.png)

- 创建脚手架入口js和package.json配置信息
- 把Npm命令软链到全局
- 安装[commander](https://github.com/tj/commander.js/blob/HEAD/Readme_zh-CN.md)

![Snipaste_2022-02-24_23-50-28.png](https://s2.loli.net/2022/02/24/9mBqghL7wGtDQPT.png)

```shell
# 如果软链被占用、可以手动删除一下
npm rm ｜ uninstall -g packageName
# 如果不确定可以查看一下是否已存在
npm ls -g packageName
```

![Snipaste_2022-02-25_00-03-28.png](https://s2.loli.net/2022/02/25/U8gTGpY9SXtLJiB.png)

> 编辑cli.js测试一下代码
```javascript
#! /usr/bin/env node

const program = require('commander') // node 命令行工具

program
  .version('0.1.0')
  .command('create <name>')
  .description('确认创建一个新项目吗？')
  .action(name => {
    // 打印命令行输入的值
    console.log('您创建的项目名称为' + name)
  })

program
  // 版本号信息
  .version(`v${require('../package.json').version}`)
  .usage('<command> [option]')
program.parse(process.argv)

```

> 接下来我们就可以来创建create命令
> 编写create代码
> 安装fs 的扩展工具  [fs-extra](https://www.npmjs.com/package/fs-extra)
> fs-extra是fs的一个扩展工具，支持 promise 方法，编写create.js时会使用
```shell
mkdir lib
touch create.js
npm install fs-extra --save
```

 - 在cli.js里引入create.js 并把name和options传进去
```javascript
...
program
  .version('1.0.0')
  .command('create <name>')
  .description('确认创建一个新项目吗？')
  // -f or --force 为强制创建，如果创建的目录存在则直接覆盖
  .option('-f, --force', '强制创建传入')
  .action((name, options) => {
    // 打印命令行输入的值
    console.log('您创建的项目名称为' + name)
    // 引入create,把创建任务放在create里执行
    require('../lib/create.js')(name, options)
  })
...
```
```javascript
// lib/create.js

const path = require('path')
const fs = require('fs-extra')

// 执行创建命令
module.exports = async function (name, options) {
  console.log('您创建的项目名称为' + name, options)
  // 当前命令行选择的目录
  const cwd  = process.cwd();
  // 需要创建的目录地址
  const targetAir  = path.join(cwd, name)
  // 目录是否已经存在？
  if (fs.existsSync(targetAir)) {
    // 存在提示是否为强制创建？ -f --force
    if (options.force) {
      await fs.remove(targetAir)
    } else {
      // TODO：询问用户是否确定要覆盖
    }
  }
}

```
![Snipaste_2022-02-26_13-15-33.png](https://s2.loli.net/2022/02/26/O3GNI2DKXByRwgC.png)

> 接下来创建用户的询问信息
> 询问用户是否进行重写或退出
```javascript
// 上面引入inquirer
const inquirer = require('inquirer')
...
// TODO：询问用户是否确定要覆盖
let { action } = await inquirer.prompt([
  {
    name: 'action',
    type: 'list',
    message: '目录已存在，请选择一项继续操作！',
    choices: [
      {
        name: '重写',
        value: '重写'
      },{
        name: '退出',
        value: false
      }
    ]
  }
])
if (!action) {
  return;
} else if (action === '重写') {
  // 移除已存在的目录
  console.log(`\r\nRemoving...`)
  await fs.remove(targetAir)
}
...
```
> 测试截图
![Snipaste_2022-02-26_14-08-51.png](https://s2.loli.net/2022/02/26/vHA4Xe9Wi7zVhdw.png)
> 
> 到这里，简易版的cli就搭建完成了
>
>
<font size=4>四、从github生成模板</font>
```shell
# 安装axios
npm install axios --save
# 在lib目录下新建 request.js 文件拉取模板列表
cd lib && touch request.js
```
```javascript
// lib/request.js

// 通过 axios 处理请求
const axios = require('axios')

axios.interceptors.response.use(res => {
  return res.data;
})


/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return axios.get('https://api.github.com/users/s-xianyu/repos')
}

/**
 * 获取版本信息
 * @param {string} repo 模板名称
 * @returns Promise
 */
async function  getTagList(repo) {
  return axios.get(`https://api.github.com/repos/s-xianyu/${repo}/tags`)
}

module.exports = {
  getRepoList,
  getTagList
}

```
```shell
# 在lib目录下新建 generator.js 用户处理拉取模板创建逻辑代码
touch generator.js
```
> 拉取github仓库所有模板
```javascript
// lib/generator.js

const { getRepoList } = require('./request')
const inquirer = require('inquirer')

// 添加加载动画
async function wrapLoading(fn, message, ...args) {
  console.log(message)
  try {
    // 执行传入方法 fn
    const result = await fn(...args)
    return result
  } catch (error) {
    console.log('模板生成失败，请重试！')
  }
}

class Generator {
  constructor (name, targetDir){
    // 目录名称
    this.name = name;
    // 创建位置
    this.targetDir = targetDir;
  }

  // 获取用户选择的模板
  // 1）从远程拉取模板数据
  // 2）用户选择自己新下载的模板名称
  // 3）return 用户选择的名称

  async getRepo() {
    // 1）从远程拉取模板数据
    const repoList = await wrapLoading(getRepoList, '模板获取中，请等待...')
    if (!repoList.length) return;

    // 返回全部
    // const repos = repoList.map(item => item.name))
    // 过滤我们需要的模板名称
    let repos = []
    repoList.map(item => {
      if (item.name.includes('uni') || item.name.includes('vue') || item.name.includes('xianyu-blog')) {
        repos.push(item.name)
      }
    })

    // 2）用户选择自己新下载的模板名称
    const { repo } = await inquirer.prompt({
      name: 'repo',
      type: 'list',
      choices: repos,
      message: '请选择你要创建的项目模板'
    })

    // 3）return 用户选择的名称
    return repo;
  }

  // 核心创建逻辑
  // 1）获取模板名称
  // 2）获取 tag 名称
  // 3）下载模板到模板目录
  async create(){

    // 1）获取模板名称
    const repo = await this.getRepo()

    console.log('你选择了项目为:' + repo)
  }
}

module.exports = Generator;

```
> 拉取模板版本号，更上面的逻辑是一样的
> 不同是需要传一个模板名称过去
```javascript
async getRepo(){...}
async getTag(repo) {
  // 1）基于 repo 结果，远程拉取对应的 tag 列表
  const tags = await wrapLoading(getTagList, '版本号获取中，请等待...', repo);
  if (!tags?.length) return;

  // 过滤我们需要的 tag 名称
  const tagsList = tags.map(item => item.name);

  // 2）用户选择自己需要下载的 tag
  const { tag } = await inquirer.prompt({
    name: 'tag',
    type: 'list',
    choices: tagsList,
    message: '请选择版本号'
  })

  // 3）return 用户选择的 tag
  return tag
}
async create(){
  // 1）获取模板名称
  const repo = await this.getRepo()
  // 2) 获取 tag 名称
  const tag = await this.getTag(repo)

  console.log('你选择了项目为:' + repo + '，版本号为:'+ (tag || ''))
}
}
```
> 控制台测试结果
![Snipaste_2022-02-26_17-36-31.png](https://s2.loli.net/2022/02/26/2sGXYH5Jt1iZbWk.png) 
>


<font size=4>五、拉取远程代码到本地</font>
```shell
# 安装download-git-repo
npm install download-git-repo --save
# util工具可以让download-git-repo支持promise
npm install util --save
```
> 编写下载函数
```javascript
const util = require('util')
const downloadGitRepo = require('download-git-repo') // 不支持 Promise

async create(){
  ...
  // 3）下载模板到模板目录
  await this.download(repo, tag)
}
async download(repo, tag){

  // 1）拼接下载地址
  const requestUrl = `s-xianyu/${repo}${tag?'#'+tag:''}`;

  // 2）调用下载方法
  await wrapLoading(
    this.downloadGitRepo, // 远程下载方法
    '模板下载中，请稍后...', // 加载提示信息
    requestUrl, // 参数1: 下载地址
    path.resolve(process.cwd(), this.targetDir)) // 参数2: 创建位置
}


```
```shell
# 脚手架的安装与使用
npm install -g xianyu-cli22
#查看版本
xy -V
# 使用简写名称拉取模板
xy create cli-demo
cd cli-demo
npm run server
```
![Snipaste_2022-02-26_20-14-46.png](https://s2.loli.net/2022/02/26/8KYzyQ1jHWUJsSi.png)
