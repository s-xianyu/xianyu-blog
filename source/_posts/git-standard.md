---
title: git提交规范
date: 2021-05-1 15:58:43
tags:
    - git
---

## 规范的作用

大多数情况下，看提交历史的人跟提交代码的人都不是同一个人，当别人阅读你的提交历史时，他很可能是不知道具体代码细节的，你如何在最短的时间内让他一眼知道每次提交的意义

<!--more-->

```dash
每次提交影响的具体范围？
这个bug在哪次提交中被修复了？
这个新功能是在哪次提交中增加的？
修改是否向下兼容？
是否回滚了代码？
是否只是修改了文档、调整了代码格式？
是否修改了测试、是否进行了重构？
是否对代码进行了性能优化？
```

## 生成CHANGELOG
而且规范的Git提交历史，还可以直接生成项目发版的CHANGELOG[（semantic-release）](https://github.com/semantic-release/semantic-release)

## 规范细则

对于Git的提交日志，我们有非常明确而详细的提交规范。这将有助于我们在查看项目历史时，更容易明确每一次提交的内容。另一方面，我们还直接使用了Git提交日志来生成AngularJS的变更日志。

Git的提交日志可以通过常用的Git工作流或向导工具[(Commitizen)](https://github.com/commitizen/cz-cli)来生成。如果你选择使用[(Commitizen)](https://github.com/commitizen/cz-cli)，那只需要在Git暂存修改后，执行“yarn run commit”命令即可。

## 提交消息格式

每个类型值都表示了不同的含义，类型值必须是以下的其中一个：

```dash
feat：提交新功能
fix：修复了bug
docs：只修改了文档
style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
refactor：代码重构，既没修复bug也没有添加新功能
perf：性能优化，提高性能的代码更改
test：添加或修改代码测试
chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改
```

- 人生苦短，请遵守规范。