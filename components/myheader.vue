<template>
	<div class="myheader">
		<img src="../static/index_icon/gd.png" alt="">
		<input type="text">
		<img src="../static/index_icon/mkf.png" alt="">
	</div>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="less" scoped>
	.myheader {
		width: 100%;
		height: 80rpx;
		padding: 5rpx;
		box-sizing: border-box;
		align-items: center;
		justify-content: space-between;

		img {
			width: 50rpx;
			height: 50rpx;
		}

		input {
			border-radius: 50rpx;
			outline: none;
			border: none;
			width: 75%;
			padding-left: 20rpx;
			font-size: 14rpx;
			height: 90%;
			background-color: #fff;
			border: 1rpx solid #e9e9e9;
		}
		display: flex;
		justify-content: space-between;
	}
</style>
