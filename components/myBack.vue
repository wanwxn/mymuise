<template>
	<view class="myBack" @tap="back">
		<image src="../static/back.png" mode="" class="back"></image>
	</view>
</template>

<script>
	export default {
		name: "myBack",
		data() {
			return {

			};
		},
		methods: {
			back() {
				uni.navigateBack({
					delta: 1
				});
				this.$emit('guanbi')
			}
		}
	}
</script>

<style lang="scss" scoped>
	.myBack {
		position: fixed;
		top: 30rpx;
		left: 30rpx;
		width: 50rpx;
		height: 50rpx;
		z-index: 9999;

		.back {
			width: 50rpx;
			height: 50rpx;
		}
	}
</style>
