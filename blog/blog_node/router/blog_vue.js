const express = require("express");
const router = express.Router();
const email = require("../module/plugin/email");
const svg = require("../module/plugin/svg");
const userDB = require("../database/user");
const multer = require("multer")
const path = require("path")
//设置邮件
router.post("/setEmail",(req,res)=>{
    let {ruleForm} = req.body;
    email(ruleForm,callback);
    function callback(val){
        res.send(val)
    }
    
})
//设置注册
router.post("/reg",async (req,res)=>{
    let {user,password} = req.body;
    //格式校验
    if(/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)){
        //数据正确，存入数据库
        //查询用户是否存在
       let bol =await userDB.findOne({user});
        if(bol){
          //存在
        res.send({
            code:2,
            mess:"用户已存在"
        })
        }else{
            //不存在
          await userDB.create({user,password})
          res.send({
              code:1,
              mess:"注册成功"
          })
        }
    }else{
        res.send({
            code:0,
            mess:"注册失败，格式不正确"
        })
    }
})
//设置登录
router.post("/login",async(req,res)=>{
    let {user,password} = req.body;
    //格式校验
    if (/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user) && /^[a-zA-Z]\w{5,17}$/.test(password)) {
        let userDoc = await userDB.findOne({ user });
        if (userDoc == null) {
            res.send({
                code: 0  //用户不存在
            })
            return;
        }
        if (userDoc.password === password) {
           let userInfo = {
               user:userDoc.user,
               _id:userDoc._id,
               photo:userDoc.photo,
               admin:userDoc.admin,
           }
            //将用户信息存到seesion中
           req.session.userInfo = userInfo;
            res.send({
                code: 1 , //登录成功
                data:userInfo
            });
           
        } else {
            res.send({
                code: 2 //密码不正确
            })
            return;
        }
    } else {
        res.send({
            code: 0,
            mess: "注册失败，格式不正确"
        })
    }
})
//检测是否登录
router.post("/isCheck",(req,res)=>{
    let data = req.session.userInfo;
    if(data){
       res.send({
           code:1,
           msg:"登录成功",
           data
       })
    }else{
       res.send({
           code:0,
           msg:"未登录",
           data:{}
       })
    }
})
//退出登录
router.post("/out",(req,res)=>{
    req.session.destroy();
    res.send({
        code:0
    })
})
//鉴权
router.use((req,res,next)=>{
   if(!req.session.userInfo){
      return res.send({
          code:7,
          message:"未登录，不能修改个人信息"
      })
   }
   next()
})
//修改用户名
router.post("/name",async (req,res)=>{
    let {user} = req.body;
    if(/^[a-zA-Z0-9_\u4e00-\u9fa5]{1,8}$/.test(user)){
        //判断新名字
        if(user ===req.session.userInfo.user){
           return res.send({
                code:1,
                msg:"与原用户名相同，不可以更改"
            })
        }
        let userDoc = await userDB.findOne({user});
        if(userDoc){
          return res.send({
                code:2,
                msg:"该用户名已被注册"
            })
        }
        await userDB.findByIdAndUpdate(req.session.userInfo._id,{user});
        //更新seeion里存储数据
        req.session.userInfo.user = user;
        res.send({
            code:0,
            msg:"修改成功",
            data:req.session.userInfo
        })
    }
})
//修改密码
router.post("/pass",async (req,res)=>{
    let {oldPassword,newPassword}=req.body;
 if (/^[a-zA-Z]\w{5,17}$/.test(newPassword)){
    if(oldPassword===newPassword){
        return res.send({
            code:2,
            message:"新旧密码不能相同"
        })
    }
      let  doc=await userDB.findById(req.session.userInfo._id)
      if(doc.password!==oldPassword){
          return res.send({
              code:3,
              message:"原密码不正确"
          })
      }
     await userDB.findByIdAndUpdate(req.session.userInfo._id,{password:newPassword});
     req.session.destroy();
     res.send({
         code:0,
         message:"密码修改成功"
     })
 }else{
     res.send({
         code:1,
         message:"数据格式不规范"
     })
 }
})
//修改头像
router.post("/class",async (req,res)=>{
    let name = null;
    //配置multer中间件处理表单上传图片文件
    let upload =  multer({
        storage:multer.diskStorage({
            //设置文件存储在服务端的目录
            destination(req,file,callback){
                callback(null,path.join(__dirname,"../public/vue_img"));
            },
            //设置文件名（防重名）
            filename(req,file,callback){
                //名称  后缀名
            let {ext} = path.parse(file.originalname);
            name =  req.session.userInfo._id + new Date().getTime() + ext;
                callback(null,name);
            }
        })
    }).single("file"); //处理文件时，name值要匹配
    upload(req,res,async (err)=>{
       if(err){
           res.send({
               code:4,
               message:"头像上传失败"
           })
       }else{
          //改数据库图片路径
        let photo = `/vue_img/${name}`;
        await userDB.findByIdAndUpdate(req.session.userInfo._id,{photo});
        //改session路径
        req.session.userInfo.photo = photo;
        //响应前端
        res.send({
            code:0,
            message:"头像修改成功",
            data:req.session.userInfo
        })
       }
    })
})
//设置SVG图片
router.get("/svg",(req,res)=>{
    let{text,data} = svg()
    res.send({text,data})
})

module.exports = router;
