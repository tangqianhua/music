<template>
  <div class="player" v-if="playList.length>0">
    <transition name="normal">
      <div class="normal-player" v-show='fullScreen'>
        <div class="background">
          <img width="100%" height="100%" :src='currentSong.image'>
        </div>
        <div class="top">
          <div class="back" >
            <i class="icon-back" @click='back'></i>
          </div>
          <h1 class="title" v-html='currentSong.name'></h1>
          <h2 class="subtitle" v-html='currentSong.singer'></h2>
        </div>
        <div class="middle">
          <div class="middle-l" ref="middleL">
            <div class="cd-wrapper" ref="cdWrapper">
              <div class="cd" :class='cdCls'>
                <img class="image" :src='currentSong.image'>
              </div>
            </div>
            <div class="playing-lyric-wrapper">
              <div class="playing-lyric"></div>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="dot-wrapper">
            <span class="dot" ></span>
            <span class="dot" ></span>
          </div>
          <div class="progress-wrapper">
            <span class="time time-l">{{formate(currentTime)}}</span>
            <div class="progress-bar-wrapper">
              <progress-bar :percent='percent' @percent='changeTime'></progress-bar>
            </div>
            <span class="time time-r">{{formate(currentSong.duration)}}</span>
          </div>
          <div class="operators">
            <div class="icon i-left" @click='changeMode'>
              <i :class="iconMode"></i>
            </div>
            <div class="icon i-left" >
              <i  class="icon-prev" @click='prev'></i>
            </div>
            <div class="icon i-center" >
              <i @click='togglePlaying' :class="playIcon"></i>
            </div>
            <div class="icon i-right">
              <i  class="icon-next" @click='next'></i>
            </div>
            <div class="icon i-right">
              <i class="icon icon-not-favorite"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show='!fullScreen' @click='open'>
        <div class="icon">
          <img :class='cdCls' width="40" height="40" :src='currentSong.image'>
        </div>
        <div class="text">
          <h2 class="name" v-html='currentSong.name'></h2>
          <p class="desc"  v-html='currentSong.singer'></p>
        </div>
        <div class="control">
          <i @click.stop="togglePlaying" class="icon-mini" :class="miniIcon"></i>
        </div>
        <div class="control">
          <i class="icon-playlist"></i>
        </div>
      </div>
    </transition>
    <audio :src='currentSong.url' ref='audio' @canplay='ready' @error='error' @timeupdate='update' @ended='end'></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations, mapActions} from 'vuex'
  import progressBar from 'base/progress-bar/progress-bar'
  import  {playMode} from 'common/js/config.js'
  export default {
    data(){
      return {
        audioReady: false,  //  播放是否准备了
        currentTime:0 ,  //  当前的播放时间 
      }
    },
    components:{
      progressBar
    },
    computed: {
    	...mapGetters([
        'fullScreen',   //  是否全屏展示
        'playList',     //   获得播放列表
        'currentSong',    //    当前歌曲
        'playing',      //    是否播放
        'currentIndex' ,//   当前播放的下标
        'mode',         //   播放模式
        'sequenceList',  //  循环播放列表
        ]) ,
      playIcon() {   //  播放图标
        return this.playing ? 'icon-pause' : 'icon-play'
      },
      miniIcon() {
        return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
      },
      cdCls() {  //   暂停开启动画
        return this.playing ? 'play' : 'play pause'
      },
      percent(){  //  当前的播放时间除以总时间
        return this.currentTime/this.currentSong.duration
      },
      iconMode(){   //  播放的顺序
        return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? "icon-loop" : 'icon-random'
      }
    },
    mounted(){
      // console.log(this.playList);
      this.setSequenList(this.playList)
    },

    methods:{
      back () {   //   全屏缩小
        this.setFullScreen(false)
      },
      open () {   //   全屏展示
        this.setFullScreen(true)
      },
      togglePlaying(){  //  播放 暂停
        this.setPlaying(!this.playing)
      },
      prev(){  //  上一首
        if(!this.audioReady){   //  如果视频没准备好可以播放就返回
          return 
        }
        var index = this.currentIndex-1   //  获得当前下边
        if(index=== -1){   //   如果是第一个
          index = this.playList.length-1    ///  就切换成最后一个
        }
        this.setCurrentIndex(index)   //  重新设置当前播放的歌曲
        if (!this.playing) {    //  如果视频是暂停的
          this.togglePlaying()   //  播放
        }
        this.songReady = false
      },
      next(){  //  下一首
        if(!this.audioReady){   //  如果视频没准备好可以播放就返回
          return 
        }
        var index = this.currentIndex+1   //  获得当前下边
        if(index=== this.playList.length){   //   如果是第一个
          index = 0    ///  就切换成最后一个
        }
        this.setCurrentIndex(index)   //  重新设置当前播放的歌曲
        if (!this.playing) {    //  如果视频是暂停的
          this.togglePlaying()   //  播放
        }
        this.songReady = false
      },
      ready(){  //  该视频是否已准备好开始播放
        this.audioReady = true
      },
      error(){
        this.audioReady = true
      },
      update(e){   //   获得当前播放的时间
        this.currentTime = e.target.currentTime
      },
      formate(time){
        time = time | 0   //  向下取整
        var minute = time/60 | 0  //  获得分钟
        var second = time%60 | 0  //  获得秒
        if(second<10){
          second = '0'+second
        }
        return`${minute}:${second}`
      },
      //    改变时间
      changeTime(percent){
        const audio = this.$refs.audio
        audio.currentTime = this.currentSong.duration/percent
        if(audio.currentTime<=this.currentSong.duration&&!this.playing) {
            this.setPlaying(true)
        }
      },
      //   重置当前播放歌曲的下标    切换播放模式的时候才会触发
      resetCurrentIndex(list){
        const index = list.findIndex( (item) =>{
          return item.id === this.currentSong.id
        })
        this.setCurrentIndex(index)
      },
      //    播放完
      end(){
        console.log('完成')
        if(this.mode === playMode.loop ) {   //  循环播放
          this.$refs.audio.currentTime = 0
          this.$refs.audio.play()
        }else{
          this.next()
        }
      },
      //    改变播放模式
      changeMode(){
        const mode = (this.mode + 1)%3
        this.setMode(mode)
        var arr = [];
        var list = []
        if(this.mode == playMode.random) {    //  如果是随机
          for(var i=0,len = this.playList.length;i<len;i++){
            arr.push(this.playList[i])
          }
          list = arr.sort(function(){ return 0.5 - Math.random() })   //  打散数组
        }else{
          list = this.sequenceList
        }
        this.resetCurrentIndex(list)    //  获得当前播放对应打散后数组的下标
        this.setPlayingList(list)       //  设置播放列表
      },
      ...mapMutations({
        setFullScreen:'SET_FULLSCREEN',
        setPlaying:'SET_PLAYING',
        setCurrentIndex:'SET_CURRENTINDEX',
        setMode:'SET_MODE',
        setPlayingList:'SET_PLAYLIST',
        setSequenList:'SET_SEQUENCELIST'
      })
    },
    watch:{
      'currentSong'(newSong , oldSong){  //  监听当前歌曲
        this.$nextTick(()=>{
          if(oldSong!=undefined){
            if(newSong.id === oldSong.id) {   //  防止暂停的时候切换播放模式防止歌曲继续播放
              return
            }
          }
          this.$refs.audio.play()   //   播放
        })
      },
      'playing'(val){    //  监听歌曲是否播放了
        this.$nextTick(()=>{
          const audio = this.$refs.audio
          val ? audio.play()  : audio.pause()
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          /*left: 0*/
          top: 14px

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>