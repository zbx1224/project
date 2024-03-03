<template>
  <div>
      <article>
        <el-tabs type="border-card" v-model="activeName">
           <el-tab-pane label="发表文章" name = "first"><Article></Article></el-tab-pane>
           <el-tab-pane label="文章管理" name = "second"><ArticleManager></ArticleManager></el-tab-pane>
           <el-tab-pane label="友链管理" name = "third"><ManageLink></ManageLink></el-tab-pane>
           <el-tab-pane label="添加友链" name = "forth"><Addlink></Addlink></el-tab-pane>
           <el-tab-pane label="反馈收集" name = "fifth">反馈收集</el-tab-pane>
        </el-tabs> 
      </article>

  </div>
</template>

<script>
import Addlink from "../components/admin/AddLink.vue"
import ManageLink from "../components/admin/ManageLink.vue"
import Article from "../components/admin/AddArticle.vue"
import ArticleManager from "../components/admin/ArticleManager.vue"
export default {
   name:"Admin",
   data(){
       return{
           activeName:"first"
       }
   },
   components:{Addlink,ManageLink,Article,ArticleManager},
   methods:{
     //验证是否具有管理员权限
     async isCheck(){
        let {data} = await this.$axios({
          method:"post",
          url:"/node/admin/ischeck",
        })
        if(data.code){
          this.$router.replace("/");
          this.$message.error(data.message)
        }else{
          this.$message.success(data.message)
        }
     }
   },
   created(){
     this.isCheck() 
   }
}
</script>

<style lang="less" scoped>
</style>

