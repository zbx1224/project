const mongoose = require("mongoose");
const Schma = mongoose.Schema;
const linkSchma = new Schma({
    name:String, //名称
    home:String, //地址
    logo:String, //图标
    describe:String  //描述
})
module.exports = mongoose.model("link",linkSchma)
