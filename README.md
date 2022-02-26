## 咸鱼呀-博客系统
博客地址：[blog.xianyuya.ltd](http://blog.xianyuya.ltd/)
----
本项目基于 [hexo](https://hexo.io/zh-cn/index.html) 搭建，安装前请确认是否已安装（hexo-cli）

----
hexo-cli安装
```bash
    npm install hexo-cli -g
```

项目下载和安装
----

1.项目拉取
```bash
    git clone git@github.com:s-xianyu/xianyu-blog.git
    cd xianyu-blog
```
2.安装依赖
```bash
    yarn install
```
3.本地项目启动
```bash
    hexo server
```
----
4.新建文章 

```bash
    hexo new name
```
## 关于发布
项目使用[Travis CI ](https://travis-ci.com/) 持续集成发布，代码使用git提交到仓库后自动更新发布

Travis 脚本
```bash
sudo: false
language: node_js
node_js:
  - 15 # use nodejs v10 LTS
cache: npm
branches:
  only:
    - master # 监视github仓库中的master分支，分支出现变化就执行build
script:
  - hexo generate # 静态部署
deploy:
  provider: pages
  skip-cleanup: true
  github-token: $GH_TOKEN
  keep-history: true
  on:
    branch: master
  local-dir: public

```

