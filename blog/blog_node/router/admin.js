const express = require("express");
const router = express.Router();
const linkDB = require("../database/Link")
const {URL} = require("url")
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
router.post("/ischeck",(req,res)=>{
    res.send({
        code:0,
        message:"欢迎管理员登录"
    })
})
//友链的增加
router.post("/addlink",async (req,res)=>{
    //鉴定字段是否为空，鉴定是否为url格式

    let {origin} = new URL(req.body.home);
    let linkDoc =await linkDB.findOne({home:new RegExp(origin)})
    //判断是否重复友链
    if(linkDoc) return res.send({code:10,message:"请不要重复添加相同网站"})
    
    await linkDB.create(req.body);
    res.send({
        code:0,
        message:"添加友链成功"
    })
});
//读取友链数据
router.get("/getlink",async (req,res)=>{
   let link= await linkDB.find();
   res.send({
       code:0,
       message:"成功获取友链数据",
       data:link
   })
})
//修改友链信息
router.post("/chagelink",async (req,res)=>{
    let{_id,name,home,logo,describe} = req.body;
    //校验

    await linkDB.findByIdAndUpdate(_id,{name,home,logo,describe})
    res.send({
        code:0,
        message:"修改成功"
    })
})
//删除友链数据
router.delete("/delete", async (req,res)=>{
    let {_id} = req.body; //友链id
    // 友链存在，才进行删除
    let linkDoc = await linkDB.findById(_id);
    if(!linkDoc) return res.send({code:1, message:"你要删除的这条友链不存在，请检查！"});

    await linkDB.findByIdAndDelete(_id); //根据id删除数据
    res.send({code:0, message:"友链删除成功"});
});









module.exports = router;