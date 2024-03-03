const nodemailer = require("nodemailer");
module.exports = ({userName, email,theme, emailInfo},callback)=>{
    //创建邮件发送节点
    let transporter = nodemailer.createTransport({
        host: "smtp.qq.com",
        secure: false, 
        auth: {
          user: "1727572412@qq.com", //发送邮件账号
          pass: "xpgfjsedhczobjcj", //发送邮件账号的授权码
        },
      });
      //邮件发送
      let info = [{
        from:{
            name:userName ,
            address: "1727572412@qq.com"
        },// sender address
        to: "1727572412@qq.com", // list of receivers
        subject:theme, // Subject line
        text:userName+"先生(女士):" + emailInfo +"(联系邮箱："+ email +")", // plain text body
      },
      {
        from: '"yangZhi" <1727572412@qq.com>', // sender address
        to:  email, // list of receivers
        subject: "自动回复", // Subject line
        text: "收到您的消息，我会尽快回复", // plain text body
      }
    ]
     info.forEach((item,index)=>{
         transporter.sendMail(item,(error,info)=>{
              if(error!=null){
                 callback("0")
              }
              if(index==1){
                  callback("1")
              }
          });
     })
       
}