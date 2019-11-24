<template>
	<view class="meBox" :style="{height:isHeight=='isOtherTrue'?'100%':windowHeight}">
		<view class="mySelfBox">
			<image src="../../static/icos/t.png" class="headerImg" mode="aspectFill"></image>
			<view class="mySelfBoxContent">
				<view class="myselfName">
					<view class="myselfNameLeft">{{userInfo.name}}</view>
					<image src="../../static/icos/resg.png" class="resg"></image>
				</view>
				<view class="compyName">{{userInfo.compName}}</view>
			</view>
			
			<view class="changeCompy" v-if="changeCompyAsync" @tap="changeCompy">切换企业</view>
		</view>
		<view class="historyArrayBox">
			<view class="historyArray">
				<view class="eachHistory" @tap="toShareList">
					<view class="historyNum">1</view>
					<view class="historyTitle">分享记录</view>
				</view>
				<!--<view class="lineShu"></view>-->
				<view class="eachHistory" @tap="toInpushList">
					<view class="historyNum">2</view>
					<view class="historyTitle">内推记录</view>
				</view>
				<view class="eachHistory" @tap="toSendList">
					<view class="historyNum">2</view>
					<view class="historyTitle">投递记录</view>
				</view>
			</view>
		</view>
		
		<view class="eachMyMess" @tap="getResumes">
			<image class="eachMyMessImage" src="../../static/icos/jl.png"></image>
			<view class="getTheJL">我收到的简历</view>
			<view class="toRight">＞</view>
		</view>
		<view class="eachMyMess" @tap="manageJobs">
			<image class="eachMyMessImage" src="../../static/icos/zw.png"></image>
			<view class="getTheJL">我管理的职位</view>
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
				changeCompyAsync:false,//是否允许切换公司，没有公司和一个公司的情况下不可以切换，多个公司可以切换
				userInfo:{},
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
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					// this.rpx = res.windowWidth / 750;
					this.windowHeight = res.windowHeight + 'px';
				}
			});
		},
		onShow() {
			this.getCompy();
			this.userInfo = this.getGlobalUser();
			console.log(this.userInfo,"this.userInfo")
		},
		methods: {
			getCompy(){
				this.unirequest({
					url: '/card/list',
					success: res => {
						console.log(res);
						if(res.compCardList.length == 0){//游客
							// this.changeCompyAsync = false;
							uni.navigateTo({url: '../otherIndex/otherIndex?isIndex=isFalse'});//跳转过去 显示“我的”组件
						}else if(res.compCardList.length == 1){//一个企业
							this.changeCompyAsync = false;
						}else if(res.compCardList.length > 1){//多个企业
							this.changeCompyAsync = true;
							uni.setStorageSync("allCompy",res.compCardList);
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			changeCompy(){
				uni.navigateTo({url: '../../components/changeCompy/changeCompyPage'});
			},
			toShareList(){//分享记录
				uni.navigateTo({url: '../../components/shareHistory/shareHistory'});
			},
			toInpushList(){//内推记录
				uni.navigateTo({url: '../../components/inPushHistory/inPushHistory'});
			},
			getResumes(){//收到的简历
				uni.navigateTo({url: '../../components/receivedResume/receivedResume'});
			},
			manageJobs(){//管理的职位
				uni.navigateTo({url: '../../components/manageJob/manageJob'});
			},
			toSendList(){//投递记录
				uni.navigateTo({url: '../../components/sendHistory/sendHistory'});
			}
		}
	}
</script>

<style lang="scss">
.meBox{
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
			padding-top:46upx;
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
				width:33.33%;
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
