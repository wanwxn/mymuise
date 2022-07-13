<template>
	<view class="content">
		<myheader></myheader>
		<!-- 轮播图 -->
		<view class="lll">
			<view>
				<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
					<swiper-item class="swiper-item" v-for="(item,i) in Banner" :key="i">
						<image :src="item.pic" mode=""></image>
					</swiper-item>
				</swiper>
			</view>
			<!-- tab -->
			<view class="ul_tab">
				<view class="li_tab">
					<image src="../../static/index_icon/gedan.png" mode=""></image>
					<view class="p_tab">每日推荐</view>
				</view>
				<view class="li_tab">
					<image src="../../static/index_icon/rl.png" mode=""></image>
					<view class="p_tab">私人FM</view>
				</view>
				<view class="li_tab">
					<image src="../../static/index_icon/taozhi.png" mode=""></image>
					<view class="p_tab">歌单</view>
				</view>
				<view class="li_tab">
					<image src="../../static/index_icon/san.png" mode=""></image>
					<view class="p_tab">排行榜</view>
				</view>
				<view class="li_tab">
					<image src="../../static/index_icon/syj.png" mode=""></image>
					<view class="p_tab">有声书</view>
				</view>
			</view>


			<!-- 推荐歌单 -->
			<view class="title_tui">
				推荐歌单
			</view>
			<scroll-view scroll-x="true">
				<view class="tuijian">
					<view class="cart_tui" v-for="item in newlist" :key="item.id" @click="goSonglist(item.id)">
						<image :src="item.picUrl" mode=""></image>
						<view class="count">
							<image src="../../static/index_icon/sanjiaoxing.png"  style="width: 30rpx;height: 30rpx;"
								mode=""></image>
							{{item.playCount}}
						</view>
						<view class="cart_p">
							{{item.name}}
						</view>

					</view>
				</view>
			</scroll-view>
			<view class="Song">
				<song-list v-for="item in song" :key="item.id" :songObj="item"></song-list>
			</view>
		</view>

	</view>
</template>

<script>
	import myheader from '../../components/myheader.vue'
	import myMiuse from '../../components/myMiuse.vue'
	import songList from '../../components/songList.vue'
	import {
		getBanner,
		getplaylist,
		getplaylistDetail
	} from '@/api/index.js'
	import {
		getyrz
	} from '@/api/muise.js'
	import {
		ToLogin,
		getUser,
	} from '@/api/login.js'
	export default {
		components: {
			myheader,
			myMiuse,
			songList
		},
		data() {
			return {
				// 轮播图
				Banner: [],
				// 推荐歌单
				newlist: [],
				// 颜人中歌曲
				song: []
			}
		},
		onLoad() {
			getBanner().then(res => {
				this.Banner = res.data.banners
			})
			getplaylist().then(res => {
				this.newlist = res.data.result.splice(0, 6)
				this.newlist.map(item => {
					if (item.playCount > 100000000) {
						item.playCount = (Number(item.playCount) / 100000000).toFixed(1) + '亿'
					} else {
						item.playCount = (Number(item.playCount) / 10000).toFixed(1) + '万'
					}
					return item
				})
				// console.log(this.newlist)
			})
			getyrz().then(res => {
				this.song = res.data.hotSongs
			})
			getplaylistDetail().then(res=>{
				// console.log(res)
			})
		},
		methods: {
			goSonglist(id){
				console.log(id)
				uni.navigateTo({
					url:`../songlistDetail/songlistDetail?id=${id}`,
				})
			}
		}
	}
</script>

<style lang="scss">
	.Song {
		margin-top: 30rpx;
	}
	.lll{
		height: calc(100vh - 180rpx);
		overflow: auto;
	}
	.content {
		width: 100vw;
		background-color: #f1f3f4;

		.ul_tab {
			background-color: #FFFFFF;
			padding-bottom: 20rpx;
			border-bottom: 1rpx #f1f3f4 solid;

			.li_tab {
				width: 20%;
				display: flex;
				justify-content: space-around;
				flex-direction: column;
				align-items: center;
				font-size: 24rpx;
			}

			display: flex;

			image {
				width: 100rpx;
				height: 100rpx;
			}
		}
	}

	.title_tui {
		height: 60rpx;
		line-height: 60rpx;
		font-size: 30rpx;
		font-weight: 600;
		padding-left: 20rpx;
		background-color: #FFFFFF;
	}

	.tuijian {
		padding: 0 20rpx;
		display: flex;
		overflow: auto;
		background-color: #FFFFFF;
		height: 276rpx;
		overflow-y: hidden;

		.cart_p {
			width: 100%;
			font-size: 10rpx;
		}

		.cart_tui {
			margin-right: 20rpx;
			position: relative;
			width: 200rpx;
			height: 276rpx;

			.count {
				font-size: 14rpx;
				position: absolute;
				color: #FFFFFF;
				vertical-align: middle;
				top: 5rpx;
				right: 5rpx;
			}

			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 15rpx;
			}
		}
	}

	swiper {
		width: 100%;
		height: 400rpx;
		background-color: #FFFFFF;

		swiper-item {
			height: 100%;
			box-sizing: border-box;
			padding: 20rpx;

			image {
				border-radius: 20rpx;
				width: 100%;
				height: 100%;
			}
		}
	}

	uni-swiper .uni-swiper-dots-horizontal {
		bottom: 40rpx !important;
	}
</style>
