const mongoose = require("mongoose");
const Schma = mongoose.Schema;
const messageSchma = new Schma({
    //留言时间  点赞数  用户名  回复的用户名 回复留言
    content:{
        type:String,
        required:true
    },
    date:{
        type:Number,
        default:Date.now
    },
    likes:[//存储点赞评论的id
       {type:Schma.Types.ObjectId}    
    ],
    author:{//当前发表这条评论的用户
        type:Schma.Types.ObjectId,
        ref:"userinfo",
        required:true
    },
    children:[//回复评论
      {
        content:String,
        author:{type:Schma.Types.ObjectId,ref:"userinfo"},
        date:{
            type:Number,
            default:Date.now
        },
        likes:[//存储点赞评论的id
           {type:Schma.Types.ObjectId}    
        ],
        replyUser:{type:Schma.Types.ObjectId,ref:"userinfo"}

      }
    ]
});

module.exports = mongoose.model("message",messageSchma) //导出message留言表操作对象