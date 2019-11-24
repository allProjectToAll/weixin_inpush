<template>
	<view class="compyDetailContain">
		<image mode="aspectFill" :src="compList.bgUrl" class="compyImg"></image>
		<view class="compyNameBox">
			<image :src="compList.logo" class="compyLogo"></image>
			<view class="compyName">{{compList.name}}</view>
			<view class="compyMessBox">
				<view class="oneJob compyMess">{{compList.industryLabel}}</view>
				<!-- <view class="muchPeople compyMess">2000人以上</view> -->
			</view>
		</view>
		
		<view class="compySky">
			<view class="compyEachHeader">企业空间</view>
			<scroll-view scroll-x="true" class="scrolView">
				<image v-for="(item,index) in compList.photoList" :key="index" :src="item" class="scrolViewImg"></image>				
			</scroll-view>
		</view>
		
		<view class="compyEachContain">
			<view class="compyEachHeader">公司介绍</view>
			<view class="containMess">
				{{compList.summary}}
			</view>
		</view>
		<view class="compyEachContain">
			<view class="compyEachHeader">工作地点</view>
			<view class="containMess">
				{{compList.address}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				compList:{},
			}
		},
		onLoad(e) {
			
		},
		onShow(){
			this.compList = uni.getStorageSync("compyDetail");
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.compyDetailContain{
	padding-bottom: 40upx;
	.compyImg{
		width:100%;
		height:200upx;
		margin:0;
		padding:0;
		display:block;
	}
	.compyNameBox{
		width:100%;
		height:246upx;
		background:white;
		position:relative;
		border:1upx solid #f8f8f7;
		margin:0;
		padding:0;
		.compyLogo{
			width:130upx;
			height:130upx;
			box-shadow:  0 0 15px #ccc;
			position:absolute;
			left:40upx;
			top:-65upx;
		}
		.compyName{
			margin:100upx 0 0 40upx;
			font-size:34upx;
			font-weight:bolder;
			width:100%;
		}
		.compyMessBox{
			width:100%;
			color:rgba(0,0,0,0.45);
			margin-left:20upx;
			.compyMess{
				height:40upx;
				line-height:40upx;
				padding:0 18upx;
				background:#F5F5F9;
				float:left;
				font-size:24upx;
				margin-top:24upx;
				margin-left:20upx;
			}
		}
		
	}
	.compyEachContain{
		width:100%;
		background:white;
		padding:40upx;
		box-sizing: border-box;
		margin-top:20upx;
		.compyEachHeader{
			font-size:36upx;
			margin-bottom:40upx;
			color:rgba(0,0,0,1);
		}
		.containMess{
			font-size:28upx;
			line-height:40upx;
			color:rgba(0,0,0,0.45);
		}
	}
	.compySky{
		margin-top:20upx;
		width:100%;
		height:440upx;
		padding:40upx 0 40upx 40upx;
		background:white;
		box-sizing: border-box;
		.compyEachHeader{
			font-size:36upx;
			margin-bottom:40upx;
			color:rgba(0,0,0,1);
		}
		.scrolView{
			width:calc(100% - 40upx);
			height:260upx;
			position: absolute;
			white-space: nowrap;
			.scrolViewImg{
				width:calc(100% - 40upx);
				height:100%;
				margin-right:20upx;
				display: inline-block;
				// float:left;
			}
		}
	}
}
</style>
