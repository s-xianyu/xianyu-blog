---
title: nvm-upgrade
date: 2021-10-11 09:40:24
tags: 
    - 前端
    - nodeJs

##NVM升级

使用nvm 时报错如下
nvm is already installed in /usr/xxx/.nvm, trying to update using git

<!--more-->

在官方 github issue 中发现以下解决方案,记录一下

```shell
set -e

cd ~/.nvm

git fetch --tags
TAG=$(git describe --tags `git rev-list --tags --max-count=1`)
echo "Checking out tag $TAG..."
git checkout "$TAG"

source ~/.nvm/nvm.sh

```
然后从新开启iTerm命令执行
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash

重启iTerm 
