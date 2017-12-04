<template>
  <div class="singer" ref='singer'>
    <list-view :data='singerList' @select='selectItem' ref='list'></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
	// 导入歌手列表
	import {getSingerList} from 'api/singer'
  //获得名字跟id的构造喊出
	import Singer from 'common/js/singer'
  // 获得列表组件
  import listView from 'base/listView/listView'
	import {mapGetters,mapMutations} from 'vuex'
	import { playlistMixin } from 'common/js/mixin'
	const HOST_NAME='热门'
	//热门是数据规定10条
	const HOST_LENGTH=10
  export default {
		mixins: [playlistMixin],
    components:{
      listView
    },
  	data() {
  		return {
  			singerList:[],
  		}
  	},
  	created() {
  		this._getSingerList()
  	},
  	methods: { 
      handleListBottom(playlist) {    //    歌曲播放了后要重新设置底部的位置  方法在mixin里面
        const bottom = playlist.length>0 ? "60px" : ''
        this.$refs.singer.style.bottom = bottom
        this.$refs.list.refresh()
			},
			
      selectItem(item){
        this.setSinger(item)
        this.$router.push({
          path:`/singer/${item.mid}`
        })
      },
  		_getSingerList(){
  			getSingerList().then((res) => {
  				if(res.code === 0){
  					this.singerList = res.data.list
  					// console.log(this.singerList);
  					this.singerList = this._normalList(this.singerList);
  				}
  			})
  		},
  		//数组排序
  		_normalList(list){
  			var map = {	
  				hot:{//热门数据
						title:HOST_NAME,
  					items:[]  					
  				}
  			}
				//遍历所有的数据
  			list.forEach((item,index) => {
  				//遍历热门数据（10条）
  				if(index < HOST_LENGTH) {
  					map.hot.items.push(new Singer({id:item.Fsinger_id,name:item.Fsinger_name,mid:item.Fsinger_mid}))
  				}

  				//按照字母，放入相同的数据
  				const key=item.Findex
  				if(!map[key]){//如果不存在这个字母
  					map[key]={//添加初始化数据
  						title:key,
  						items:[]
  					}
  				}
  				map[key].items.push(new Singer({id:item.Fsinger_id,name:item.Fsinger_name,mid:item.Fsinger_mid}))

  			})

  			//将热门跟其他的数组里面的数据分开，放置有相同的数据
  			var ret = []
  			var hot = []
  			for (var k in map ){
  				var val = map[k]
  				//  如果里面含有字母
  				if(val.title.match(/[a-zA-Z]/)){
  					ret.push(val)
  				}else if(val.title===HOST_NAME){//如果是热门的数据
  					hot.push(val)
  				}
  			}
  			//将含有字母的数据排序
  			ret.sort((a,b)=>{
  				return a.title.charCodeAt()-b.title.charCodeAt()
  			})
  			return hot.concat(ret)
  		},
      ...mapMutations({
        setSinger: 'SET_SINGER'
      })
  	}
  }
</script>

<style scoped lang="stylus">
.singer
  position absolute
  top 88px
  width 100%
</style>
