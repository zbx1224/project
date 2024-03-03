<template>
    <div class="music_vue">
       <Aplayer 
       :music="music" 
       :list ="musicList"
       :float = "true"
       listMaxHeight = 75px
       repeat = "list"
       :listFolded = "true"
       />
      </div>
</template>

 <script>
import Aplayer from 'vue-aplayer'
Aplayer.disableVersionBadge = true
export default {
   name:"HeadMusic",
   components:{
       Aplayer
   },
   data(){
       return{
        music:{
                title: '听歌请列表',
                artist: ' ',
                src: 'https://music.163.com/song/media/outer/url?id=1844449888.mp3',
                pic: 'node/vue_img/music_bg.webp'
            },
        musicList:[]
          }
       },   
   methods:{
     async getMusic(){
         //判断session中是否存在已取得的数据
         let result = JSON.parse(sessionStorage.getItem("key_session_music"))
         if(result){
             return this.musicList = result
         }
         //获取榜单
         let {data} = await this.$axios.get("api/playlist/detail?id=3778678 ")
         //处理数据
         this.handerData(data.playlist.tracks) 
     },
    async getMusicUrl(url,index){
        let {data} =await this.$axios.get("api/song/url?id=" + url)
        this.musicList[index].src = data.data[0].url;
        if(index == this.musicList.lenght-1){
            this.sessionStorage()
        }
     },
      handerData(val){
        this.musicList = val.map((item,index)=> {
        this.getMusicUrl(item.id,index)
        return {
            title:item.name,
            id: item.id ,
            artist: ' ',
            src: ' ',
            pic:item.al.picUrl
        }
       });
     },
     setionStorage(){
       sessionStorage.setItem("key_session_music",JSON.stringify(this.musicList))
     }
   },
  
   mounted(){
       this.getMusic()
   }
}
</script>

<style lang = "less" scoped>
     .music_vue{
        width: 200px;
        /deep/ .aplayer-pic{
            width: 40px;
            height: 40px;
            border-radius: 50% ;
            margin-top: 5px;
        }
        /deep/ .aplayer-body{
            height: 50px;
            box-shadow: 0 0 5px 1px #eee;
        }
        /deep/ .aplayer-float{
            margin: 0;
            box-shadow: 0 0 0 0 #eee;
        }
        /deep/ .aplayer-body .aplayer-info{
            padding: 0;
            height: 50px;
            margin-left: 5px;
        }
        /deep/ .aplayer-info .aplayer-body .aplayer-info{
            border:none;
        }
        /deep/  .aplayer.aplayer-withlist .aplayer-body .aplayer-info{
            border:none;
        }
        /deep/ .aplayer-music {
            margin-top: 10px;
        }
        /deep/ .aplayer-controller{
            margin-left: 5px;
        }

        /deep/ .aplayer-info .aplayer-volume-bar{
            height: 25px;
            box-shadow: 0 0 0 0 #eee;
        }
        /deep/  .aplayer-withlist{
            margin: 0;
        }
        /deep/ .aplayer-controller{
            width: 100px;
        }
        /deep/ .aplayer-pic .aplayer-play {
            width: 15px;
            height: 15px;
            bottom: 30%;
            right: -290%;
            border: 0px solid #fff;
        }
        /deep/ .aplayer-pic .aplayer-play .aplayer-icon-play{
            top: -2px;
            left: -1px;
            border: 0px solid #eee;
        }
        /deep/ .aplayer-pic .aplayer-pause{
            width: 15px;
            height: 15px;
            bottom: -7%;
            right: -328%;
            border: 0px solid #fff;
        }
        /deep/ .aplayer-icon-menu{
            margin-top: 2px;
        }  
    }

    .music_vue /deep/ .aplayer-icon-mode,
    .music_vue /deep/ .aplayer-time-inner{
    display: none;
    }
</style>