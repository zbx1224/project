<template>
  <div>
    <el-table
    :data="linkInfo"
    style="width: 100%">
    <el-table-column
      label="名称"
      width="180">
      <template slot-scope="scope">
        <el-input v-model="scope.row.name"></el-input>
      </template>
    </el-table-column>
     <el-table-column
      label="首页"
      width="180">
      <template slot-scope="scope">
        <el-input v-model="scope.row.home"></el-input>
      </template>
    </el-table-column>
     <el-table-column
      label="logo"
      width="180">
      <template slot-scope="scope">
        <el-input v-model="scope.row.logo"></el-input>
      </template>
    </el-table-column>
     <el-table-column
      label="描述"
      width="180">
      <template slot-scope="scope">
        <el-input v-model="scope.row.describe"></el-input>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
        type="primary"
          size="mini"
          @click="handleEdit(scope.row)">修改</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    name:"ManageLink",
    data(){
        return{
            linkInfo:[],
        };
    },
    methods:{
        //修改友链
    async  handleEdit(item){
        let{data} = await this.$axios({
            method:"post",
            url:"/node/admin/chagelink",
            data:{
              _id:item._id,
              name:item.name,
              home:item.home,
              logo:item.logo,
              describe:item.describe
            }
        })
        this.$message.success(data.message)
      }, 
      //删除友链
    async  handleDelete(item){
          //  删除友链
      let { data } = await this.$axios({
        method: "delete",
        url: "/node/admin/delete",
        data: {_id: item._id,},
      });
      if(data.code) return this.$message.error(data.message);
      this.$message.success(data.message);
      this.getLink();//重新获取所有友链数据
      },
      async getLink(){
          let {data} = await this.$axios({
              method:"get",
              url:"/node/admin/getlink"
          });
          this.linkInfo = data.data
       }
     },
     created(){
       this.getLink();
     }
};
</script>

<style lang="less" scoped>

</style>