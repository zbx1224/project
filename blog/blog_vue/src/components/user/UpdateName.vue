<template>
  <el-form ref="userForm" :model="userForm" label-width="100px" :rules="rules">
    <el-form-item label="当前用户名">
      <span>{{ userInfo.user }}</span>
    </el-form-item>
    <el-form-item label="新的用户名" prop="user">
      <el-input v-model="userForm.user"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapState } from "vuex"
import { mapMutations } from "vuex";
export default {
  name: "UpdateName",
  data() {
    return {
      userForm: {
        user: "",
      },
      rules: {
        user: [{
            validator: (rule, value, callback) => {
              //长度
              if (value.length < 2 || value.length > 8) {
                callback(new Error("请输入2-8位用户名"));
              } else {
                //字符验证
                if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
                    callback(new Error("只允许汉字、字母、下划线"));
                } 
                //当新名字与旧名字同名时，提示
                if(value === this.userInfo.user){
                    callback(new Error("不能修改为原来的名称"));
                }else{
                    callback(); //验证成功
                }
              }
            },
        }],
      },
    };
  },
  computed: {
    ...mapState(["userInfo"]),
  },
  methods: {
    ...mapMutations(["updataUserInfo"]),
    //修改用户名
    onSubmit() {
      this.$refs.userForm.validate( async (v) => {
          if(v){
              let {data} = await this.$axios({
                  method:"POST",
                  data:{
                    user:this.userForm.user
                  },
                  url:"node/blog/name"
              });
              //根据后端传回来状态判断是否修改成功
              if(data.code==0){
                this.$message({
                  showClass:true,
                  message:"更改成功",
                  type:'success',
                  duration:2000
                  });
                this.updataUserInfo(data.data);//更新vuex
                 this.$refs.userForm.resetFields();//清空表单
            } 
              if(data.code==2){
                   this.$message({
                  showClass:true,
                  message:"用户名已注册",
                  type:'error',
                  duration:2000
                  });
                }
                if(data.code==7){
                   this.$message({
                  showClass:true,
                  message:"未登录，不能修改个人信息",
                  type:'error',
                  duration:2000
                  });
                }
              
          }
      });
    },
  },
};
</script>

<style>
</style>