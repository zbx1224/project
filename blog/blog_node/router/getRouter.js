const express = require("express");
const router = express.Router();
const userDB = require("../database/user");
const messageDB = require("../database/message");
const articleDB =require("../database/article") 
//请求留言数据
router.get("/msg",async (req,res)=>{
  let msgDoc = await messageDB.find({},{},{sort:{date:-1}}).populate("author",{password:0,__v:0, admin:0
}).populate("children.author").populate("children.replyUser",{password:0,__v:0,admin:0});//同时查询写子级回复的ID
  res.send({
      code:0,
      message:"留言请求成功",
      data:msgDoc
  })
});
//获取文章详情数据
router.get("/articleDetails", async (req,res)=>{
  let {id} = req.query; //文章id
  let doc = await articleDB.findById(id); 
  if(!doc) return res.send({ code:1, message:"文章id有误，查不到这篇文章"});
  //查到文章数据时
  res.send({ code:0, message:"查询成功", data:doc});
})
//获取文章全部数据
router.get("/art",async(req,res)=>{
  let articleDoc = await articleDB.find();
  if(articleDoc === 0){
    res.send({
      code:1,
      message:"暂无文章，请等待管理员上传"
    })
  }else{
    res.send({
      code:0,
      message:"成功获取所有文章数据",
      data:articleDoc
    })
  }
})











module.exports = router;