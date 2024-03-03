<template>
    <div>
        <article>
            <main id="mdHtml"></main>
        </article>
    </div>
</template>

<script>
export default {
    name:"ArticleDetails",
    async mounted(){
        const id = this.$route.params.id;  //得到动态路由的id值
        let {data} = await this.$axios({
            method:"GET",
            url:"/node/data/articleDetails",
            params:{id}
        });
        if(data.code) {
           this.$message.error("你要查阅的文章不存在！");
            this.$router.replace("/article");
        }else{
             //发起请求，通过md文件地址得到文件数据
        let mdData = await this.$axios({
            method:"GET",
            url:'/node'+ data.data.mdUrl,
        });
        editormd.markdownToHTML("mdHtml", {
            markdown: mdData.data //md文件数据
        });
      } 
    }
}
</script>