<template>
	<view class="biu">
		<view class="muisel">
			<image :src="songDetail.picUrl" mode=""></image>
		</view>
		<view class="muise">
			<!-- 头部 -->
			<view class="headers">
				{{songDetail.name}}
			</view>

			<!-- 播放暂停 -->
			<view class="content_muise">
				<view :class="musicShow?'img_box pause':'img_box'">
					<image class="al_img" src="../../static/disc-bg.png" mode="">
					</image>
					<image :class="musicShow?'samll_img':'samll_img pause'" :src="songDetail.picUrl" mode=""></image>
					<image style="width: 100rpx;height: 100rpx;" @click="bjMusicClick" class="bj_music"
						:src="musicShow?'../../static/1.png':'../../static/zt.png'" mode=""></image>
				</view>
			</view>
			<view class="lyric-content">
				<view class="lyric-box">
					<view class="lyric-box-wrap" :style="{transform: `translateY(${-(lyricIndex * 88) + 88}rpx)`}">
						<text class="lyric-text" :class="{'active' : index === lyricIndex}"
							v-for="(item, index) in lyricList" :key="index">{{ item.lyric}}</text>
						<text class="lyric-text active">歌词文字</text>
									<text class="lyric-text">歌词文字部分</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 返回 -->
		<my-back @guanbi="guanbi"></my-back>
	</view>

</template>

<script>
	
	import {
		getSongurl,
		getSongdetail,
		getSongtext
	} from '@/api/muise.js'
	import myBack from '../../components/myBack.vue'
	export default {
		name: "myMiuse",
		components: {
			myBack
		},
		data() {
			return {
				// 播放器数据
				musicShow: false,
				// 歌曲id
				id: '',
				// 歌曲详情
				songDetail: {},
				// 歌词
				lyricList: [],
				// 选中歌词
				lyricIndex: 0,
				// 播放器
			innerAudioContext:null
			}
		},
		onLoad(option) {
			this.id = option.id
			console.log(this.id)
			this.innerAudioContext = uni.createInnerAudioContext();
			// getSongurl(option.id).then(res => {
			// 	console.log(res)
			// })
		},
		created() {
			// 初始化播放器
			let url = null
			this.innerAudioContext.pause();
			getSongdetail({
				ids: this.id
			}).then(res => {
				this.songDetail = res.data.songs[0].al
			})
			// 歌词
			getSongtext({
				id: this.id
			}).then(res => {
				let {lrc} = res.data
				console.log(lrc)
				let lyricStr = lrc.lyric
				const reg = /\[([^\]]+)\]([^\[]+)/g;
				let lyricResult = []
				lyricStr.replace(reg, ($0, $1, $2) => {
					lyricResult.push({
						time: this.formateTimeToSec($1),
						lyric: $2
					})
				})
				this.lyricList = lyricResult
				console.log(this.lyricList)
			})
			getSongurl({
				id: this.id
			}).then(res => {
				url = res.data.data[0].url
				this.innerAudioContext.src = url;
				this.listenLyricIndex()
				this.innerAudioContext.autoplay = true;
			})
			// this.innerAudioContext.loop = true; //循环播放
		},  
		methods: {
			bjMusicClick: function() {
				if (this.musicShow) {
					setTimeout(() => {
						this.innerAudioContext.play()
						this.listenLyricIndex()
					}, 1000);
				} else {
					console.log('暂停')
					this.innerAudioContext.pause();
				}
				this.musicShow = !this.musicShow;
			},
			guanbi(){
				this.innerAudioContext.pause()
			},
			formateTimeToSec(timeVal) {
				let timeArr = timeVal.split(':')
				return Number(timeArr[0]) * 60 + Number(Number(timeArr[1]).toFixed(1))
			},
			// 监听歌词滚动
			listenLyricIndex() {
				clearInterval(this.timer)
				this.timer = setInterval(() => {
					const index = this.lyricList.findIndex(item => item.time >= this.innerAudioContext.currentTime)
					this.lyricIndex = index - 1 || 0
				}, 500)
			},
			clearLyricIndex() {
				console.log('clearLyricIndex') 
				clearInterval(this.timer)
			},
		},
		onHide() {
			this.guanbi()
		}
	}
</script>

<style lang="less">
	.biu {
		position: relative;
		width: 100%;
	}

	.headers {
		line-height: 100rpx;
		text-align: center;
		color: #FFFFFF;
	}

	.muise {
		height: 100vh;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 222;
	}

	.muisel {
		height: 99vh;

		image {
			height: 100%;
			width: 100%;
		}

		filter: blur(10px);
	}

	@keyframes rotate {
		0% {
			transform: rotate(0);
		}

		100% {
			transform: rotate(360deg);
		}
	}

	.torotate {}

	.bj_music .musicStyle {
		animation: bjMusic 3s linear infinite;
	}

	.content_muise {
		padding-top: 40rpx;

		.img_box {
			width: 400rpx;
			height: 400rpx;
			margin: 0 auto;
			position: relative;
			animation: rotate 20s linear infinite;

			&.pause {
				animation-play-state: paused;
			}

			.samll_img {
				width: 300rpx;
				height: 300rpx;
				border-radius: 50%;
				top: 50rpx;
				left: 50rpx;
			}

			.al_img {
				position: absolute;
				top: 0;
				left: 0;
				z-index: 999;
			}

			.bj_music {
				position: absolute;
				top: 150rpx;
				left: 150rpx;
				z-index: 9999;
			}

			image {
				width: 400rpx;
				height: 400rpx;
			}
		}

	}

	.lyric-content {
		margin-top: 44rpx;
	}

	.lyric-box {
		height: 264rpx;
		overflow: hidden;
	}

	.lyric-box-wrap {
		display: flex;
		flex-direction: column;
		font-size: 32rpx;
		line-height: 88rpx;
		color: #999;
		text-align: center;
		transition: .5s;
	}

	.lyric-box-wrap .active {
		color: #fff;
	}

	.lyric-tip {
		margin-top: 24rpx;
		font-size: 28rpx;
		line-height: 32rpx;
		text-align: center;
		text-decoration: underline;
		color: #fff;
	}
</style>
