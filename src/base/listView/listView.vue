<template>
  <scroll @scroll='scroll' class='listview' :data='data'  ref='listview' :listenScroll='listenScroll'>
    <ul>
      <li v-for='val in data' class="list-group" ref='group'>
        <h2 class="list-group-title">{{val.title}}</h2>
        <ul>
          <li v-for=' x in val.items' class="list-group-item" @click='selectItem(x)'>
            <img v-lazy="x.avatar" class="avatar">
            <span class="name">{{x.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart='touchIndex($event)' @touchmove.top.prevent='touchMove($event)'>
      <ul>
        <li v-for=' (x,index) in shortList'  class='item' :class='{"current":index==clickIndex}' :data-index='index'>{{x}}</li>
      </ul>
    </div>
    <div class="singer-number" v-if='maskSHow'>
      <div class="number-content">
        {{content}}
      </div>
    </div>
  </scroll>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {getDate} from 'common/js/dom.js'
  import { playlistMixin } from 'common/js/mixin'
  export default {
    mixins: [playlistMixin],
    created(){
      this.listenScroll=true
      this.touchPage = {}
    },
    data(){
      return {
        clickIndex:0,
        content:'',
        maskSHow:false,
      }
    },
    props:{
      data:{
        type:Array,
        default:[]
      }
    },
    components:{
      Scroll,
      Loading
    },
    mounted(){

    },
    computed:{
      shortList(){
        return this.data.map( (x) => {
            return x.title.substring(0,1)
        })
      }
    },

    methods:{
      handleListBottom(playlist) {    //    歌曲播放了后要重新设置底部的位置  方法在mixin里面
        const bottom = playlist.length>0 ? "60px" : ''
        const height = playlist.length>0 ? "auto" : ''
        this.$refs.listview.$el.style.bottom = bottom
        this.$refs.listview.$el.style.height = height
        this.$refs.listview.refresh()
			},
      touchIndex(e){
        let startTouch = e.touches[0];     // 获得开始的触摸屏幕的位置
        this.touchPage.y1 = startTouch.pageY     // 获得Y轴的偏移量
        let currentIndex = getDate(e.target,'index')      // 获得触发元素的下标
        this.touchPage.currentIndex = currentIndex        //  存储现在的下标
        this.content = e.target.innerHTML       // 遮罩层的内容

        let domIndex = this.$refs.group[currentIndex]            //获得当前元素
        if(domIndex!=undefined){
          // 遮罩层
          this.maskSHow = true
          this.clickIndex = currentIndex// 点击的下标
          this.$refs.listview.scrollToElement(domIndex,0)        // 让目标元素滚动到顶部
          setTimeout( () => {
            this.maskSHow = false
          },200)
        }
      },

      touchMove(e){
        let endTouch = e.touches[0] 
        this.touchPage.y2 = endTouch.pageY
        //  18代表每个列表的高度  这样就能或得到划过了几个li
        let page = Math.floor((this.touchPage.y2-this.touchPage.y1)/18) 
        let currentIndex = parseInt(this.touchPage.currentIndex) + page    //  原来的下标加上划过的N个元素
        this.clickIndex = currentIndex
        this.$refs.listview.scrollToElement(this.$refs.group[currentIndex],0)
      },

      selectItem(item){
        this.$emit('select',item)
      },
      refresh() {
        this.$refs.listview.refresh()
      },
      scroll(pos){
        // console.log(pos);
      }
    },

    watch:{

    }
  }

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .listview
    position: fixed
    width: 100%
    height: 100%
    overflow: hidden
    top 90px
    bottom 60px
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: fixed
      z-index: 30
      right: 0
      top: 55%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
  .singer-number
    position fixed
    top 0
    left 0
    right 0
    bottom 0
    z-index 10000
    .number-content
      width: 50px;
      height: 50px;
      font-size: 50px;
      padding 5px
      text-align: center;
      transform: translate(-50%,-50%);
      position: absolute;
      top: 50%;
      left: 50%;
      background: #aaa;
      color #fff
      line-height 50px

</style>
