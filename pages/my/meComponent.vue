<template>
	<view class="meOtherBox" :style="{height:isHeight=='isOtherTrue'?'100%':windowHeight}">
		<view class="mySelfBox">
			<image src="../../static/icos/t.png" class="headerImg" mode="aspectFill"></image>
			<view class="mySelfBoxContent">
				<view class="myselfName">
					<view class="myselfNameLeft">小黄鸭</view>
					<!-- <image src="../../static/icos/resg.png" class="resg"></image> -->
				</view>
				<!-- <view class="compyName">宝付网络科技（上海）有限公司</view> -->
			</view>
			
			<!-- <view class="changeCompy" v-if="changeCompyAsync" @tap="changeCompy">切换企业</view> -->
		</view>
		<!-- <view class="historyArrayBox">
			<view class="historyArray">
				<view class="eachHistory">
					<view class="historyNum">1</view>
					<view class="historyTitle">分享记录</view>
				</view>
				<view class="lineShu"></view>
				<view class="eachHistory">
					<view class="historyNum">2</view>
					<view class="historyTitle">内推记录</view>
				</view>
			</view>
		</view> -->
		
		<!-- <view class="eachMyMess" @tap="sendHistoryFn">
			<image class="eachMyMessImage" src="../../static/icos/history1.png"></image>
			<view class="getTheJL">投递记录</view>
			<view class="toRight" >＞</view>
		</view> -->
		<view class="eachMyMess" @tap="shareHistoryFn">
			<image class="eachMyMessImage" src="../../static/icos/history2.png"></image>
			<view class="getTheJL">分享记录</view>
			<view class="toRight">＞</view>
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				rpx:1,
				windowHeight:0,
				// changeCompyAsync:false,//是否允许切换公司，没有公司和一个公司的情况下不可以切换，多个公司可以切换
			}
		},
		props:{
			otherMy:String,
		},
		computed:{
			isHeight(){
				return this.otherMy?this.otherMy:"";
			}
		},
		mounted() {
			uni.getSystemInfo({
				success: res => {
					// this.rpx = res.windowWidth / 750;
					this.windowHeight = res.windowHeight + 'px';
				}
			});
			this.getCompy();
			
		},
		methods: {
			getCompy(){
				this.unirequest({
					url: '/card/list',
					success: res => {
						console.log(res);
						if(res.compCardList.length == 0){//游客
						
						}else if(res.compCardList.length == 1){//一个企业
							uni.switchTab({url: '../my/my'});
						}else if(res.compCardList.length > 1){//多个企业
							uni.switchTab({url: '../my/my'});
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			// sendHistoryFn(){
			// 	uni.navigateTo({url: '../../components/shareHistory/shareHistory'});
			// },
			shareHistoryFn(){
				uni.navigateTo({url: '../../components/shareHistory/shareHistory'});
			}
			// changeCompy(){
			// 	uni.navigateTo({url: '../../components/changeCompy/changeCompyPage?isOtherCompy=isTrue'});
			// }
		}
	}
</script>

<style lang="scss">
.meOtherBox{
	width:100%;
	height:100%;
	background:white;
	.mySelfBox{
		width:100%;
		height:220upx;
		background:white;
		position: relative;
		.headerImg{
			width:136upx;
			height:136upx;
			box-shadow:0px 8px 18px 3px rgba(180,180,180,0.15);
			border-radius:50%;
			margin:30upx 43upx 0 40upx;
			float:left;
		}
		.mySelfBoxContent{
			width:500upx;
			float:left;
			display:table;
			padding-top:86upx;
			.myselfName{
				display:table;
				.myselfNameLeft{
					font-size:36upx;
					color:#2A2627;
					float:left;
					font-weight:bolder;
				}
				.resg{
					float:left;
					margin-left:15upx;
					width:63upx;
					height:30upx;
					margin-top:15upx;
				}
			}
			
		}
		.compyName{
			width:100%;
			margin-top:20upx;
			font-size:24upx;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.changeCompy{
			width:164upx;
			height:56upx;
			line-height:56upx;
			border-radius:35upx 0 0 35upx;
			background:rgba(32,58,210,0.1);;
			color:#203AD2;
			text-align:center;
			position:absolute;
			right:0;
			top:46upx;
			font-size:26upx;
		}
	}
	.historyArrayBox{
		width:100%;
		background:white;
		height:250upx;
		overflow:hidden;
		.historyArray{
			width:674upx;
			height:166upx;
			margin:40upx;
			border-radius:16upx;
			box-shadow:0px 8px 18px 3px rgba(180,180,180,0.1),0px -8px 18px 3px rgba(180,180,180,0.1);
			.eachHistory{
				width:calc(50% - 1px);
				float:left;
				overflow: hidden;
				.historyNum{
					color:#203AD2;
					text-align:center;
					font-size:36upx;
					margin-top:36upx;
				}
				.historyTitle{
					font-size:28upx;
					color:#333333;
					margin-top:16upx;
					text-align:center;
				}
			}
			.lineShu{
				width:1px;
				height:69upx;
				background:#E5E5E5;
				float:left;
				margin-top:49upx;
			}
		}
	}
	.eachMyMess{
		width:100%;
		height:100upx;
		line-height:100upx;
		padding:0 40upx;
		box-sizing: border-box;
		.eachMyMessImage{
			width:38upx;
			height:38upx;
			float:left;
			margin:31upx 26upx 0 0;
		}
		.getTheJL{
			font-size:30upx;
			font-weight:bolder;
			float:left;
		}
		.toRight{
			float:right;
			color:#979797;
			font-size:30upx;
		}
	}
}
</style>
