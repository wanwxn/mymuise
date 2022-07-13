<template>
	<view class="login_box">
		<view class="login_top">登录体验更多精彩</view>
		<view class="login_title">
			未注册的账号登录后将自动创建
		</view>
		<view class="input_box">
			<input type="text" placeholder="请输入账号" v-model="phone" @input="inpChange" />
			<input type="password" placeholder="请输入密码" v-model="pas" @input="inpChange" />
		</view>
		<button class="login_bottom" :disabled="disabled" @click="login">{{disabled?'请填写':'登录'}}</button>
		<view class="login_title_bottom" @click="add">
			了解更多
		</view>
		
	</view>
</template>

<script>
	import {
		ToLogin
	} from "../../api/login.js"
	export default {
		data() {
			return {
				phone: '18732623723',
				pas: 'huangshiyu159753',
				disabled: true,
			}
		},
		methods: {
			login() {
				console.log(this.phone, this.pas);
				ToLogin({
					phone: this.phone,
					pas: this.pas
				}).then(res => {
					console.log(res)
					if(res.data.code === 200){
							uni.setStorageSync('id',res.data.account.id)
							uni.switchTab({
								url:'../index/index'
							})
					}
					
				})
			},
			inpChange() {
				// console.log(1)
				if (this.phone && this.pas) {
					this.disabled = false
				} else {
					this.disabled = true
				}
			}
		},

	}
</script>

<style>
	.login_box {
		padding: 30rpx;
	}

	.login_top {
		font-size: x-large;
	}

	.login_title {
		color: gray;
		margin: 18rpx 0 60rpx;
	}

	.input_box input {
		border-bottom: 1rpx solid gray;
		margin-bottom: 30rpx;
		padding-bottom: 10rpx;
		padding-left: 10rpx;
	}

	.login_bottom {
		border-radius: 50rpx;
		border: none;
		margin: 80rpx 0 60rpx;
		display: block;
		background-color: red;
		color: white;
	}

	.login_title_bottom {
		text-align: center;
		color: #007AFF;
	}
</style>
