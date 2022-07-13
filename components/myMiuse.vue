<template>
	<view class="bj_music" @click="bjMusicClick">
		<image :class="!musicShow?'musicStyle':''" src="../static/1.png" mode="widthFix"></image>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		name: "myMiuse",
		data() {
			return {
				musicShow: true
			}
		},
		created(){
			innerAudioContext.src = 'https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-hello-uniapp/2cc220e0-c27a-11ea-9dfb-6da8e309e0d8.mp3';
			innerAudioContext.autoplay = true;
			// innerAudioContext.loop = true; //循环播放
			console.log(innerAudioContext.src)
		},
		methods: {
			bjMusicClick: function() {
				if (this.musicShow) {
					console.log(innerAudioContext)

					setTimeout(() => {
						innerAudioContext.play()
					}, 1000);
				} else {
					console.log('暂停')
					innerAudioContext.pause();
				}
				this.musicShow = !this.musicShow;
			}
		}
	}
</script>

<style lang="less">
	.bj_music image {
		width: 72rpx;
		height: 72rpx;
	}

	.bj_music .musicStyle {
		animation: bjMusic 3s linear infinite;
	}
</style>
