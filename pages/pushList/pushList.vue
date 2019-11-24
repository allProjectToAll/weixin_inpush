<template>
	<view class="pushList">
		<image src="../../static/icos/bdBanner.png" class="banner"></image>
		<view class="pushListTitle">
			<view class="pushListTitleName">热推榜</view>
			<view class="line"></view>
		</view>
		
		<view class="eachJobHot eachJobHotBg">
			<image src="../../static/icos/p1.png" class="gardImg"></image>
			<view class="jobName">产品经理（后台）</view>
			<view class="sharNum">33</view>
		</view>
		<view class="eachJobHot">
			<image src="../../static/icos/p2.png" class="gardImg"></image>
			<view class="jobName">产品经理（后台）</view>
			<view class="sharNum">33</view>
		</view>
		<view class="eachJobHot eachJobHotBg">
			<image src="../../static/icos/p3.png" class="gardImg"></image>
			<view class="jobName">产品经理（后台）</view>
			<view class="sharNum">2000</view>
		</view>
		<view class="eachJobHot">
			<view class="eachJobHotIndex">4</view>
			<view class="jobName">产品经理（后台）</view>
			<view class="sharNum">133</view>
		</view>
		<view class="eachJobHot eachJobHotBg">
			<view class="eachJobHotIndex">5</view>
			<view class="jobName">产品经理（后台）</view>
			<view class="sharNum">3</view>
		</view>
		
		<view class="pushListTitle">
			<view class="pushListTitleName">内推榜</view>
			<view class="line"></view>
		</view>
		<view class="inPushPosition">
			<view class="numb1Box">
				<view class="halfRadius halfRadius1"></view>
				<view class="square"></view>
				<image src="../../static/icos/t.png" class="headerImg" mode="aspectFill"></image>
				<image src="../../static/icos/num2.png" class="numb2Img" ></image>
				<view class="bottomPeopDetail">
					<view class="bottomPeopName">刘亦菲</view>
					<view class="bottomPeopjob">国际事业部</view>
				</view>
			</view>
			<view class="numb2Box">
				<view class="halfRadius halfRadius2"></view><!--圆形-->
				<view class="square"></view><!--方形-->
				<image src="../../static/icos/t.png" class="headerImg" mode="aspectFill"></image><!--头像-->
				<image src="../../static/icos/num1.png" class="numb2Img" ></image><!--名次-->
				<view class="bottomPeopDetail">
					<view class="bottomPeopName">刘亦菲</view>
					<view class="bottomPeopjob">国际事业部</view>
				</view>
			</view>
			<view class="numb3Box">
				<view class="halfRadius halfRadius3"></view>
				<view class="square"></view>
				<image src="../../static/icos/t.png" class="headerImg" mode="aspectFill"></image>
				<image src="../../static/icos/num3.png" class="numb2Img" ></image>
				<view class="bottomPeopDetail">
					<view class="bottomPeopName">刘亦菲</view>
					<view class="bottomPeopjob">国际事业部</view>
				</view>
			</view>
		</view>
		
		
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.pushList{
	.banner{
		width:100%;
		height:300upx;
		display:block;
	}
	.pushListTitle{
		width:100%;
		height:126upx;
		background:white;
		overflow:hidden;
		font-weight:bolder;
		.pushListTitleName{
			font-size:40upx;
			margin:36upx auto 10upx;
			text-align:center;
		}
		.line{
			width:40upx;
			height:4upx;
			background:#203AD2;
			margin:0 auto;
		}
	}
	.eachJobHot{
		width:100%;
		height:100upx;
		background:white;
		.eachJobHotIndex{
			font-size:32upx;
			margin-left:40upx;
			margin-right:20upx;
			line-height:100upx;
			color:rgba(0,0,0,0.45);
			float:left;
			font-weight:bolder;
		}
		.gardImg{
			width:40upx;
			height:40upx;
			margin:30upx 18upx 0 30upx;
			float:left;
		}
		.jobName{
			float:left;
			line-height:100upx;
			font-size:32upx;
		}
		.sharNum{
			float:right;
			margin:26upx 40upx 0 0;
			padding:5upx 22upx;
			border-radius:24upx;
			color:white;
			background:#F80080;
			font-size:28upx;
		}
	}
	.eachJobHotBg{
		background:#F8F8F8;
	}
	.inPushPosition{
		width:100%;
		height:478upx;
		background:white;
		overflow:hidden;
		.numb1Box{
			width:170upx;
			height:300upx;
			position:relative;
			display:inline-block;
			margin:122upx 40upx 0 80upx;
			.halfRadius1{
				background:#CE7A5D;
			}
			.square{
				position: absolute;
				left:0;
				top:85upx;
				width:100%;
				height:215upx;
				background:#CE7A5D;
			}
			
		}
		.numb2Box{
			width:170upx;
			height:367upx;
			position:relative;
			margin:40upx 40upx 0 0;
			display:inline-block;
			.halfRadius2{
				background:#FFA721;
			}
			.square{
				position: absolute;
				left:0;
				top:85upx;
				width:100%;
				height:282upx;
				background:#FFA721;
			}
			
		}
		.numb3Box{
			width:170upx;
			height:238upx;
			position:relative;
			margin:170upx 0 0 0;
			display:inline-block;
			.halfRadius3{
				background:#6553EB;
			}
			.square{
				position: absolute;
				left:0;
				top:85upx;
				width:100%;
				height:153upx;
				background:#6553EB;
			}
			
		}
		
		.halfRadius{
			width:170upx;
			height:170upx;
			border-radius:50%;
			position:absolute;
			left:0;
			top:0;
		}
		.headerImg{
			width:109upx;
			height:109upx;
			border-radius:50%;
			margin:-8upx auto;
			display:block;
			position:absolute;
			left:30upx;
			top:20upx;
		}
		.numb2Img{
			width:64upx;
			height:64upx;
			position:absolute;
			display:block;
			left:50upx;
			top:90upx;
		}
		.bottomPeopDetail{
			position:absolute;
			left:0;
			bottom:15upx;
			text-align:center;
			width:100%;
			color:white;
			.bottomPeopName{
				font-size:32upx;
				width:100%;
				margin-bottom:10upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.bottomPeopjob{
				font-size:20upx;
				width:100%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				letter-spacing:3upx;
			}
		}
		
		
	}
}
</style>
