<template>
  <view class="search">
    <view class="searchTop">
      <img src="../../static/左箭头.png" alt="" class="small">
      <input type="text" name="" id="" />
      <img src="../../static/错误.png" alt="" class="small">
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onload() {},
  methods: {},
};
</script>

<style lang="less">
.search {
  width: 100%;
  height: 100vh;
  background: #e9e9e9;
  overflow: hidden;
  .searchTop {
    width: 98%;
    height: 50px;
    margin: 10px auto;
    background: #fff;
    border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content:space-between;
	.small{
		width: 40px;
		height: 40px;
	}
	input{
		width: 80%;
		box-sizing: border-box;
		padding-left: 20px;
		font-size: 20px;
		height: 40px;
		border-radius: 20px;
		// border: 1px solid #ccc;
		background: #f6f6f6;
	}
  }
}
</style>
