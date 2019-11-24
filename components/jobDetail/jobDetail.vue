<template>
	<view class="pageContain" :class="isIPX ? 'bottom-view-IPX' : ''">
		<view class="moneyBox" v-if="isMe">
			<image src="../../static/icos/money.png" class="moneyImg"></image>
			<view class="moneyDeatilBox">
				<view class="moneydetail">奖{{detailList.reward}}</view>
				<view class="moneyMess">分享时不展示奖励信息</view>
			</view>
		</view>
		<!-- //非本公司员工 -->
		<view class="otherMoneyBox" v-if="!isMe">
			<image src="../../static/icos/t.png" class="otherPeopHerder"></image>
			<view class="nameAndCompy">
				<view class="otherName">Fiona</view>
				<view class="otherCompy">宝付网络科技（上海）有限公司</view>
			</view>
			<view class="isMess">邀你投递</view>
		</view>
		<view class="jobNameBox">
			<view class="jobNameBoxLeft">
				<view class="jobName">{{detailList.name}}</view>
				<view class="jobMess">
					{{detailList.location}}&nbsp;
					{{ '|&nbsp;'+detailList.workExpLabel + '&nbsp;'}}
					{{ '|&nbsp;'+detailList.eduLabel + '&nbsp;'}}
					{{ '|&nbsp;'+detailList.natureLabel + '&nbsp;'}}
					{{ '|&nbsp;'+detailList.total + '人'}}
				</view>
			</view>
			<view class="jobNameBoxRight">
				{{detailList.salary}}
			</view>
			<view style="clear:both;"></view>
			<view class="eachType" style="margin-top:30upx;">
				<view class="eachTypeLabel">招聘类别：</view>
				<view class="eachTypeValue">{{detailList.typeLabel}}</view>
			</view>
			<view class="eachType">
				<view class="eachTypeLabel">需求部门：</view>
				<view class="eachTypeValue">{{detailList.departName}}</view>
			</view>
			<view class="eachType">
				<view class="eachTypeLabel">职位类别：</view>
				<view class="eachTypeValue">{{detailList.jobTypeName}}</view>
			</view>
		</view>
		
		<view class="box-contain">
			<view class="box-contain-header">
				<image src="../../static/icos/detail.png" class="detailImg"></image>
				<view class="box-contain-header-name">职位描述</view>
			</view>
			<view class="box-contain-body-detail">
				{{detailList.jobRes}}
			</view>
		</view>
		
		<view class="box-contain">
			<view class="box-contain-header">
				<image src="../../static/icos/result.png" class="detailImg"></image>
				<view class="box-contain-header-name">任职要求</view>
			</view>
			<view class="box-contain-body-detail">
				{{detailList.qualifications}}
			</view>
		</view>
		
		<view class="box-contain">
			<view class="box-contain-header">
				<image src="../../static/icos/mess.png" class="detailImg"></image>
				<view class="box-contain-header-name">公司信息</view>
			</view>
			<view class="box-contain-body">
				<view class="eachCompy" @tap="toCompyDetail">
					<image :src="detailList.compInfo.logo" class="componyLogo"></image>
					<view class="eachCompyCenter">
						<view class="eachCompyName">{{detailList.compInfo.name}}</view>
						<view class="eachCompyDetail">{{detailList.compInfo.industryLabel}} </view>
						<!-- &nbsp;|&nbsp; 1000人以上 -->
					</view>
					<view class="toRight">></view>
				</view>
			</view>
		</view>
		
		<view :class="isIPX ? 'footer feed-bottom-view-IPX' : 'footer'" v-if="!detailList.delivered">
			<button class="shareJob shareJob1" @tap="toLoginShare">分享职位</button>
			<!-- open-type="share" -->
			<!-- <view class="shareIsLogin" v-if="!shareIsLogin" @tap="toLoginShare"></view> -->
			<view class="shareJob shareJob2" v-if="isMe" @tap="inpushFn">我要内推</view>
			<view class="shareJob shareJob2" v-else @tap="sendResume">投递简历</view>
		</view>
		
		<view :class="isIPX ? 'footer feed-bottom-view-IPX' : 'footer'" v-if="detailList.delivered">
			<button class="hasSend" disabled="disabled">简历已投递</button>
		</view>
		
		<view style="position:absolute;left:1800upx;top:0;">
			<canvas canvas-id="iCanvas"  class="canvas-class"></canvas>
		</view>
	</view>
</template>

