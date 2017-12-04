import { playMode } from 'common/js/config.js'
const state = {
    singer: {}, //   歌曲列表
    playing: false, //    是否播放
    fullScreen: false, //  是否全屏
    playList: [], // 播放列表
    sequenceList: [], //   播放顺序列表
    mode: playMode.sequence, //   播放模式 
    currentIndex: -1, //当前下标  
    desc: {}, //	首页歌单
}

export default state