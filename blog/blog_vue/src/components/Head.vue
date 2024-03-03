<template>
  <div class="mask_wrap">
    <div class="wrap_center">
      <div class="logo">
        <img src="@/assets/logo.png" alt="" class="logo_img" draggable="false">
      </div>
      <ul class="nav_list_center">
        <li v-for="(item,index) in navListArr" :key="index">
         <router-link :to="item.path">{{item.title}}</router-link></li>
      </ul>
      <!-- 音乐播放器 -->
      <!-- <HeadMusic /> -->
      <!-- 登录 -->
      <LgUser v-if="userInfo.user"></LgUser>
      <Longin v-else></Longin>
    </div>
  </div>
</template>

<script>
import HeadMusic from "./headbase/HeadMusic"
import Longin from "./headbase/Longin.vue"
import LgUser from "./headbase/LgUser.vue"
import { mapState} from "vuex"
import { computed } from "vue"
export default {
     name:"Head",
     components:{ HeadMusic, Longin, LgUser, Longin, LgUser },
     computed:{
      ...mapState(["userInfo"])
     },
     data(){
         return{
           navListArr:[{
             path:"/",
             title:"首页"
           },
           {
             path:"/article",
             title:"文章"
           },
           {
             path:"/message",
             title:"留言"
           },
           {
             path:"/links",
             title:"友链"
           },
           {
             path:"/about",
             title:"关于"
           }]
         }
     }
}
</script>

<style lang="less" scoped>
    a{
      text-decoration: none;
      color: black;
    }
    .mask_wrap{
      position: fixed;
      top: 0;
      width: 100%;
      height: 50px;
      background:#fff ;
      box-shadow: 0 0 5px 1px #eee;
      z-index: 99;
      .wrap_center{
        display: flex;
        justify-content: space-between;
        max-width: 1200px;
        min-width: 375px;
        height: 50px;
        margin: 0 auto;
        //设置logo
        .logo{
          user-select: none;
           .logo_img{
          width: 100px;
          height: 50px;
        }
        }
        //设置导航
        .nav_list_center{
          display: flex;
          line-height: 50px;
          height: 50px;
          user-select: none;
          flex-grow: 1;
          li{
            padding: 0 40px;
          }
        }
        //播放器
        .music{
          height: 50px;       
        }
        //设置登录注册
        .key_login{
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;     
          &:hover{
            background: #eee;
          }
        }
      }
    }
</style>