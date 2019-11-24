<template>
	<view class="toSuccess">
		<image src="../../static/icos/success.png" class="successImg"></image>
		<view class="succTitle">{{title}}</view>
		<view class="mess">{{mess1}}</view>
		<view class="mess">{{mess2}}</view>
		
		<button class="toHome btns" @tap="toHome">返回首页</button>
		<!-- <button class="toHome btns">返回首页</button> -->
		<button class="toOther btns" v-if="pushSuccess" @tap="toPushHistory">内推记录</button>
		<button class="toOther btns" v-else @tap="toSendHistory">投递记录</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title:"内推成功",
				mess1:"您的内推已发送至职位发布人",
				mess2:"可在“内推记录”中查看进展",
				// 您的内推已发送至职位邀请人 
				// 可在“投递记录”中查看进展
				
				pushSuccess:"isTrue",//内推成功  还是  投递成功
			}
		},
		onLoad(e) {
			console.log(e);
			if(e.pushSuccess == "isTrue"){
				this.pushSuccess = true;
				this.title = "内推成功";
				this.mess1= "您的内推已发送至职位发布人";
				this.mess2= "可在“内推记录”中查看进展";
			}else{
				this.pushSuccess = false;
				this.title = "投递成功";
				this.mess1= "您的内推已发送至职位邀请人";
				this.mess2= "可在“投递记录”中查看进展";
			}
		},
		methods: {
			toHome(){//首页
				uni.navigateTo({url: '../../pages/login'});
			},
			toPushHistory(){//内推记录
				uni.navigateTo({url: '../inPushHistory/inPushHistory'});
			},
			toSendHistory(){//投递记录
				uni.navigateTo({url: '../'});
			}
		}
	}
</script>

<style lang="scss">
.toSuccess{
	.successImg{
		width:200upx;
		height:200upx;
		margin:100upx auto 0;
		display:block;
	}
	.succTitle{
		width:100%;
		padding:50upx 0 20upx 0;
		text-align:center;
		font-size:40upx;
	}
	.mess{
		width:100%;
		font-size:28upx;
		text-align:center;
		color:#888888;
		margin-top:10upx;
	}
	.btns{
		width:calc(100% - 80upx);
		height:94upx;
		margin:0 auto;
		font-size:36upx;
		line-height:96upx;
		text-align:center;
		border-radius:10px;
		margin-top:30upx;
	}
	.toHome{
		background:linear-gradient(270deg,rgba(67,26,255,1) 0%,rgba(32,58,210,1) 100%);
		border:1px solid rgba(5,5,5,0.08);
		color:white;
	}
	.toOther{
		background:rgba(248,248,248,1);
		border:1px solid rgba(5,5,5,0.1);
	}
}
</style>
