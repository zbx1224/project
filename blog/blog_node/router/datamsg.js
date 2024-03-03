const express = require("express");
const router = express.Router();
const userDB = require("../database/user");
const messageDB = require("../database/message");
const message = require("../database/message");
//鉴权
router.use((req,res,next)=>{
    if(!req.session.userInfo){
       return res.send({
           code:7,
           message:"未登录，不能发表留言"
       })
    }
    next()
 })
 router.post("/message",async (req,res)=>{
      let {valMsg} = req.body;
      valMsg = valMsg.trim()
      //验证数据格式
      if(!valMsg || valMsg.length>100){
          return res.send({
              code:1,
              message:"留言格式不正确"
          })
      }
      messageDB.create({
          content:valMsg,
          author:req.session.userInfo._id
      });
      res.send({
          code:0,
          message:"评论成功"
      })
 });
//给父级点赞
router.post("/likes",async (req,res)=>{
    let {id} = req.body;
    //校验
    if(!id){
        return res.send({
            code:1,
            message:"id没发送过来"
        });

    }
    let commentDoc = await messageDB.findById(id);
    if(!commentDoc){
        return res.send({
            code:2,
            message:"id查找不到"
        });
    }
    let userId = req.session.userInfo._id;
    if(commentDoc.likes.includes(userId)){
        await messageDB.findByIdAndUpdate(id,{$pull:{likes:userId}});
    }else{
        await messageDB.findByIdAndUpdate(id,{$push:{likes:userId}});
    }
    res.send({
        code:0,
        message:"点赞操作已完成"
    })
});
//添加父级评论
router.post("/submitreply",async (req,res)=>{
   let {id,content,replyUser} = req.body;
   //判断格式
   if(!content) return res.send({code:1,message:"内容不能为空"})
   if(content.length>100) return res.send({code:2,message:"内容超过限制"})
   //判断当前父级评论是否存在
   let doc1 = await messageDB.findById(id);
   if(!doc1) return res.send({code:3,message:"评论id错误"});
   let doc2 = await userDB.findById(replyUser);
   if(!doc2) return res.send({code:4,message:"用户不存在"});
    await messageDB.findByIdAndUpdate(id,{
        //往child添加内容
        $push:{
           children:{
               content,
               author:req.session.userInfo._id,//这条回复是谁写的
               replyUser   //父级id
           }
        }
    });
    res.send({
        code:0,
        message:"回复成功"
    })
});
//给子级点赞
router.post("/clike",async (req,res)=>{
   let {pId,cId,index} = req.body;
   let  parent = await messageDB.findById(pId);
   let childDoc = parent.children.id(cId); //得到当前点赞的子级数据
   let userId = req.session.userInfo._id;
   if(!parent) return res.send({code:1,message:"不存在这条评论"});
   if(!childDoc) return res.send({code:2,message:"没有该评论"})
    if(childDoc.likes.includes(userId)){
        await messageDB.findByIdAndUpdate(pId,{$pull:{
            [`children.${index}.likes`]:userId
        }});
    }else{
        await messageDB.findByIdAndUpdate(pId,{$push:{
            [`children.${index}.likes`]:userId
        }});
    }
    res.send({
        code:0,
        message:"点赞成功"
    })
//    console.log(child);
})
 module.exports = router;










module.exports = router;