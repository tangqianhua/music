<template>
  <div class="progress-bar" ref='progressBar' @click='changeBar'>
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrapper" ref='progressBtn' 
      @touchstart.prevent="progressTouchStart"
      @touchmove.prevent="progressTouchMove"
      @touchend.prevent="progressTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>

  export default{
    props:{
      percent:{
        type:Number,
        default:0
      }

    },
    created(){
      this.touchInfo = {}
    },
    methods:{
      progressTouchStart(e){    //  滚动条开始移动的时候
        this.touchInfo.isTouch = true    //   开始触碰
        this.touchInfo.startPageX = e.touches[0].pageX
        this.touchInfo.progressWidth = this.$refs.progress.clientWidth   //  获取进度条的宽度
      },
      progressTouchMove(e){     //  滚动条移动的时候
        if(this.touchInfo.isTouch) {
          const deltaX = e.touches[0].pageX - this.touchInfo.startPageX   //  获得移动的距离
          const width = Math.min(this.$refs.progressBar.clientWidth - 16,Math.max(0,this.touchInfo.progressWidth+deltaX))
          this._offset(width) 
        }
      },
      progressTouchEnd(){     //  滚动条移动结束
        this.touchInfo.isTouch = false
        this._triggerPercent() 
      },
      changeBar(e){
        var offsetX = e.pageX - this.$refs.progressBar.getBoundingClientRect().left
        this._offset(offsetX) 
        this._triggerPercent() 

      },
      _offset(width){
        this.$refs.progress.style.width = `${width}px`
        this.$refs.progressBtn.style['transform'] = `translate3d(${width}px,0,0)`
      },
      _triggerPercent(){
        const barWidth = this.$refs.progressBar.clientWidth - 16   
        const percent = barWidth / this.$refs.progress.clientWidth  //  总宽度，除以进度条的宽度，等于总时间，除以当前时间
        this.$emit('percent',percent)
      }
    },
    watch:{
      'percent'(val){   //  val是总时间除以当前时间
        var len = val.toString().length
        if (len>=0&&!this.touchInfo.isTouch) {
          const barWidth = this.$refs.progressBar.clientWidth   //  获取滚动条的长度
          const offset = barWidth - 16   //  获得滚动条-按钮的长度
          this.$refs.progress.style.width = val*offset+'px'
          this.$refs.progressBtn.style['transform'] = `translate3d(${val*offset}px,0,0)`
        }
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: rgba(0, 0, 0, 0.3)
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-text
          border-radius: 50%
          background: $color-theme
</style>