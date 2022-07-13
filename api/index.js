import api from './api.js'
//轮播图数据
 export const getBanner = ()=>api.get({url:`/banner/?type=2`})
 
 // 推荐歌单
 export const getplaylist=()=>api.get({url:"/personalized?limit=10"})
 
 // 获取歌单
 export const getplaylistDetail = (id)=>api.get({url:'/playlist/detail',data:id})

 