import * as types from './mutation-type.js'
import { playMode } from 'common/js/config'

function findIndex(list, song) {
    return list.findIndex((item) => {
        return item.id === song.id
    })
}
export const selectPlay = function({ commit, state }, { list, index }) {
    commit(types.SET_SEQUENCELIST, list) //  循环播放列表
    if (state.mode === playMode.random) { //  如果当面的播放模式是随机播放
        let _arr = list.slice() //  获取列表
        let arr = _arr.sort(function() { return 0.5 - Math.random() }) //  洗牌
        commit(types.SET_PLAYLIST, arr) //  改变列表
        index = findIndex(arr, list[index]) //  改变下标
    } else {
        commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENTINDEX, index)

    commit(types.SET_PLAYING, true)
    commit(types.SET_FULLSCREEN, true)
}

// 随机播放

export const random = function({ commit, state }, { list }) {
    commit(types.SET_FULLSCREEN, true) //  全屏
    commit(types.SET_MODE, playMode.random) //  播放模式
    commit(types.SET_SEQUENCELIST, list) //  循环播放的列表
    let _arr = list.slice()
    let arr = _arr.sort(function() { return 0.5 - Math.random() })
    commit(types.SET_PLAYLIST, arr) //   播放列表
    commit(types.SET_PLAYING, true) //  是否播放
    commit(types.SET_CURRENTINDEX, 0) //  播放的下标
}