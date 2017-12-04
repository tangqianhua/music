export const singer = state => state.singer //  歌手列表

export const playing = state => state.playing //   是否播放

export const fullScreen = state => state.fullScreen //  是否全屏

export const playList = state => state.playList //   播放列表

export const sequenceList = state => state.sequenceList //  播放顺序列表

export const mode = state => state.mode //  播放模式

export const currentIndex = state => state.currentIndex //  当前播放下标

export const currentSong = state => state.playList[state.currentIndex] //  当前播放的歌曲

export const desc = state => state.desc //  首页歌单