<template>
  <div class="about">
    <article>
      <h2>留言板</h2>
      <p>请文明发言，禁止广告。不然拉黑了嗷😂\(^o^)/~</p>
      <el-input
        type="textarea"
        :rows="3"
        placeholder="请输入内容"
        v-model="textarea"
        maxlength="100"
        show-word-limit
      >
      </el-input>
      <div class="publish">
        <div class="emoji-box">
          <i class="iconfont icon-biaoqing" @click.stop="showEmoji"></i>
          <div class="emoji" v-show="isShow">
            <ul>
              <li v-for="(item,index) in arrEmoji" :key="index" @click="printEmoji(item)">{{item}}</li>
            </ul>
          </div>
        </div>
        <el-button type="primary" size="mini" @click="submit">发表留言</el-button>
      </div>
    </article>
    <!-- 评论展示区 -->
    <article class="comment-area">
      <ul>
        <li v-for="item in arrMessage" :key="item._id">
          <!-- 评论(父级/一级) -->
          <div class="comment-wrap">
            <img :src="'/node'+item.author.photo"> <!--用户头像-->
            <div class="message-box"> <!-- 右侧的盒子 -->
              <div class="name-time">
                <span>{{item.author.user}}</span>
                <span>{{formaDate(item.date)}}</span>
              </div>
              <p class="text">{{item.content}}</p>
              <div class="like-reply">
                <i class="iconfont icon-xinaixin" :class="{red:item.likes.includes(userInfo._id ) && userInfo._id}" @click="commentLikes(item._id)"></i>
                <span>{{item.likes.length}}</span>
                <i class="iconfont icon-huifu" @click="commentReply(item)"></i>
              </div>
            </div>
          </div>
          <!-- 回复(子级/二级) -->
          <div class="reply-wrap" v-for="(childItem, index) in item.children" :key="childItem._id">
            <img :src="'/node'+childItem.author.photo"> 
            <div class="message-box"> 
              <div class="name-time">
                <span>{{childItem.author.user}}</span>
                <span>{{formaDate(childItem.date)}}</span>
              </div>
              <p class="text"><span>@{{childItem.replyUser.user}}</span>&nbsp;&nbsp;{{childItem.content}}</p>
              <div class="like-reply">
                <i class="iconfont icon-xinaixin" @click="replayLikes(item._id,childItem._id,index)"
                :class = "{red: userInfo._id && childItem.likes.includes(userInfo._id)}"
                ></i>
                <span>{{childItem.likes.length}}</span>
                <i class="iconfont icon-huifu" @click="childReply(item,childItem)"></i>
              </div>
            </div>
          </div>
          <!-- 回复框 -->
          <div class="print-reply" :class="{show:item.isShowReply}">
                <el-input size="mini" v-model="item.replyContent" :placeholder="`@${item.replyUser.user}`"></el-input>
               <el-button type="primary" size = "mini" @click="submitReply(item)">提交回复</el-button>
          </div>
        </li>
      </ul>
    </article>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "Message",
  data(){
    return {
      textarea:"",
      isShow:false,
      arrEmoji:[
        "😃","😁","😂","😊","🙃","🥰","😘","🤭","🤔","😏","😵","😟","🙁","😳","😰","😭","😖","😡","😠","😈","🤡","☠️","👻","🙈","🙉","❤️","💖","💢","💣","💤","👋","👍","👌","🤞","🤟","🤙","👊","🖕","🤝","🙏","🙅","🙅‍♂️","👨‍✈️","👩‍✈️","👷","👷‍♀️","🤦","🤦‍♂️","👴","🧓","🐴","🐮","🐖","🐑","🐓","🦚","🐲","🐳","🐟","🐌"
      ],
      //评论数据的数组
      arrMessage:[]
    }
  },
  computed:{
    ...mapState(["userInfo"])
  },
  methods:{
    showEmoji(){
      this.isShow = !this.isShow; //显示/关闭表情框
    },
    printEmoji(item){
      this.textarea += item; //点击输入表情到文本域
    },
    //时间格式转换
    formaDate(date){
      let d = new Date(date),
      yy = d.getFullYear(),
      MM = d.getMonth()+1,
      dd = d.getDate(),
      hh = d.getHours(),
      mm = d.getMinutes(),
      ss = d.getSeconds();
      if(ss>10){
        return `${yy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
      }else{
        return `${yy}-${MM}-${dd} ${hh}:${mm}:${"0" + ss}`
      }
    },
    //发起请求，将留言数据提交后端
  async submit(){
      //判断用户是否登录
      if(!this.userInfo.user) return this.$message.error("请登录后留言");
      let valMsg = this.textarea.trim()
      if(!valMsg) return this.$message.error("留言内容不为空");
       
       //发送数据到后端
      let {data} =  await this.$axios({
         method:"post",
         url:"/node/msg/message",
         data:{valMsg}
       });
       if(data.code) return this.$message.error(data.message);
       this.$message.success(data.message);
       this.getMessage();
       //清空文本域内容
       this.textarea = "";
 },
 //获取留言数据
  async getMessage(){
      let {data} = await this.$axios({
        method:"GET",
        url:"/node/data/msg"
      });
      data.data.forEach(item => {
        item.isShowReply = false;
        item.replyContent="";
        item.replyUser = item.author; //父级id
      });
      this.arrMessage = data.data; //将数据赋值给数组
    },
    //点赞
    async commentLikes(commentId){
       if(!this.userInfo.user) return this.$message.error("请登录后留言");
       //记录状态   点赞/不点赞      后端
        let {data} = await this.$axios({
        method:"post",
        url:"/node/msg/likes",
        data:{id:commentId}
      });
       if(data.code) return this.$message.error(data.message);
       this.getMessage();
    },
    //点击父级
    commentReply(item){
      if(!this.userInfo.user) return this.$message.error("请登录后回复");
       if(item.author._id !== item.replyUser._id){
         item.isShowReply = true
       }else{
          item.isShowReply = !item.isShowReply
       }
       item.replyUser = item.author;
    },
    //点击子集点赞
    async replayLikes(pId,cId,index){
          if(!this.userInfo.user) return this.$message.error("请登录后留言");
            //提交数据  评论父级id， 当前id,所在下标
            let {data} = await this.$axios({
            method:"post",
            url:"/node/msg/clike",
            data:{pId,cId,index}
      });
     if(data.code) return this.$message.error(data.message);
     this.getMessage();
    },
    //点击提交回复
    async submitReply(item){
      if(!this.userInfo.user) return this.$message.error("请登录后回复");
      //提交回复内容：内容，id，作者id
      let content = item.replyContent.trim();
      if(!content) return this.$message.error("请输入回复内容");
      let {data} = await this.$axios({
        method:"post",
        url:"/node/msg/submitreply",
        data:{
            id:item._id,//评论的id
            content,//回复内容
            replyUser: item.replyUser._id    //父级评论id
        }
      });
       if(data.code) return this.$message.error("回复失败");
       this.$message.success("回复成功");
       this.getMessage();
       console.log(data);
    }, 

    
    //点击子级回复框
    childReply(item,childItem){
       if(!this.userInfo.user) return this.$message.error("请登录后留言");
       
       if(childItem.author._id !== item.replyUser._id){
         item.isShowReply = true
       }else{
          item.isShowReply = !item.isShowReply
       }
       item.replyUser = childItem.author
    }
  },
  created(){
      this.getMessage();
  },
  mounted(){
    document.addEventListener("click",()=>{
      this.isShow = false;
    })
  }
};
</script>
<style lang="less" scoped>
article {
  width: 100%;
  margin-bottom: 15px;
  padding: 25px 20px;
  background-color: #fff;
  font-family: Quicksand, Microsoft YaHei, sans-serif;
  box-sizing: border-box;
  box-shadow: 0 0 4px #ddd;
  h2 {
    margin-bottom: 15px;
    font-size: 20px;
    letter-spacing: 3px;
    line-height: 24px;
    border-left: 5px solid #73b899;
    text-indent: 10px;
  }
  p {
    text-indent: 2em;
    color: #444;
    font-size: 14px;
    letter-spacing: 4px;
    line-height: 30px;
  }
  /deep/ textarea{
    margin-top: 10px;
  }
  .publish{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    .emoji-box{
      position: relative;
      .emoji{
        position: absolute;
        top: 30px;
        padding: 8px;
        background-color: #fff;
        box-shadow: 0 0 3px #ccc;
        &::before{
          content: "";
          position: absolute;
          top: -12px;
          left: -1px;
          z-index: 10;
          width: 0;
          height: 0;
          border: 6px solid transparent;
          border-bottom-color: #d8d6d6;
        }
        ul{
          display: flex;
          flex-wrap: wrap;
          width: 250px;
          border-left: 1px solid #d8d6d6;
          border-bottom: 1px solid #d8d6d6;
          li{
            overflow: hidden;
            width: 25px;
            height: 25px;
            border-right: 1px solid #d8d6d6;
            border-top: 1px solid #d8d6d6;
            line-height: 25px;
            font-size: 18px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
}
article.comment-area{
  ul li{
    padding-bottom: 5px;
    margin-bottom: 10px;
    border-bottom: 1px dashed #ddd;
    font-size: 12px;
    font-family: Microsoft YaHei, "sans-serif";
    .reply-wrap{
      margin: 10px 8px 8px 55px;
    }
    .comment-wrap, .reply-wrap{ //评论
      display: flex;
      img{
        width: 40px;
        height: 40px;
        margin-right: 15px;
        border-radius: 50%;
      }
      .message-box{
        .name-time{
          font-size: 12px;
          margin-bottom: 3px;
          span:nth-child(1){
            color: #73b899;
          }
          span:nth-child(2){
            color: #aaa;
            margin-left: 10px;
          }
        }
        p.text{
          text-indent: 0;
          color: #666;
          letter-spacing: 2px;
          margin-bottom: 3px;
          word-break: break-word;
          span{
            color:slateblue
          }
        }
        .like-reply{
          i{
            cursor: pointer;
            font-size: 14px;
            color: #aaa;
          }
          .red{
            color:red;
          }
          span{
            margin-right: 40px;
            font-size: 12px;
            color: #aaa;
          }
        }
      }
    }
    // 回复框
    .print-reply{ 
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      box-sizing: border-box;
      transition: height .2s;
      &.show{
        height: 60px;
      }
      .el-button{
        float: right;
      }
    }
  }
}
</style>

