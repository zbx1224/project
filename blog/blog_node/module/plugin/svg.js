const svgCaptcha = require('svg-captcha'); 
module.exports = () =>{
    let captcha = svgCaptcha.create({
        size:4,
        ignoreChars:'0oil',
        noise:3,
        background:'#cc9966',
        width:100,
        height:40
    });
    return captcha
}