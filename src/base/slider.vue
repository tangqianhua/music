<template>
  <div class="slider" ref="slider">
    <div class="slider-group" ref="sliderGroup">
      <slot>
      </slot>
    </div>

    <div class="dots">
    	<span class="dot" v-for='(x,index) in dots' :class="{active:currentPageIndex===index}"></span>
    </div>
  </div>
</template>

<script>
	import BScroll from 'better-scroll'
	import {addClass} from 'common/js/dom'

  export default {
  	name:'slider',
  	//参数
		props:{
			loop:{//无限滚动
				type:Boolean,
				default:true
			},
			autoPaly:{//自动滚动
				type:Boolean,
				default:true
			},
			interval:{//滚动时间
				type:Number,
				default:4000
			}
		},
		data(){
			return {
				children:'',//获取轮播图的个数
				dots:[],
				currentPageIndex:0,
			}
		},	
		//初始化
		mounted(){
			setTimeout(()=>{
					this._setSliderWidth(true)
					this._initScroll()
					this._initDots()
			},20)
		},
		//方法
		methods:{
        // 设置轮播宽度
      _setSliderWidth(isResize) {
        this.children = this.$refs.sliderGroup.children   // 直接子节点，轮播图的个数
        let width = 0
        let sliderWidth = this.$refs.slider.clientWidth   // 视口大小
        for (let i = 0; i < this.children.length; i++) {
          let child = this.children[i]
          addClass(child, 'slider-item')      // 添加样式

          child.style.width = sliderWidth + 'px'  // 设置宽度
          width += sliderWidth    // 轮播总宽度（实例中是5，就是5倍大小）
        }
        if (this.loop && !isResize) {
          width += 2 * sliderWidth      // 如果是循环播放，在首尾各多一个，所以是本例中是（5+2）倍大小
        }
        this.$refs.sliderGroup.style.width = width + 'px'  // 设置轮播总宽度
      },
			_initScroll(){
        this.slider = new BScroll(this.$refs.slider, {
          scrollX: true,      // 横向滚动
          scrollY: false,
          momentum: false,
          snap: true,
          snapLoop: this.loop,
          snapThreshold: 0.3,
          snapSpeed: 400
        })
        this.slider.on('scrollEnd',()=>{
        	var pageIndex=this.slider.getCurrentPage().pageX
          console.log(pageIndex);
        	this.currentPageIndex = pageIndex
        })
			},
			_initDots(){
				this.dots=new Array(this.children.length)
			}
		}
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .slider
    min-height: 1px
    .slider-group
      position: relative
      overflow: hidden
      white-space: nowrap
      .slider-item
        float: left
        box-sizing: border-box
        overflow: hidden
        text-align: center
        a
          display: block
          width: 100%
          overflow: hidden
          text-decoration: none
        img
          display: block
          width: 100%
    .dots
      position: absolute
      right: 0
      left: 0
      bottom: 12px
      text-align: center
      font-size: 0
      .dot
        display: inline-block
        margin: 0 4px
        width: 8px
        height: 8px
        border-radius: 50%
        background: $color-text-l
        &.active
          width: 20px
          border-radius: 5px
          background: $color-text-ll
</style>
