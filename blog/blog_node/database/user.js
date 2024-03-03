const mongoose = require("mongoose");
const Schma = mongoose.Schema;
const userSchma = new Schma({
    user :{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
        type:Boolean,
        default:false
    },
    photo:{
        type:String,
        default:"/vue_img/music_bg.webp"
    }
});

module.exports = mongoose.model("userinfo",userSchma)
