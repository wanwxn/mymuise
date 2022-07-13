<template>
	<view class="songList" @click="toDetail(songObj.id)">
		<image :src="songObj.al.picUrl" mode=""></image>
		<view class="section_song" >
			<view class="title">
				{{songObj.al.name}}
			</view>
			<view class="name">
				<text v-for="(item,index) in songObj.ar">{{item.name}}
					<text v-if="songObj.ar.length>1 && index!=songObj.ar.length-1">-</text>
				</text>
			</view>

		</view>
	</view>
</template>

<script>
	export default {
		props: {
			songObj: Object
		},
		name: "songList",
		data() {
			return {

			};
		},
		
		methods:{
			toDetail(id){
				console.log(2555)
				uni.navigateTo({
					url:`/pages/muise/muise?id=${id}`,
				})
			}
		}
	}
</script>

<style lang="scss">
	.songList {
		background-color: #FFFFFF;
		height: 120rpx;
		box-sizing: border-box;
		padding: 20rpx;
		display: flex;

		image {
			width: 80rpx;
			height: 80rpx;
			border-radius: 15rpx;
		}

		.section_song {
			flex: 1;
			padding-left: 40rpx;

			.title {}

			.name {
				font-size: 28rpx;
				overflow: hidden;
				-webkit-line-clamp: 1;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
			}
		}
	}
</style>
