import * as types from './mutation-type'

const mutations = {
    [types.SET_SINGER](state, singer) { //  歌单列表
        state.singer = singer
    },
    [types.SET_PLAYING](state, flag) { //  是否播放
        state.playing = flag
    },
    [types.SET_PLAYLIST](state, list) { //  播放列表
        state.playList = list
    },
    [types.SET_FULLSCREEN](state, flag) { //  是否全屏
        state.fullScreen = flag
    },
    [types.SET_SEQUENCELIST](state, list) { //  播放顺序列表
        state.sequenceList = list
    },
    [types.SET_MODE](state, playMode) { //  播放模式
        state.mode = playMode
    },
    [types.SET_CURRENTINDEX](state, index) { //  当前播放下标
        state.currentIndex = index
    },
    [types.SET_DESC](state, desc) { //  首页歌单
        state.desc = desc
    }
}

export default mutations