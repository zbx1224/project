<template>
     <div class="home">
       <!-- 介绍 -->
        <article class="introduce">
          <div class="descr">
            <h2>HELLO</h2>
             <p>
              你好！欢迎来到我的博客！我是一名WEB前端攻城狮，热衷于研究JavaScript、NodeJs、Vue、React…这是我的主页！我会在这里发表一些不成熟的技术文章，记录一些沙雕的日常。博客目前使用的是Vue + Element + Node + Express + MongoDB搭建的，如果对源码感兴趣的话可以联系我哦~ 欢迎提出宝贵的建议哦！
            </p>
          </div>
          <div class="info">
            <div class="person">
               <h3>个人信息</h3>
                <ul>
                  <li>
                    <p>xinxi</p>
                    <p>重庆市潼南区塘坝镇</p>
                  </li>
                  <li>
                    <p>xinxi</p>
                    <p>重庆市潼南区塘坝镇</p>
                  </li>
                  <li>
                    <p>xinxi</p>
                    <p>重庆市潼南区塘坝镇</p>
                  </li>
                  <li>
                    <p>xinxi</p>
                    <p>重庆市潼南区塘坝镇</p>
                  </li>
                </ul>
            </div>
            <div class="skills">
              <h3>技能介绍</h3>
              <ul>
                <li><span>html</span><span><el-progress :percentage="50" color="#f56c6c"></el-progress></span></li>
                <li><span>html</span><span><el-progress :percentage="50"></el-progress></span></li>
                <li><span>html</span><span><el-progress :percentage="50"></el-progress></span></li>
                <li><span>html</span><span><el-progress :percentage="50"></el-progress></span></li>
              </ul>
            </div>
          </div>
           
       </article>
       <!-- 推荐 -->
        <article class="recommed">
          <div class="descr">
             <h2>推荐</h2>
            <p><a href="/article" >更多热门文章</a> 请访问文章页（￣︶￣）↗　</p>
          </div>
          <div class="content">
            <ul>
              <li>
                <img src="../assets/hot1.png" alt="">
                <h4>标题</h4>
                <div class="cover">
                  <a href="/article">
                    <p>描述内容</p>
                    <p>点击</p>
                  </a>
                </div>
              </li>
              <li>
                <img src="../assets/hot1.png" alt="">
                <h4>标题</h4>
                <div class="cover">
                  <a href="/article">
                    <p>描述内容</p>
                    <p>点击</p>
                  </a>
                </div>
              </li>
              <li>
                <img src="../assets/hot1.png" alt="">
                <h4>标题</h4>
                <div class="cover">
                  <a href="/article">
                    <p>描述内容</p>
                    <p>点击</p>
                  </a>
                </div>
              </li>
              <li>
                <img src="../assets/hot1.png" alt="">
                <h4>标题</h4>
                <div class="cover">
                  <a href="/article">
                    <p>描述内容</p>
                    <p>点击</p>
                  </a>
                </div>
              </li>
            </ul>
          </div>
       </article>
       <!-- work -->
        <article class="work">
          <div class="descr">
            <h2>项目经历</h2>
            <p></p>
          </div>
           <div class="works">
             <ul>
              <li>
          <p class="time">2021.01</p>
          <div class="introduce">
            <h4>购物商城（原生）</h4>
          </div>
        </li>
        <li>
          <p class="time">2022</p>
          <div class="introduce">
            <h4>后台管理系统（React）</h4>
          </div>
        </li>
        <li>
          <p class="time">2023</p>
          <div class="introduce">
            <h4>个人博客</h4>
          </div>
        </li>
        </ul>
           </div>
            

       </article>
       <div class="contact">
      <div class="descr">
        <h2>联系我</h2>
        <p>有任何问题请联系我吧，收到消息后会给您回复邮件的哦♪(^∇^*)</p>
      </div> 
<el-form 
        :model="ruleForm" 
        :rules="rules" 
        ref="ruleForm"
        label-width="100px" 
        class="demo-ruleForm"
      > 
     <el-form-item label="姓名" prop="userName">
        <el-input type="text" v-model.trim="ruleForm.userName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="你的邮箱" prop="email">
        <el-input type="text" v-model="ruleForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱主题" prop="theme">
        <el-input type="text"  v-model.trim="ruleForm.theme" ></el-input>
      </el-form-item>
      <el-form-item label="邮箱留言" prop="emailInfo">
        <el-input type="text" v-model.trim="ruleForm.emailInfo"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')"><span class="font">重置</span></el-button>
      </el-form-item>
    </el-form>
    </div> 
  </div>
</template>

<script>
import Article from './Article.vue'

