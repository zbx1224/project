<template>
<div>
<el-button type="primary" size="mini"  @click="showlongin">登录/注册</el-button>
  <div class="login" v-if="show" @click.self="showclose">
   <div class="content">
       <el-tabs v-model="activeName">
          <el-tab-pane label="登录" name="first">
             <el-form
            :model="loginForm"
            :rules="rules"
            ref="loginForm"
            label-width="100px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="loginForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="loginForm.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="loginSubmit">登录</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
          <el-tab-pane label="注册" name="second">
                <el-form
            :model="regForm"
            :rules="rules"
            ref="regForm"
            label-width="100px"
          >
            <el-form-item label="用户名" prop="user">
              <el-input v-model="regForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
              <el-input type="password" v-model="regForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="password2">
              <el-input type="password" v-model="regForm.password2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="regSubmit">注册</el-button>
            </el-form-item>
          </el-form>
          </el-tab-pane>
       </el-tabs>
   </div>
   </div>
</div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
      name: "Longin",
        data() {
      return {
        show:false,
        activeName: 'first',
         regForm: {
        //注册表单内控件绑定的数据
        user: "",
        password: "",
        password2: "",
      },
      loginForm:{
         user: "",
        password: "",
      },
      rules: {
        //form表单里rules属性绑定的对象，用来对表单内控件做格式校验
        user: [
          { required: true, message: "请输入用户名" },
          {
            validator(rule, value, callback) {
              //长度
              if (value.length < 2 || value.length > 8) {
                callback(new Error("请输入2-8位字符"));
              } else {
                //字符验证
                if (/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                  callback(); //验证成功
                } else {
                  callback(new Error("只允许汉字、字母、下划线"));
                }
              }
            },
          },
        ],
        password: [
          { required: true, message: "请输入密码" },
          {
            validator(rule, value, callback) {
              //长度
              if (value.length < 6 || value.length > 18) {
                callback(new Error("请输入6-18位字符"));
              } else {
                //字符验证
                if (/^[a-zA-Z]\w{5,17}$/.test(value)) {
                  callback(); //验证成功
                } else {
                  callback(new Error("以字母开头,只能包含字符、数字和下划线"));
                }
              }
            },
          },
        ],
        password2: [
            { required: true, message: "请确认密码" },
            {
                validator: (rule, value, callback)=>{
                    // console.log(this);
                    if(this.regForm.password === value){
                        callback(); //密码一致
                    }else{
                        callback(new Error("两次密码不一致"));
                    }
                }
            }
        ],
      },
      };
    },
    methods:{
          showlongin(){
                this.show = true
          },
          showclose(){
                this.show = false,
                this.$refs.regForm.resetFields();
                this.$refs.loginForm.resetFields();
          },
           regSubmit() {
        //注册的提交按钮  发起请求到后端
        this.$refs.regForm.validate(async bool => {
            if(bool){//表单数据校验成功
                let {data} = await this.$axios({
                    method:"POST",
                    url:"/node/blog/reg",
                    data:{
                        user:this.regForm.user,
                        password:this.regForm.password,
                    }
                });
                if(data.code==0){
                    this.$message({
                  showClass:true,message:"注册失败，格式不正确",type:'error',duration:2000
                  })
                }
                if(data.code==1){
                  this.$message({
                  showClass:true,message:"注册成功，即将登录",type:'success',duration:2000
                  })
                  this.activeName = 'first',this.$refs.regForm.resetFields();
                }
                if(data.code==2){
                  this.$message({
                  showClass:true,message:"用户已存在",type:'error',duration:2000
                  })
                }
                
            }else{
                return false;
            }
        })
    },
    loginSubmit(){
        this.$refs.loginForm.validate(async bool => {
            if(bool){//表单数据校验成功
                let {data} = await this.$axios({
                    method:"POST",
                    url:"/node/blog/login",
                    data:{
                        user:this.loginForm.user,
                        password:this.loginForm.password,
                    }
                });
                if(data.code==0){
                  this.$message({ showClass:true,message:"用户不存在",type:'error',duration:2000 })
                }
                 if(data.code==2){
                    this.$message({
                  showClass:true, message:"密码错误", type:'error',duration:2000
                  })
                }
                if(data.code==1){
                  this.$message({
                  showClass:true, message:"登录成功", type:'success', duration:2000
                  });
                  this.$refs.loginForm.resetFields();
                  this.show = false;
                  //将响应的数据存在vuex中
                  this.updataUserInfo(data.data);
                }
            }else{
                return false;
            }
        })
    },
    ...mapMutations(["updataUserInfo"])
 },
}
</script>

<style lang="less" scoped>
    .el-button{
          margin:15px 0
    }
    .login{
       position: fixed;
       top: 0;
       left: 0;
       z-index: 999;
       width: 100%;
       height: 100%;
       background-color:rgba(0,0,0,.5);
       .content{
             position: absolute;
             top: 50%;
             left: 50%;
             transform: translate(-50%,-50%);
             width: 300px;
             padding: 10px 20px;
             background: #fff;
       }
    }

</style>