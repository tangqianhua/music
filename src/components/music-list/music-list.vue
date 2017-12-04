<template>
  <div class="music-list">
    <div class="back" @click='back'>
      <i class="icon-back"></i>
    </div>
    <h1 class="title" v-html='title'></h1>
    <div class="bg-image" :style='getBgImg' ref='bgImg'>
      <div class="filter" ref="filter"></div>
      <div class="play-wrapper">
        <div ref="playBtn" v-show="songs.length>0" class="play" @click="playRandom">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>
    </div>
    <scroll :data='songs' ref='list' :listen-scroll='listenScroll' class="list" @scroll='scroll'>
      <div class="song-list-wrapper">
        <song-list :songs='songs' @select='select'></song-list>
      </div>
      <div class="loading-container" v-if='!songs.length'>
        <loding></loding>
      </div>
    </scroll>
  </div>
</template>

<script>
  import scroll from 'base/scroll/scroll'
  import songList from 'base/song-list/song-list'
  import loding from 'base/loading/loading'
  import {mapActions} from 'vuex'
  import axios from 'axios'
  import { playlistMixin } from 'common/js/mixin'
  export default{
    mixins: [playlistMixin],
    components:{
      scroll,
      songList,
      loding
    },
  	props:{
  		title:{
  			type:String,
  			default:''
  		},
  		bgImg:{
  			type:String,
  			default:''
  		},
  		songs:{
  			type:Array,
  			default:[]
  		}
  	},
    data(){
      return {
        listenScroll:true,  //是否监听滚动  
        scrollY:0,      //   下拉的位置
      }
    },
  	computed:{
  		getBgImg(){
  			return `background-image:url(${this.bgImg})` // 设置背景图片
  		}
  	},
    methods:{
      handleListBottom(playlist) {    //    歌曲播放了后要重新设置底部的位置  方法在mixin里面
        const bottom = playlist.length>0 ? "60px" : ''
        this.$refs.list.$el.style.bottom = bottom
        this.$refs.list.refresh()
      },
      scroll(poy){  //  监听滚动
        this.scrollY = poy.y
      },
      back(){
        this.$router.back(-1)
      },
      select(item,index){  //  监听子组件   控住播放页面
        this.selectPlay({list:this.songs,index})

      },
      //  随机播放
      playRandom(){
        this.random({list:this.songs})
      },
      ...mapActions([
        'selectPlay',
        'random'
      ])
    },
  	mounted(){
      this.imgHeight = this.$refs.bgImg.clientHeight //   获取图片的高度
      this.imgStyle = this.$refs.bgImg.style         //    获得图片的样式
      this.listStyle = this.$refs.list.$el.style     //     获得列表的样式
  		this.$refs.list.$el.style.top = `${this.imgHeight}px`;  //  列表的top值
  	},
    watch:{   //   监听下拉的位置
      'scrollY'(newY) {
        let scale = 1 //  图片原始大小

        if(newY > 0 ) {
          var newScale = scale+Math.abs((newY/this.imgHeight))
          this.imgStyle.transform = `scale(${newScale})`  //   修改图片的大小
          this.imgStyle.zIndex = 11     //      图片的zindex
          this.listStyle.zIndex = 10
        }else{
          this.imgStyle.zIndex = 0
          this.listStyle.zIndex = 100
        }
      }
    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: rgba(7, 17, 27, 0.4)
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      z-index 10
      .song-list-wrapper
        padding: 20px 0
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>