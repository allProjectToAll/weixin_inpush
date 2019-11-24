<template>
	<view class="toSharePic" :style="{height:windowHeight+'px'}">
		<!-- <view class="closed" @tap="closeFn">X</view> -->
		<icon type="clear" size="32" class="closed"  @tap="closeFn"/>
		<image class="picImg" :src="imageUrl"></image>
		<view class="continueBottom">
			<button open-type="share" class="share">继续</button>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				windowHeight:"",
				
				imageUrl:"",
				shareId:"",
				title:"",
				id:"",
			}
		},
		onLoad(e) {
			console.log(e,"sharePic");
			this.id = e.id;
			this.title = e.title;
			this.shareId = e.shareId;
			this.imageUrl = e.imageUrl;
			uni.getSystemInfo({
				success: res => {
					this.rpx = res.windowWidth / 750;
					this.windowHeight = res.windowHeight;
				}
			});
		},
		methods: {
			closeFn(){
				uni.navigateBack();
			},
		},
		onShareAppMessage(res) {//shareId
		console.log(this.shareId,"this.shareId")
			uni.navigateBack();
			return {
				title: this.title,
				imageUrl:this.imageUrl,
				path: '/components/jobDetail/jobDetail?shareId='+this.shareId+'&id='+this.id,
			};
		}
	}
</script>

<style lang="scss">
.toSharePic{
	width:100%;
	height:100%;
	// background:black;
	background:#ccc;
	.closed{
		width:80upx;
		height:80upx;
		position:absolute;
		left:40upx;
		top:80upx;
		color:white;
		text-align:center;
		line-height:80upx;
	}
	.picImg{
		width:670upx;
		height:536upx;
		position:absolute;
		left:40upx;
		top:350upx;
	}
	// .continueBottom{
	// 	width:100%;
	// 	height:210upx;
	// 	background:#eee;
	// 	position:absolute;
	// 	left:0;
	// 	bottom:0;
	// }
	.share{
		width:670upx;
		height:100upx;
		font-size:32upx;
		font-weight:bolder;
		border-radius:4px;
		text-align:center;
		line-height:100upx;
		float:left;
		// border:1px solid rgba(32,58,210,1);
		color:white;
		background:linear-gradient(270deg,rgba(67,26,255,1) 0%,rgba(32,58,210,1) 100%);
		// color:#431AFE;
		// background:white;
		// background:#ccc;
		// color:white;
		position:absolute;
		left:40upx;
		bottom:70upx;
	}
}
</style>
