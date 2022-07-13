import api from './api.js'

//登录接口

export const ToLogin = (user) => api.get({
	url: `/login/cellphone?phone=${user.phone}&password=${user.pas}`
})

//获取用户信息
export const getUser = (uid)=>api.get({
	url:`/user/detail?uid=${uid}`
})

export const Music = () => api.get({
	url:`/user/subcount`
})