<script>
let rpx = 1;
	export default {
		data() {
			return {
				isIPX:false,
				isMe:false,//判断是不是自己通过列表点进来的，不是分享进来的
				id:"",
				
				detailList:{},
				shareId:"",
				loginType:"",
				shareIsLogin:false,
				src_compLogo:"",
				tempFilePath:"",//分享生成的图片
			}
		},
		mounted() {
			let self = this;
			wx.getSystemInfo({
			  success: function (res) {
				//判断是否是iphonx
				if (res.model.search('iPhone X') != -1) {
				  self.isIPX = true;
				}
			  }
			})
		},
		onLoad(e){
			uni.hideShareMenu();//右上角分享去掉
			console.log(e);
			if(e.isMe){//自己点击详情进来的
				this.isMe = true;
			}else{//通过分享进来的
				this.shareId = e.shareId;
			}
			this.id = e.id;
			console.log(this.id,this.shareId,88888);
			// this.getDate();
		},
		onShow() {
			// this.isLogin();//判断是否已经登录，分享按钮被遮盖
			this.getDate();//登录回来重新获取数据
		},
		methods: {
			downLoadLogo(logoUrl){
				let _this = this;
				uni.downloadFile({
					url: logoUrl,
					success: (res)=> {
						console.log(logoUrl,res,"logoUrllogoUrllogoUrl");
						// _this.downLoadAll.compLogo = true;
						_this.src_compLogo = res.tempFilePath;
						var loginStatu = _this.getLoginStatus();
						if(!loginStatu || !_this.getAccessToken()){
						}else{//下载完成 并登陆的情况下，需要生成图片
							_this.toCreatSharePic();
						}
					},
					fail: e => {
						console.log('企业logo下载失败：' + e);
					}
				});
			},
			toCreatSharePic(){
				let _this=this;
				// this.src_compLogo = '';
				_this.sys = uni.getSystemInfoSync();
				rpx = _this.sys.windowWidth / 750;
				let ctx = uni.createCanvasContext('iCanvas', _this);
				//背景图
				ctx.drawImage("../../static/index/shareBgNew.png", 0*rpx, 0*rpx,840*rpx, 672*rpx);
				//logo
				ctx.drawImage(_this.src_compLogo, 120*rpx, 116*rpx,160*rpx, 160*rpx);
				//公司名称
				ctx.font = "bold 30rpx Arial";
				let str = _this.detailList.compInfo.abbr.length>7?(_this.detailList.compInfo.abbr.slice(0,7)+'...'):_this.detailList.compInfo.abbr;
				// ctx.setFontSize(60*rpx);
				ctx.setFillStyle("#8C8C8C");
				ctx.fillText(str, 336*rpx,172*rpx);
				
				//地址图片
				ctx.drawImage("../../static/icos/position.png", 336*rpx, 230*rpx,30*rpx, 38*rpx);
				//公司地址
				let address = _this.detailList.compInfo.address.length>7?(_this.detailList.compInfo.address.slice(0,7)+'...'):_this.detailList.compInfo.address;
				ctx.setFontSize(48*rpx);
				ctx.setFillStyle("#BFBFBF"); 
				ctx.fillText(address, 366*rpx,270*rpx);
				
				//职位
				ctx.font = "bold 30rpx Arial";
				let job = _this.detailList.name.length>13?(_this.detailList.name.slice(0,13)+'...'):_this.detailList.name;
				// ctx.setFontSize(60*rpx);
				ctx.setFillStyle("#000000");
				ctx.fillText(job, 100*rpx,396*rpx);
				//薪资
				ctx.font = "bold 30rpx Arial";
				let salary = _this.detailList.salary;
				// ctx.setFontSize(60*rpx);
				ctx.setFillStyle("#F06262");
				ctx.fillText(salary, 100*rpx,480*rpx);
				// 线条
				ctx.setStrokeStyle('#000000');
				ctx.setLineWidth(1 * rpx);
				ctx.moveTo(40 * rpx, 522 * rpx);
				ctx.lineTo(800 * rpx, 522 * rpx);
				ctx.stroke();
				//底部
				let bttom = "团队牛人多，扁平化管理，弹性";
				ctx.setFontSize(40*rpx);
				ctx.setFillStyle("#9E9E9E");
				ctx.fillText(bttom, 100*rpx,586*rpx);
				
				ctx.draw(true);
				setTimeout(function() {
						uni.canvasToTempFilePath({
						  x: 0*rpx,
						  y: 0*rpx,
						  width: 840*rpx,
						  height: 672*rpx,
						  destWidth: 840,
						  destHeight: 672,
						  canvasId: 'iCanvas',
						  success(res) {
							console.log(res.tempFilePath,"生成分享图片的路径成功");
							_this.tempFilePath = res.tempFilePath;
							// 预览图片
							// uni.previewImage({
							// 	urls: [res.tempFilePath],
							// 	success: function(res) {
							// 		uni.hideLoading();
							// 	}
							// });
						  },
						  fail:(res)=>{
							  console.log(res,99)
						  },
						  complete(){
							  _this.$emit('closeCardPic',false);
						  }
					},_this)
				}, 300);
				
			},
			toLoginShare(){
				this.unirequest({
					url: '/position/share',
					data:{
						loginType:this.loginType,
						positionId: this.id,//职位id
						shardId:this.shareId
					},
					success: res => {
						if(res){
							this.shareId = res;
							console.log("分享id",this.shareId);
							//打开插入的分享页
							let title = this.detailList.compInfo.abbr+" 正在招聘 "+this.detailList.name+" 【"+this.detailList.salary+"】";
							uni.navigateTo({
								url: '../toSharePic/toSharePic?title='+title+'&imageUrl='+this.tempFilePath+'&shareId='+this.shareId+'&id='+this.id,
							});
						}else{
							var loginStatu = this.getLoginStatus();
							if(!res && !loginStatu){
								console.log("请求中未登录2222")
								uni.navigateTo({url: '../../pages/login'});
							}
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			getDate(){
				let _this = this;
				_this.unirequest({
					url: '/position/detail',
					data:{
						id:_this.id,
						shareId:_this.shareId
					},
					success: res => {
						if(res){
							console.log(res,"resss")
							_this.detailList = res;
							_this.loginType = res.loginType;
							if(res.loginType == 2){
								_this.isMe = true;
							}else{
								_this.isMe = false;
							}
							_this.downLoadLogo(res.compInfo.logo);
						}else{
							var loginStatu = _this.getLoginStatus();
							if(!res && !loginStatu){
								console.log("请求中未登录1111")
								uni.navigateTo({url: '../../pages/login'});
							}
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			toCompyDetail(){
				let json = {};
				if(this.detailList.compInfo){
					json = this.detailList.compInfo;
				}else{
					json={};
				}
				uni.setStorageSync("compyDetail",json);
				uni.navigateTo({
					url: '../compyDetail/compyDetail'
				});
			},
			inpushFn(){//我要内推
				var loginStatu = this.getLoginStatus();
				if(!loginStatu){
					uni.navigateTo({url: '../../pages/login'});
					return;
				}
				uni.navigateTo({url: '../inpushResume/inpushResume?positionId=' + this.detailList.id});
			},
			sendResume(){//投递简历
				var loginStatu = this.getLoginStatus();
				console.log(loginStatu,"loginStatuloginStatu");
				if(!loginStatu || !this.getAccessToken()){
					uni.navigateTo({url: '../../pages/login'});
					return;
				}
				uni.navigateTo({url: '../throwResume/throwResume?positionId=' + this.detailList.id+'&shareId='+this.shareId});
				
			}
		},
		onShareAppMessage(res) {//shareId
			// var loginStatu = this.getLoginStatus();
			// if(!loginStatu || !this.getAccessToken()){
			// 	uni.navigateTo({url: '../../pages/login'});
			// 	return false;
			// }
			// let _this = this;
			
			// _this.unirequest({
			// 	url: '/position/share',
			// 	data:{
			// 		loginType:_this.loginType,
			// 		positionId: _this.id,//职位id
			// 		shardId:_this.shareId
			// 	},
			// 	success: res => {
			// 		if(res){
			// 			console.log("分享id",this.shareId);
			// 			_this.shareId = res;
			// 			
			// 			
			// 			console.log(_this.shareId,"_this.id",_this.id,"_this.id")
			// 			
			// 		}else{
			// 			var loginStatu = _this.getLoginStatus();
			// 			if(!res && !loginStatu){
			// 				console.log("请求中未登录2222")
			// 				uni.navigateTo({url: '../../pages/login'});
			// 			}
			// 		}
			// 	},
			// 	fail:e=>{
			// 		console.log(e);
			// 	}
			// });
			// 
			// console.log(_this.shareId,"_this.id",_this.id,"_this.id222")
			// return {
			// 	title: _this.detailList.compInfo.abbr+" 正在招聘 "+_this.detailList.name+" 【"+_this.detailList.salary+"】",
			// 	imageUrl:_this.tempFilePath,
			// 	path: '/components/jobDetail/jobDetail?shareId='+_this.shareId+'&id='+_this.id,
			// };
		}
	}
</script>

<style lang="scss">
.canvas-class{
	width:840upx;
	height:672upx;
	position:absolute;
	left:0;
	top:0;
}
.pageContain{
	padding-bottom:180upx;
	.moneyBox{
		height:131upx;
		width:100%;
		background:white;
		.moneyImg{
			width:79upx;
			height:79upx;
			margin:24upx 20upx 0 40upx;
			float:left;
		}
		.moneyDeatilBox{
			float:left;
			padding-top:24upx;
			.moneydetail{
				font-size:34upx;
				color:#F80080;
				font-weight:bolder;
			}
			.moneyMess{
				font-size:24upx;
				color:rgba(0,0,0,0.45);
				margin-top:10upx;
			}
		}
	}
	.otherMoneyBox{
		height:141upx;
		width:100%;
		background:white;
		.otherPeopHerder{
			width:60upx;
			height:60upx;
			margin:40upx 22upx 0 40upx;
			float:left;
		}
		.nameAndCompy{
			width:450upx;
			float:left;
			margin-top:40upx;
			.otherName{
				font-size:26upx;
				font-weight:bolder;
			}
			.otherCompy{
				width:100%;
				font-size:20upx;
				color:rgba(0,0,0,0.85);
				margin-top:12upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
		.isMess{
			float:right;
			margin-right:40upx;
			margin-top:57upx;
			font-weight:bolder;
			font-size:26upx;
			color:rgba(0,0,0,0.85);
		}
	}
	.jobNameBox{
		width:100%;
		height:400upx;
		background: white;
		padding:40upx;
		box-sizing: border-box;
		margin-top:20upx;
		.eachType{
			line-height:60upx;
			font-size:28upx;
			display:table;
			wdith:100%;
			.eachTypeLabel{
				float:left;
				color:rgba(0,0,0,0.65)
			}
			.eachTypeValue{
				float:left;
				font-weight: 600;
			}
		}
		.jobNameBoxLeft{
			width:500upx;
			// display:inline-block;
			float:left;
			.jobName{
				margin-top:10upx;
				font-size:40upx;
				font-weight:bolder;
				overflow:hidden; //超出的文本隐藏
				text-overflow:ellipsis; //溢出用省略号显示
				white-space:nowrap; //溢出不换行
			}
			.jobMess{
				font-size:24upx;
				margin-top:30upx;
				color:rgba(0,0,0,0.65);
				.jobMoney{
					display:inline-block;
					color:#F80080;
				}
			}
		}
		.jobNameBoxRight{
			padding-top:20upx;
			float:right;
			font-size:34upx;
			font-weight:bolder;
			color:#F80080;
		}
	}
	.box-contain{
		width:100%;
		margin-top:20upx;
		background:white;
		padding:40upx;
		box-sizing: border-box;
		.box-contain-header{
			width:100%;
			height:80upx;
			display:flex;
			.detailImg{
				width:44upx;
				height:44upx;
			}
			.box-contain-header-name{
				font-size:36upx;
				margin:-5upx 0 0 10upx;
			}
		}
		.box-contain-body{
			.eachCompy{
				width:100%;
				height:180upx;
				background:rgba(247,247,247,1);
				border:1px solid rgba(0,0,0,0.1);
				display:flex;
				margin-top:20upx;
				.componyLogo{
					width:120upx;
					height:120upx;
					margin:30upx;
				}
				.eachCompyCenter{
					width:420upx;
					margin:30upx 10upx 0 10upx;
					.eachCompyName{
						width:100%;
						font-size:32upx;
						color:rgba(0,0,0,0.85);
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
					}
					.eachCompyDetail{
						font-size:24upx;
						color:rgba(0,0,0,0.65);
						overflow:hidden; //超出的文本隐藏
						text-overflow:ellipsis; //溢出用省略号显示
						white-space:nowrap; //溢出不换行
						margin-top:35upx;
					}
				}
				.toRight{
					padding-top:65upx;
					color:rgba(0,0,0,0.55);
				}
			}
		}
		.box-contain-body-detail{
			font-size:28upx;
			color:rgba(0,0,0,0.45);
			line-height:40upx;
		}
	}
	.footer{
		width:100%;
		height:140upx;
		padding:20upx 40upx 0 40upx;
		position:fixed;
		left:0;
		bottom: 0;
		background:#FBFCFB;
		.shareIsLogin{
			position:absolute;
			width:325upx;
			height:100upx;
			border-radius:4px;
		}
		.shareJob{
			width:325upx;
			height:100upx;
			font-size:32upx;
			font-weight:bolder;
			border-radius:4px;
			text-align:center;
			line-height:100upx;
			float:left;
		}
		.shareJob1{
			border:1px solid rgba(32,58,210,1);
			color:#203AD2;
			background:rgba(32,58,210,0.1);
		}
		.shareJob2{
			border:1px solid rgba(32,58,210,1);
			color:white;
			background:linear-gradient(270deg,rgba(67,26,255,1) 0%,rgba(32,58,210,1) 100%);
			margin-left:20upx;
		}
	}
	.feed-bottom-view-IPX {
	  /* iPhone X 内容往上偏移 34px */
	  padding-bottom: 34px;
	}
}
.bottom-view-IPX{
	padding-bottom:260upx;
}
.hasSend{
	width:670upx;
	height:100upx;
	background:#000000;
	color:rgba(0,0,0,0.45);
	font-size:32upx;
	font-weight:400;
	border:1px solid rgba(0,0,0,0.25);
	margin:20upx 0 0 0;
	line-height:100upx;
}
</style>
