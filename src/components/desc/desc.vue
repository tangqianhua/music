<template>
	<transition name='slide'>
    <music-list :title='title' :bg-img='bgImg'></music-list>
		<!-- <music-list :title='singer.name' :bg-img='singer.avatar' :songs='songs'></music-list> -->
	</transition>	
</template>

<script>
import {mapGetters} from 'vuex'
import musicList from 'components/music-list/music-list'
import {getSongList} from 'api/recommend'
  export default {
  	data(){
  		return {
  			songs:[]
  		}
  	},
  	computed:{
      ...mapGetters(['desc']),
      title() {
        return this.desc.dissname
      },
      bgImg() {
        return this.desc.imgurl
      }
  	},

  	components:{
  		musicList
  	},
    created() {
      this._getSongList()
    },
    methods: {
      _getSongList() {
        if (!this.desc.dissid) {
          this.$router.push('/recommend')
          return
        }
        getSongList(this.desc.dissid).then((res) => {
          if (res.code === 0) {
            console.log(res)
          }
        })
      },

  	},
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
	.singer-detail
		position fixed
		top 0
		left 0
		right 0
		bottom 0
		background #222
		z-index 1000
	.slide-enter-active, .slide-leave-active
		transition: all 0.3s
	.slide-enter, .slide-leave-to
		transform: translate3d(100%, 0, 0)
</style>