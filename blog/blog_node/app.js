const express = require("express")
const app = express()

// 配置静态
app.use(express.static("./public"))
// 解析请求数据
app.use(require("./middleware/session"))
app.use(express.urlencoded({extended:true}))//提前处理请求传过来的数据
app.use(express.json())//对提交数据进行格式化处理
//监听用户有关
app.use("/blog",require("./router/blog_vue"))
//监听留言，提交评论
app.use("/msg",require("./router/datamsg"))
//监听读取信息
app.use("/data",require("./router/getRouter"))
//监听后端内容
app.use("/admin",require("./router/admin"))
//监听文章内容
app.use("/article",require("./router/article"))
app.listen("80",()=>{
    console.log("80端口连接成功");
})
//连接数据库
require("./middleware/mongoose");
//配置基础中间件

//设置路由监听
//session    服务端
//cookie     客户端

