import api from './api.js'
// 歌手
export const getyrz = ()=> api.get({url:'/artists?id=31376161'})
//歌曲地址/song/url?id=33894312
export const getSongurl = (id)=> api.get({url:`/song/url`,data:id})
//歌曲详情 /song/detail?ids=347230
export const getSongdetail = (id)=>api.get({url:'/song/detail',data:id})
// 获取歌词
export const getSongtext = (id)=>api.get({url:'/lyric',data:id})

