<template>
  <view class="user">
    <img src="../../static/退出.png" alt="" class="out" v-if="this.id" @click="out"> 
    <!-- 头部信息 -->
    <view class="headerTop">
      <view class="headerTop-left" v-if="this.id">
        <img :src="userList.avatarUrl" alt="" class="tx" />
      </view>
      <view class="headerTop-left" v-else>
        <img src="../../static/x_头像.png" alt="" class="tx" />
      </view>

      <view class="headerTop-right" v-if="this.id">
        <text>{{ userList.nickname }}</text>
        <view>
          <text>{{ userList.follows }}关注</text>
          <text style="margin-left: 10px">{{ userList.followeds }}粉丝</text>
          <text style="margin-left: 10px">Lv.{{ userList.playlistCount }}</text>
        </view>
      </view>
      <view v-else class="HeaderTopNologin">
        <text @click="login">立即登录 > </text>
      </view>
    </view>
    
    <!-- 内容 -->
    <view class="content">
      <view class="content-top">
        <view class="warp" v-for="(item, index) in contentList" :key="index">
          <img :src="item.url" alt="" />
          <text>{{ item.title }}</text>
        </view>
      </view>
      <view class="content-bottom">
        <view class="imgg-left">
          <img src="../../static/T.jpg" class="T" alt="" />
          <text style="margin-left: 10px" class="imgg-right">Ta和你绝配</text></view
        >
        <view>✖</view>
      </view>
    </view>

    <!-- I like Music -->
    <view class="Ilike" v-if="this.id">
      <view>
        <img src="../../static/Ilike.jpg" class="Ilikeimg" alt="" />
      </view>
      <view class="likeMusic" style="margin-left: 10px">
        <text>我喜欢的音乐</text>
        <text>60首</text>
      </view>
      <view class="heartbeat" style="margin-left: 70px">
        <img src="../../static/icon_心动.png" alt="" />
        <text>心动模式</text>
      </view>
    </view>
    <view class="Ilike" v-else>
      <view>
        <img src="../../static/Ilike.jpg" class="Ilikeimg" alt="" />
      </view>
      <view class="likeMusic" style="margin-left: 10px">
        <text>我喜欢的音乐</text>
        <text>0首</text>
      </view>
      <view class="heartbeat" style="margin-left: 70px">
        <img src="../../static/icon_心动.png" alt="" />
        <text>心动模式</text>
      </view>
    </view>

    <!-- new歌单 -->
    <view class="NewSong">
      <view class="NewSongChil" style="border-bottom: 2px solid red">创建歌单</view>
      <view class="NewSongChil">收藏歌单</view>
      <view class="NewSongChil">歌单助手</view>
    </view>

    <!-- Song -->
    <view class="Song">
      <view class="SongTop">
        <view style="margin-left: 10px"
          >创建歌单 <text style="margin-left: 10px" v-if="this.id">1个</text>
          <text style="margin-left: 10px" v-else>0个</text>
        </view>
        <view class="slhView">
          <text>+</text>
          <img src="../../static/slh.png" class="slh" alt="" />
        </view>
      </view>
      <view class="music" v-if="this.id">
        <view class="music-left"> <img src="../../static/music.jpg" alt="" /></view>
        <view class="music-right">
          <view>乱七八糟</view>
          <view style="color: #b6b6b6">99首</view>
        </view>
      </view>
      <view class="import">
        <img
          src="../../static/导入.png"
          style="margin-left: 10px"
          class="importImg"
          alt=""
        />
        <text style="margin-left: 10px">一键导入外部音乐</text>
      </view>
    </view>

    <!-- 收藏歌单 -->
    <view class="collect">
     
    </view>
  </view>
</template>

