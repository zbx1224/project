<template>
  <div class="sideber">
    <div class="touxiang"><img src="@/assets/touxiang.png" alt="" class="touxiang_bg"></div>
    <div class="font_show" @click="changeTransition"><span>不求与人相比，但求超越自己</span></div>
    <transition 
    name="animate__animated animate__bounce"
    enter-active-class="animate__backInLeft"
    leave-active-class="animate__backOutLeft"
    >
        <div v-if = "bol" class="box_train" >{{text_box}}</div>
    </transition> -->
    <!-- 文章 -->
    <div class="fixedbox">
      <div class="article_text">
       <h3>热门文章</h3>
       <ul>
         <li v-for="(item,index) in  article_Arr" :key="index" class="article_text_list">
           <div class="article_bg"><img :src="item.imgSrc" alt=""></div>
           <span>{{item.HotTitle}}</span>
         </li>
       </ul>
    </div>
    <div class="blog_message">
        <h3 class="border_left">博客信息</h3>
        <ul>
            <li
                v-for="(item, index) in blogText"
                :key="index"
            >
                <i :class="item.iconClass"></i> 
                <span>{{item.titleText}}</span>
                <span>{{item.changeNumber}}</span>
            </li>
      </ul>
    </div>
    </div>
    
    <!-- 播客信息 -->
     
  </div> 
</template>

<script>
export default {
    name:"Sidebar",
    data(){
        return {
            bol:false,
            textArr:["我可不会碰你,除非忍不住🤪🤪🤪🤪🤪","该睡觉了😪😪😪","早上好,新的一天⏰⏰⏰","下午好,努力吧少年💦💦💦","晚上好,开始学习了嘛📚︎📚︎📚︎",],
            text_box:"我可不会碰你,除非忍不住🤪🤪🤪🤪🤪",
             article_Arr: [
        {
          imgSrc: require("@/assets/hot1.png"),
          HotTitle: "一个可以绑定多个天翼云网盘的目录列表程序",
        },
        {
          imgSrc: require("@/assets/hot2.png"),
          HotTitle:
            "cpulimit 是一个限制进程的 CPU 使用率的工具（以百分比表示，而不是 CPU 时间）。当您不希望批处理作业占用太多 CPU 周期时，控制批处理作业很有用",
        },
        {
          imgSrc: require("@/assets/hot3.png"),
          HotTitle:
            "查找适合自己当前网络环境的优选Cloudflare Anycast IP，具体这玩意儿有啥用？可以",
        },
        {
          imgSrc: require("@/assets/hot4.png"),
          HotTitle:
            "Deluge是一款免费的 BT 传输软件，相比于其他同类产品，Deluge完美支持各大主流操作系统( Windows 、 Linux 、 Mac OS )，软件体积小巧、绿色安全，",
        },
        {
          imgSrc: require("@/assets/hot5.png"),
          HotTitle:
            "多时候，我们监控程序都使用supervisor，但是在一些小场景中，没必要安装额外的软件，并且supervisor对新手不太友好，需要根据他的语法格式进行撰写",
        },
      ],
      blogText: [
        {
          iconClass: "el-icon-notebook-1",
          titleText: "文章",
          changeNumber: "1",
        },
        {
          iconClass: "el-icon-chat-dot-square",
          titleText: "评论数量",
          changeNumber: "2",
        },
        {
          iconClass: "el-icon-loading",
          titleText: "运行天数",
          changeNumber: "3",
        },
        {
          iconClass: "el-icon-edit",
          titleText: "最后活动",
          changeNumber: "4",
        },
      ],
        }
    },
    methods:{
        changeTransition(){
            this.bol =!this.bol
            let date = new Date().toTimeString().split(":")[0]
            console.log(date);
            switch(true){
                  case date >= 0 && date < 6:
                    this.text_box = this.textArr[1]
                break;
                case date >= 6 && date < 12:
                    this.text_box = this.textArr[2]
                break;
                case date >= 13 && date < 19:
                    this.text_box = this.textArr[3]
                break;
                case date >= 19 && date < 23:
                    this.text_box = this.textArr[4]
                break;
                default:
                    this.text_box = this.textArr[0]
            }
            setTimeout(()=>{
                this.bol =false
            },2500)
        }
    }
                    
}

</script>

<style lang="less" scoped>
    .sideber{
         width: 200px;
         height: 100vh;
        //  overflow: scroll;
         background: #fff;
         position: fixed;
         background: rgba(255,255,255);
         
         padding-left: 20px;
         span{
             font-family: Quicksand;
             font-weight: bolder;
         }
      }
    .touxiang{
          width: 100px;
          height: 100px;
          .touxiang_bg{
              width: 100%;
              height: 100%;
              border-radius: 50%;
              margin-left: 50px;
          }
    }
    .font_show{
        font-size: 13px;
        position: relative;
        cursor: pointer;
        &:after{
            position: absolute;
            right: 6px;
            bottom: -2px;
            content: " ";
            width: 0px;
            height: 0px;
            border: 6px solid black;
            border-color:rgb(0, 0, 0,.5) transparent transparent transparent ;
        }
    }
    .box_train{
        position: absolute;
        width: 150px;
        height: 35px;
        padding:0 20px;
        user-select: none;
        font-size: 12px;
        background: rgb(102,177,255);
        border-radius:12px ;
        text-align: center;
    } 
    .article_text{
        margin-top:35px;
        .article_text_list{
          height: 50px;
          margin-top: 15px;
          overflow: hidden;
          text-overflow: ellipsis;
          // 谷歌
          display: -webkit-box;
          // 行数
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          font-size: 11px;
          .article_bg {
              float: left;
              margin-right: 10px;
          }
        }
        img{
          width: 50px;
          height: 50px;
          border-radius: 50% ;
        }
    }
</style>