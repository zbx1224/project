<template>
  <div>
     <div>
    <el-form ref="linkForm" :model="linkForm" :rules="rules" label-width="80px" labelPosition="top">
      <el-form-item label="名称" prop="name">
        <el-input v-model="linkForm.name"></el-input>
      </el-form-item>
      <el-form-item label="首页地址" prop="home">
        <el-input v-model="linkForm.home"></el-input>
      </el-form-item>
      <el-form-item label="图标地址" prop="logo">
        <el-input v-model="linkForm.logo"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="describe">
        <el-input v-model="linkForm.describe"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" @click="submitAdd">确认添加</el-button>
      </el-form-item>
    </el-form>
  </div>
  </div>
</template>

<script>
import {mapMutations} from "vuex";
export default {
    name:"AddLink",
    data(){
        return{
            linkForm:{
               name:"",
               home:"",
               logo:"",
               describe:""
            },
            rules:{
                name:[{ required: true}],
                home:[{ required: true, type:"url", message:"你输入的内容不是一个url"}],
                logo:[{ required: true, type:"url", message:"你输入的内容不是一个url"}],
                describe:[{ required: true}]
            }
        }
    },
    methods:{
       ...mapMutations(["noticeAddLink"]),
      submitAdd(){
          this.$refs.linkForm.validate(async v=>{
              if(v){
                  let {data} = await this.$axios({
                      method: "POST",
                      url:"/node/admin/addlink",
                      data: this.linkForm
                  });
                  // console.log(data);
                  this.$message.success(data.message);
                  this.$refs.linkForm.resetFields(); //清空表单
                  this.noticeAddLink(); //修改vuex里的state数据
              }else{
                  return false;
              }
          });
        }
    }
}
</script>

<style>

</style>