# express

## 1.什么是express

express是一个基于 Node.js平台，快速、开放、极简的 Web 开发框架。拥有非常实用的API，让开发者能快捷的创建HTTP服务应用。

[express中文网](https://www.expressjs.com.cn/)

## 2.安装与使用

- 安装

  `npm i express -S` 推荐局部安装，不要全局。

- 基础使用

  ```js
  //引入
  const express = require("express");
  
  //创建app
  let app = express();
  
  //监听端口
  app.listen(5555); 
  
  //监听路由
  app.get("/",(req,res)=>{
      res.send("Hello World!");//返回内容
  });
  ```
  
    通过node运行上述代码，然后在本地浏览器访问 http://localhost:5555 。
  
    **关于端口：**
  
    - 开启多个http服务时，端口不能重复；
    - 端口范围可以是 1~65535，但是1000以下的端口很多都被系统占用了，为了避免冲突，测试代码时选用1000以上；
    - **6666**端口被谷歌/火狐认为非安全端口号，无法访问，**不**要使用；
    - http协议默认访问端口80，https协议默认访问端口443。

## 3.路由监听

- 监听方式

  all get post put delete ......

  常用的为 get post，all方式可以用来监听所有类型的请求。

  网站项目中，前端发起请求的方式一般也就是固定的几种：

  - 浏览器地址栏直接访问（get）
  - link img script等标签引入资源（get）
  - form表单提交（通常 get/post）
  - ajax（通常 get/post）

- 回调函数

  路由监听需要一个回调函数，该回调函数自带两个形参`request` `response`（可以随意命名）。

  `request`对象中包含了请求相关的各种信息，比如发送过来的数据、cookie、地址信息、浏览器信息、请求头等等。

  `response`对象用于设置响应相关的各种信息，比如返回内容、响应头、状态码等等。

- 关于路由

  主域后面跟的 `/xxx/xx` 都称之为路由；

  区分路由与路径；例如，只要你监听了 `app.get("/x.html",()=>{...})` 即使没有 `x.html` 这个文件，你也能访问这个路由。

  如果想要访问某一个静态的html文件，可以使用`res.sendFile()` 来直接返回该页面，或者使用 **静态资源配置** 来让你的项目中某个文件夹可以直接使用路由的形式访问。后续再介绍如何配置静态资源。

## 4.中间件

可以使用中间件让请求进入对应的路由之前提前经过中间件的处理。例如，提前处理所有请求发送过来的数据格式、处理cookie内容格式、设置权限操作等等。

- 基础写法

  ```js
  const express = require("express");
  
  let app = express();
  app.listen(5555); 
  
  //中间件 -- 一个函数，用于做一些需要的提前处理
  app.use((req,res,next)=>{
      //中间件处理操作...
      res.goudan = "狗蛋";
      
      next(); //调用next，请求才会继续往下进行处理
  });
  
  app.get("/",(req,res)=>{
      res.send(res.goudan);//返回内容
  });
  ```

- 内置中间件

  express本身提供了几个常用的中间件：

  - 提前处理请求带过来的数据

    `app.use(express.urlencoded({extend:true}))`

    然后在对应的路由监听中，使用`req.query` 得到GET方式的数据，使用`req.body`得到POST方式的数据。
    
  - 静态资源目录
  
    `app.use(express.static("./xxx"))`
  
    让对应的目录下成为静态资源目录，其中的所有文件可以通过路由的形式来访问。
  
- 跨域

  配合`cors`包可以方便的配置跨域：

  ```js
  const app = require("express")();
  const cors = require("cors");
  
  app.use(cors());
  ```

## 5.子路由

- 使用场景

  ```js
  const express = require("express");
  
  let app = express();
  app.listen(5555); 
  
  app.get("/teacher/fly",(req,res)=>{
      res.send("Fly老师"); 
  });
  app.get("/teacher/fengyu",(req,res)=>{
      res.send("fengyu老师"); 
  });
  app.get("/teacher/xiazhi",(req,res)=>{
      res.send("xiazhi老师"); 
  });
  ```

  路由层次较深时，监听路由写起来比较麻烦，并且也不便于代码维护和统一的路由处理。

  使用子路由的形式改写代码：

  ```js
  //app.js文件
  const express = require("express");
  let app = express();
  app.listen(5555); 
  app.use("/teacher",require("./router/teacher"));
  
  
  //./router/teacher.js文件
  const express = require("express");
  let router = express.Router();
  router.get("/fly",(req,res)=>{
      res.send("Fly老师"); 
  });
  router.get("/fengyu",(req,res)=>{
      res.send("fengyu老师"); 
  });
  router.get("/xiazhi",(req,res)=>{
      res.send("xiazhi老师"); 
  });
  module.exports = router;
  ```

  这样做分开了路由的逻辑，解决上述的问题，并且主应用程序文件`app.js`中也不因为内容过多而显得结构不够清晰。

## 6.req相关API

- `req.path` 获取路由字符串

- `req.params`

  使用动态路由时，获取对应的路由信息：

  ```js
  app.get("/uid/:id",(req,res)=>{
      console.log(req.params.id); //获取 :id 位置对应的路由字符串
      //...
  });
  ```

- `req.query` `req.body` get请求 post请求对应的数据获取

- `req.method` 获取请求对应的方式（'get' 'post' ...）

- `req.cookies`

  使用了`cookie-parser`中间件后，用来获取cookie数据：

  ```js
  const express = require("express");
  const cookieParser = require("cookie-parser");
  
  let app = express();
  app.use(cookieParser());
  app.post("/abc",(req,res)=>{
      console.log(req.cookies);//打印cookie数据
      //...
  });
  //...
  ```

- `req.protocol` 获取请求的协议（'http' 'https'）

## 7.res相关API

- `res.send()` 返回数据，接收字符串、对象...。（注意不能接收数字，否则会认为是状态码）

- `res.sendFile()` 读取文件内容然后返回，接收路径字符串

- `res.status()` 设置状态码（404 200 ...），接收数字参数

- `res.set()` 设置响应头，接收对象参数

- `res.cookie()` 

  用于给客户端设置cookie

  ```js
  res.cookie('name', 'Fly', {'masAge':90000});
  ```

- `res.redirect()` 重定向，接收一段新路由字符

- `res.render()` 配合模板引擎用来渲染模板引擎页面

## 8.session

使用`express-session`包来完成客户端的登录状态保持。

- 安装：`npm i express-session -S`

- 配置中间件

  ```js
  const app = require("express")()
  const session = require("express-session")
  
  //基础配置
  app.use(session({
      //秘钥字符串，服务端生成session的签名，可随意写
      secret: "fly",
      //给前端设置cookie相关的设置，一般配置maxAge即可
      cookie: {maxAge:7*24*60*60*1000},
      //向服务发送请求后，是否重置cookie时间，建议true
      rolling: true,
      //是否强制重新保存session，即使它没有发生变化，建议false
      resave: false,
      //是否在session还未初始化时就存储，有利于前后鉴权，建议true
      saveUninitialized: true
  }))
  ```

- 配合数据库

  session会在服务端存储所有用户相关的session信息，默认存储在内存中，这无疑大大加重了服务器负担，所以我们通常需要配置将服务端session信息存储在数据库中。

  安装：`npm i connect-mongo -S`

  新增配置：

  ```js
  //...
  // 注意！此处为老版本使用方法，connect-mongo包近期更新频繁，请阅读最新版本的API以正确使用
  const MongoSession = require("connect-mongo")(session)
  
  app.use(session({
      //...
      store: new MongoSession({
          url: "mongodb://localhost:27017/DBNAME" // DBNAME换成你项目对应的数据库名
      })
  }))
```
  
  