export default {
  name: 'Home',
  components: {
    Article
  },
    data(){
        let validateUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('姓名不能为空'));
        }
        callback()
      };
      let validateEmail = (rule, value, callback) => {
        // 邮件正则 
        let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
        if (!value) {
          return callback(new Error('邮件不能为空'));
        }else if(!reg.test(value)){
           return callback(new Error('邮箱地址错误'));
        }
        callback()
      };
      let validateTheme = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('主题不能为空'));
        }
        callback()
      };
      let validateEmailInfo = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('留言不能为空'));
        }
        callback()
      };
       return {
          skillArr:[
         {
           name:"JavaScript"
         },
         {
           name:"ES6"
         },
         {
           name:"JQuery"
         },
         {
           name:"Node-Express-Koa"
         },
         {
           name:"Vue2.0-Vue3.0"
         },
         {
           name:"微信小程序"
         },
         {
          name:"Wabpack-Github"
         },
         {
          name:"Element-Bootstrap-Vant"
         }
      ], 
       ruleForm: {
          userName:"",
          email: '',
          theme: '',
          emailInfo: ''
      },
      rules: {
        userName: [
          { validator: validateUserName, trigger: 'blur' }
        ],
        email: [
          { validator: validateEmail, trigger: 'blur' }
        ],
        theme: [
          { validator: validateTheme, trigger: 'blur' }
        ],
        emailInfo: [
          { validator: validateEmailInfo, trigger: 'blur' }
        ]
      }
       }
     },
     methods: {
    submitForm(formName) {
      // 自定义所有验证数据是否为true
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // ajax请求-
        let {data} = await this.$axios.post("/node/blog/setEmail",{ruleForm:this.ruleForm})
        if(data){
           this.$message({
            showClass:true,
            message:"发送成功",
            type:'success'
          })
        }else{
          this.$message({
            showClass:true,
            message:"发送失败",
            type:'error'
          })
        }
        } else {
          this.$message({
            showClass:true,
            message:"验证不通过",
            type:'error'
          })
        }
      });
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>
<style lang="less" scoped>
    a{
       text-decoration: underline;
       color: #aaa;
      }
    .home > *{
      width: 100%;
      padding: 20px;
      margin-bottom: 15px;
      background-color: #fff;
      box-shadow: 0 0 4px #ddd;
      font-family: Quicksand;
      .work{
           ul{
             li{
               display: flex;
             }
           }
      }
       .descr{
         p{
          border-bottom: 1px solid #ddd;
          margin-bottom: 20px;
          padding-bottom: 20px;
          text-indent: 2em;
          color: #444;
          font-size: 14px;
          letter-spacing: 4px;
          line-height: 30px;
         }
          h2{
          margin-bottom: 15px;
          font-size: 24px;
          letter-spacing: 3px;
          font-weight: bold;
        }
       }
       .info{
         display: flex;
         width: 100%;
         font-size: 14px;
         >div{
           width: 50%;
         }
         h3{
            margin-bottom: 30px;
            font-weight: 400;
            font-size: 22px;
            color: #666;
         }
          .person{
           overflow: hidden;
          li{
           display: flex;
           margin-bottom: 40px;
            &:nth-last-child(1){
            margin-bottom: 0;
           }
            p{
            flex: 1;
           }
           p:nth-child(1){
            font-weight: 700;
          }  
        }
       }
       }
       .skills{
         li{
           margin-bottom: 30px;
         }
       }
       .content ul{
         display: flex;
         overflow: hidden;
         width: 100%;
         justify-content: space-between;
         li{
          position: relative;
           width: 24%;
           img{
             width: 100%;
             height: 100%;
           }
           h4{
             position: absolute;
             bottom: 0;
             left: 0;
             width: 100%;
             height: 28px;
             background-color: rgba(0, 0, 0, .5);
             color: #fff;
             line-height: 28px;
             text-align: center;  
           }
           .cover{
             position: absolute;
             opacity: 0;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             background-color: rgba(0, 0, 0, .3);
             a{
               display: block;
               width: 100%;
               height: 100%;
               text-decoration: none;
               color: #fff;
               text-align: center;
                p {
              position: absolute;
              font-weight: bold;
              transition: 0.3s;
            }
            p:nth-child(1) {
              width: 100%;
              top: 20%;
              font-size: 14px;
            }
            p:nth-child(2) {
              left: 50%;
              bottom: 20%;
              width: 50%;
              height: 30px;
              line-height: 30px;
              background-color: rgb(191, 226, 230);
              color: #000;
              font-size: 14px;
              transform: translateX(-50%);
              border-radius: 15px;
            }
         }

       }
        &:hover .cover {
          opacity: 1;
          p:nth-child(1) {
            top: 30%;
          }
          p:nth-child(2) {
            bottom: 30%;
          }
        }
      }
    }
     .works {
    ul {
      margin: 40px 0;
      li {
        display: flex;
        p.time {
          position: relative;
          top: -12px;
          width: 160px;
          height: 30px;
          margin-right: 28px;
          line-height: 30px;
          text-align: center;
          font-weight: 700;
          background-color: #bfe2e6;
          &::after {
            position: absolute;
            top: 0;
            right: -30px;
            content: "";
            width: 0;
            height: 0;
            border: 15px solid transparent;
            border-left-color: #bfe2e6;
          }
        }
        .introduce {
          position: relative;
          flex: 1;
          padding: 0 40px 40px 20px;
          border-left: 2px solid #bfe2e6;
          &::after {
            position: absolute;
            top: 0;
            left: -3px;
            content: "";
            width: 4px;
            height: 4px;
            background-color: #000;
          }
          h3 {
            position: relative;
            margin-bottom: 20px;
            margin-top: -10px;
            line-height: 25px;
            font-size: 20px;
            font-weight: bold;
          }
          .company {
            color: #000;
            margin-bottom: 20px;
          }
          .describe {
            color: #777;
            letter-spacing: 1px;
            font-size: 16px;
            line-height: 26px;
          }
        }
        &:nth-last-child(1) .introduce {
          padding-bottom: 0;
        }
      }
    }
  }
   .font{
        color: #606266;
      } 
      
    
}

</style>
