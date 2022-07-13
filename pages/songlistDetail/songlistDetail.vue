<template>
	<view>
		<view class="Song_top" :style="{backgroundImage:`url(${allList.coverImgUrl})`}">
			<!-- 头部返回 -->
			<view class="Song_top_back">
				<view>
					<image src="../../static/recommend/arrow-left.png" style="margin-right: 20rpx;" mode="widthFix" @click="back"></image>
					<text>歌单</text>
				</view>
				<view>
					<image src="../../static/recommend/search.png" style="margin-right: 20rpx;" mode="widthFix"></image>
					<image src="../../static/recommend/more-one.png" mode="widthFix"></image>
				</view>
			</view>
			<!-- 头部内容 -->
			<view class="Song_top_content">
				<view class="Song_top_content_left">
					<image :src="allList.coverImgUrl" mode="widthFix"></image>
				</view>
				<view class="Song_top_content_right">
					<text class="Song_top_content_right_toptitle">{{allList.name}}</text>
					<view class="">
						<image :src="creator.backgroundUrl" mode="widthFix"></image>
						<text>{{creator.nickname}}</text>
						<image src="../../static/recommend/add.png" mode="widthFix"></image>
					</view>
					<!-- <text class="Song_top_content_right_bottitle">{{allList.description}}</text> -->
					<text><text v-for="item in allList.tags" :key="item">{{item}}</text></text>
				</view>
			</view>
			
		</view>
		<!-- 歌单列表 -->
		<view class="SongList_content">
			<songList v-for="item in list" :key="item.id" :songObj="item"></songList>
		</view>
	</view>
</template>

<script>
	import {getplaylistDetail} from '../../api/index.js';
	import songList from "../../components/songList.vue"
	export default {
		data() {
			return {
				allList:[],
				list:[],//遍历的歌单
				creator:[],//创建歌单的用户信息
			};
		},
		components:{
			songList
		},
		onLoad(option) {
			// console.log(option.id);
			getplaylistDetail({id:option.id}).then(res=>{
				this.list = res.data.playlist.tracks;
				this.allList = res.data.playlist;
				this.creator = this.allList.creator
				console.log(this.allList)
			})
		},
		methods:{
			back(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.SongList_content{
		padding: 20rpx 30rpx;
	}
.Song_top{
	// background-color: gray;
	height:380rpx;
	.Song_top_back{//头部返回
		display: flex;
		padding: 20rpx 30rpx;
		justify-content: space-between;
		color: white;
		view{
			display: flex;
			align-items: center;
		}
		image{
			width: 40rpx;
		}
	}
	.Song_top_content{//头部内容
		padding: 20rpx 30rpx;
		display: flex;
		.Song_top_content_left{
			width: 30%;
			box-shadow: 0 0 4rpx 4rpx white;
			margin-right: 20rpx;
			box-sizing: border-box;
			border-radius: 20rpx;
			image{
				width: 100%;
				border-radius: 20rpx;
			}
		}
		.Song_top_content_right{
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			&>text{
				color: white;
				text{
					margin-right: 20rpx;
				}
			}
			.Song_top_content_right_toptitle{
				color: white;
				font-size: large;
				font-weight: bold;
				letter-spacing: 2rpx;
			}
			.Song_top_content_right_bottitle{
				color: gray;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				width: 20rpx;
			}
			view{
				display: flex;
				align-items: center;
				text{
					margin: 0 20rpx;
					color: gray;
					text-shadow:4rpx 4rpx white;
				}
				image{
					width: 40rpx;
					border-radius: 50%;
				}
			}
		}
	}
}
</style>
