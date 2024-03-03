<template>
  <div class="loginuser">
      <el-popover
    placement="bottom-end"
    width="200"
    trigger="hover">
    <template #reference>
       <img :src="'/node/' + userInfo.photo" alt="">
    </template>
    <div>
      <el-button type="primary" size ="mini" @click="changeInfo">修改信息</el-button>
      <el-button type="danger" size ="mini" @click="out">退出登录</el-button>
    </div>
  </el-popover>
  </div>
</template>

<script>
import {mapState, mapMutations} from "vuex"
export default {
     name:"LgUser",
     computed:{...mapState(["userInfo"])},
     methods:{
       ...mapMutations(["deleteUserInfo"]),
       changeInfo(){
         //跳转到/updateUser路由下  编程式导航
        this.$router.push("/updateUser")
       },
      async out(){
          let {data}= await this.$axios({
            method:"post",
            url:"/node/blog/out"
          });
           this.$message({
                  showClass:true,
                  message:"退出成功",
                  type:'success',
                  duration:2000
            });
            this.deleteUserInfo();
            this.$router.push("/")
       }
     }
}
</script>

<style lang="less" scoped>
.loginuser{
    width: 34px;
    height: 34px;
    margin: 8px 0;
    img{
       width: 34px;
       height: 34px;
       background: none center  center / cover;
       border-radius: 50%;
       cursor: pointer;
    }
}
</style>