<script>
import { getUser, Music } from "@/api/login.js";
export default {
  data() {
    return {
      contentList: [
        {
          title: "最近播放",
          url: "../../static/1.png",
          path: "",
        },
        {
          title: "本地下载",
          url: "../../static/2.png",
          path: "",
        },
        {
          title: "云盘",
          url: "../../static/3.png",
          path: "",
        },
        {
          title: "已购",
          url: "../../static/4.png",
          path: "",
        },
        {
          title: "我的好友",
          url: "../../static/5.png",
          path: "",
        },
        {
          title: "收藏和赞",
          url: "../../static/6.png",
          path: "",
        },
        {
          title: "我的播客",
          url: "../../static/7.png",
          path: "",
        },
        {
          title: "音乐罐子",
          url: "../../static/8.png",
          path: "",
        },
      ],
      userList: [],
      id: 0,
    };
  },
  onShow() {
    this.id = uni.getStorageSync("id");
    console.log(this.id);
    getUser(this.id).then((res) => {
      // console.log(res);
      // title
      this.userList = res.data.profile;
    });
    // Music().then(res=>{
    //   console.log(res);
    // })
  },
  methods: {
    login() {
      uni.navigateTo({
        url: "/pages/login/login",
      });
    },
    out(){
      uni.removeStorageSync('id')
      uni.switchTab({
        url:'/pages/index/index'
      })
    }
  },
};
</script>

<style lang="less">
.out{
  position:absolute;
  right:20px;
  top: 20px;
  z-index: 999;
  width: 50px;
  height: 50px;
}
.user {
  width: 100%;
  height: 100%;
  background: #e9e9e9;
  overflow: hidden;
  .collect {
    width: 98%;
    height: 50px;
    margin: 10px auto;
    display: flex;
    align-items: center;
    background: #fff;
  }
  .headerTop {
    position: relative;
    width: 95%;
    height: 100px;
    background: #fff;
    box-sizing: border-box;
    border-radius: 10px;
    margin: 20px auto;
    display: flex;
    flex-direction: column;
    .HeaderTopNologin {
      width: 100%;
      height: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .headerTop-left {
      width: 100%;
      height: 50%;
      img {
        position: absolute;
        left: 40%;
        top: -20px;
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .headerTop-right {
      width: 100%;
      height: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
  }
  .content {
    width: 95%;
    height: 200px;
    margin: auto;
    background: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    .content-top {
      width: 100%;
      height: 150px;
      display: flex;
      border-bottom: 1px solid #ccc;
      flex-wrap: wrap;
      .warp {
        width: 25%;
        height: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        color: #a6a6a6;
        img {
          width: 30px;
          height: 30px;
        }
      }
    }
    .content-bottom {
      width: 100%;
      height: 50px;
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding-left: 10px;
      justify-content: space-between;
      .imgg-left {
        height: 50px;
        display: flex;
        align-items: center;
      }
      .imgg-right {
        box-sizing: border-box;
        padding-right: 10px;
      }
      .T {
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
    }
  }
  .Ilike {
    margin: 10px auto;
    width: 95%;
    height: 60px;
    border-radius: 10px;
    background: #ffff;
    display: flex;
    align-items: center;
    .Ilikeimg {
      margin-left: 10px;
      width: 40px;
      height: 40px;
      border-radius: 10px;
      // vertical-align: middle;
    }
    .likeMusic {
      display: flex;
      flex-direction: column;
    }
    .heartbeat {
      margin-left: 30px;
      width: 100px;
      height: 30px;
      border: 1px solid #ccc;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  .NewSong {
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    .NewSongChil {
      width: 33.3%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .Song {
    width: 95%;
    margin: 10px auto;
    background: #fff;
    border-radius: 10px;
    .import {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      // justify-content: center;
      .importImg {
        width: 30px;
        height: 30px;
        vertical-align: middle;
      }
    }
    .SongTop {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .slhView {
        .slh {
          margin-left: 10px;
          width: 20px;
          height: 20px;
          vertical-align: middle;
        }
      }
    }
    .music {
      width: 100%;
      height: 50px;
      // background: aquamarine;
      display: flex;
      .music-left {
        width: 20%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
      }
      .music-right {
        width: 80%;
        height: 100%;
        display: flex;
        flex-direction: column;
        // align-items: center;
        justify-content: space-around;
      }
    }
  }
}
</style>
