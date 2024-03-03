<template>
  <el-upload
    class="avatar-uploader"
    action="/node/blog/class"
    :show-file-list="false"
    :with-credentials="true"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <!-- 缩略图 -->
    <img v-if="imageUrl" :src="imageUrl" class="avatar" ref ="img"  />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "UpdatePhoto",
  data(){
      return {
          imageUrl:"",
      }
  },
  // 上传文件之前的钩子函数，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
  methods:{
    ...mapMutations(["updataUserInfo"]),
    //修改头像
    beforeAvatarUpload(file){
    const isJPG = file.type === 'image/jpeg' ||file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isJPG) {
          this.$message.error('上传头像图片只能是JPG格式或者PNG格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;

  },
  //文件上传成功时的钩子函数
  handleAvatarSuccess(res,file){
    if(res.code) return this.$message.error(res.message);//上传失败
    this.$message.success("头像修改成功")
    this.imageUrl = URL.createObjectURL(file.raw);//设置缩略图的路径
    this.updataUserInfo(res.data);
  }
  }
 
};
</script>

<style lang="less" scoped>
 /deep/.el-upload{
    position: relative;
    overflow: hidden;
    border: 1px dashed #d9d9d9;
    cursor: pointer;
    border-radius: 6px;
    .avater{
        display: block;
        max-width: 178px;
        max-height: 178px;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
}
</style>