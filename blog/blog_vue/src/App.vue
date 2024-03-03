<template>
  <div id="app">
     <MaskCanvas/>
     <Head />
     <div class="center_warp">
       <div class="box_left">
         <Sidebar/>
       </div>  
      <div class="center_right">
        <router-view></router-view>
      </div> 
       </div> 
     </div>
</template>

<script>
import Head from "./components/Head"
import Sidebar from "./components/Sidebar.vue"
import MaskCanvas from "./components/MaskCanvas.vue"
import { mapMutations } from "vuex"
export default {
    name:"app",
    components:{
       Head,
       Sidebar,
       MaskCanvas
    },
    methods:{...mapMutations(["updataUserInfo"])},
   async created(){
   let {data} =  await this.$axios({
        method:"post",
        url:"/node/blog/isCheck"
      })
      if(data.code){
        this.updataUserInfo(data.data)
      }
    }
}
</script>

<style lang="less">
    *{
      margin: 0;
      padding: 0;
      user-select: none;
    }
    li,ol{
      list-style: none;
    }

    #app{
      border-top:1px solid ;
    }
    .center_warp{
      display: flex;
      justify-content: space-between;
      margin: 65px auto 0;
      max-width: 1200px;
      min-width: 375px;
      .box_left{
        width: 220px;
        height:100vh;
      }
      .center_right{
         max-width: 915px;
         min-height: 700px;
         flex: 1;
      }
    }
    h3{
      border-left:5px solid #409eff ;
      padding-left: 15px;
    }
    a{
      text-decoration: none;
      }
</style>

