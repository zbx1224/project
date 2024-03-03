# 认识Node.js

## 1. Node.js是什么

> Node.js 是一个基于 Chrome V8 引擎的 JavaScript 运行环境。  
>
> Node.js 使用了一个事件驱动、非阻塞式 I/O 的模型，使其轻量又高效。  

因为使用的是js的语法，所以对于我们前端工程师来说学习起来还是相对容易的。

当然与原生js不同的是，原生JavaScript运行在浏览器也就是客户端，而**Node.js是运行在服务端的JavaScript**，它基于Chrome浏览器解析js的引擎--V8，采用异步回调的策略，性能非常高。

Node.js不再和浏览器页面相关，所以很多内容和原生js有着差异，比如不再有任何DOM相关操作，顶层对象不再是window等等。

## 2. 学前准备

- 扎实的原生JavaScript基础（ES5、ES6都需要）
- [Node菜鸟教程](http://www.runoob.com/nodejs/nodejs-tutorial.html)
- [Node API文档](http://nodejs.cn/api/)

## 3. 安装/测试 node

非常简单，访问 [node.js中文网](http://nodejs.cn/download/)下载安装；

命令行运行`node -v`测试是否安装完成；

使用`node 文件名`运行一个js文件；

直接运行`node`命令进入node REPL(交互式解析器)直接运行代码。

## 4. 相关工具的使用

- cmd / powershell 会用到的简单命令

`cd` `dir` `cls` `del`  连按ctrl+c退出环境  方向键上下输入历史命令

`ls` `clear` ctrl+L光标置顶

- webstrom 内置命令框以及替换
- webstrom node代码提示















