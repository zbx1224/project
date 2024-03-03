const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const articleDB = require("../database/article");

//鉴权
router.use((req,res,next)=>{
    //是否登录，是否是管理员
    if(!req.session.userInfo || (!req.session.userInfo.admin)){
    return res.send({
        code:6,
        message:"您没有管理员权限"
    })
  }
  next();
});
//监听 md文件上传的路由
router.post("/md", (req,res)=>{
    let name = null;
    //存储md文件到服务器下的指定目录
    // 配置multer中间件处理表单上传的md文件
    let upload = multer({
        storage:multer.diskStorage({ //配置项
            // 设置文件存储在服务端的哪个目录
            destination(req, file, callback){
                callback(null, path.join(__dirname, "../public/file/md") );
            },
            // 设置文件的名字（防重名）
            filename(req, file, callback){
                // 名称.后缀名   file.originalname
                let {ext} = path.parse( file.originalname);
                name = "md-"+req.session.userInfo._id + new Date().getTime() + ext;
                callback(null, name);
            }
        })
    }).single("file"); //处理name名为file的控件上传的图片文件   name值要匹配
    
    upload(req, res, async(err)=>{
        //上传失败
        if(err){
            res.send({code:9, message:"上传失败"});
        }else{
            res.send({code:0, message:"md文件上传成功", mdUrl:`/file/md/${name}`});
        }
    });
});


//监听 封面图上传的路由
router.post("/cover", (req,res)=>{
    let name = null;
    //存储封面图到服务器下的指定目录
    // 配置multer中间件处理表单上传的jpg文件
    let upload = multer({
        storage:multer.diskStorage({ //配置项
            // 设置文件存储在服务端的哪个目录
            destination(req, file, callback){
                callback(null, path.join(__dirname, "../public/file/cover") );
            },
            // 设置文件的名字（防重名）
            filename(req, file, callback){
                // 名称.后缀名   file.originalname
                let {ext} = path.parse( file.originalname);
                name = "cover-"+req.session.userInfo._id + new Date().getTime() + ext;
                callback(null, name);
            }
        })
    }).single("file"); //处理name名为file的控件上传的图片文件   name值要匹配

    upload(req, res, async(err)=>{
        //上传失败
        if(err){
            res.send({code:9, message:"封面上传失败"});
        }else{
            res.send({code:0, message:"封面上传成功", coverUrl:`/file/cover/${name}`});
        }
    });
});


//监听文章数据的路由，将文章数据添加到数据库中
router.post("/add", async (req,res)=>{
    // console.log(req.body);
    let {title, describe, mdUrl, coverUrl} = req.body;
    // console.log(title, describe, mdUrl, coverUrl);
    // 将文章数据存到数据表
    let doc = await articleDB.create({ 
        title: title || undefined,
        describe: describe || undefined,
        mdUrl,
        coverUrl: coverUrl  || undefined,
        author:req.session.userInfo._id
    });
    // console.log(doc);
    res.send({code:0, message:"文章发表成功", data:{id:doc._id}});  //返回文章id
})

//监听修改数据的路由
router.post("/update", async (req,res)=>{
    let {id, doc} = req.body;
    await articleDB.findByIdAndUpdate(id, doc,);
    //id是否存在的校验
    res.send({code:0, message:"修改成功"});
});

//监听删除文章的路由
router.delete("/delete", async (req,res)=>{
    let {id} = req.body;
    /* 删除文章的同时把md/cover文件也一起删了
        1.删除文章时，根据id查到md / cover的存放地址，进行删除
        2.再到表中删除这条数据
    */
    await articleDB.findByIdAndDelete(id);//到表中删除文章数据
    //id是否存在的校验
    res.send({code:0, message:"删除成功"});
})


module.exports = router;