<template>
  <div class="recommend">
    <div class="recommend-content">
      <div class="slider-wrapper" v-if='recommends.length' ref="sliderWrapper">
        <slider>
          <a :href='x.linkUrl' v-for='(x,index) in recommends' key='x'>
            <img :src="x.picUrl" style="width:100%;">
          </a>
        </slider>
      </div>
      <div class="recommend-list" ref='list'>
        <h1 class="list-title">热门歌单推荐</h1>
        <ul>
          <li v-for="item in discList" class="item" @click='desc(item)'>
            <div class="icon">
              <img width="60" height="60" v-lazy="item.imgurl">
            </div>
            <div class="text">
              <h2 class="name" v-html="item.creator.name"></h2>
              <p class="desc" v-html="item.dissname"></p>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="loading-container" v-show='!discList.length'>
      <loading></loading>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRecommend,getDiscList} from 'api/recommend'
  import slider from 'base/slider'
  import Loading from 'base/loading/loading'
  import { playlistMixin } from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default{
    mixins: [playlistMixin],
    data(){
      return {
        recommends:[],//轮播图数据
        discList:[],//歌单列表
      }
    },
    components:{
      slider,
      Loading
    },
    created(){
      this._getRecommend()
      this._getDisList()
    },
    methods:{
      handleListBottom(playlist) {    //    歌曲播放了后要重新设置底部的位置  方法在mixin里面
        const bottom = playlist.length>0 ? "60px" : ''
        this.$refs.list.style.paddingBottom = bottom
			},
      //轮播
      _getRecommend(){
        getRecommend().then( (res)=>{
          this.recommends=res.data.slider
        })
      },
      //歌单列表a
      _getDisList(){
        getDiscList().then((res) => {
          this.discList = res.data.list
        })  
      },
      //  跳转到desc页面
      desc(item) {
        this.setDesc(item)
        this.$router.push({path:'/recommend/'+item.dissid})
      },
      ...mapMutations({
        setDesc:'SET_DESC'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .recommend
    position: absolute
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      /*overflow: hidden*/
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
.loading-container
  position: absolute
  width: 100%
  top: 50%
  transform: translateY(-50%)
  z-index:10000
</style>
