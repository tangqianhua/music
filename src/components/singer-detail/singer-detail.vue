<template>
	<transition name='slide'>
		<music-list :title='singer.name' :bg-img='singer.avatar' :songs='songs'></music-list>
	</transition>	
</template>

<script>
import {mapGetters} from 'vuex'
import {getSingerDetail} from 'api/singer.js'
import musicList from 'components/music-list/music-list'
 import {createSong} from 'common/js/song'
  export default {
  	data(){
  		return {
  			songs:[]
  		}
  	},
  	computed:{
  		...mapGetters(['singer']),
  	},
  	created(){
  		this.getDetail(this.singer.mid)
  	},
  	components:{
  		musicList
  	},
  	methods:{
  		getDetail(id){
  			if(!this.singer.mid){
  				this.$router.push({path:'/singer'})
  				return
  			}
				getSingerDetail(id).then( (res) =>{
					if(res.code == 0){
						this.songs = this._normalizeSongs(res.data.list)
					}
				})
  		},
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if (musicData.songid && musicData.albummid) {
            ret.push(createSong(musicData))
          }
        })
        return ret
      }
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