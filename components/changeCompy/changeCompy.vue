<template>
	<!-- 作为组件切换公司  用在登录上面 -->
	<view class="changeCompy">
		<view class="titleBox">当前手机号经多个企业认证，请选择默认企业</view>
		<radio-group @change="radioChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in compyList" :key="index">
				<view class="eachCompyBox">
					<view class="eachCompy">
						<radio :value="item.compId" color="#203AD2" :checked="index === currentIndex" class="radios" />
						<view>{{item.compName}}</view>
					</view>
				</view>
			</label>
		</radio-group>
		
		<view class="titleBox">登录成功后，可至 <view class="inline">“我的”-“切换企业”</view> 进行默认企业的切换。</view>
		
		<view class="bottomBox">
			<button class="loginBtn" :class="current?'':'disableds'" :disabled="!current" @tap="sureClick">确定</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: "",
				currentIndex:"",
			}
		},
		props:{
			compyList:Array,
		},
		methods: {
			radioChange(evt) {
				for (let i = 0; i < this.compyList.length; i++) {
					if (this.compyList[i].compId === evt.target.value) {
						this.current = this.compyList[i].compId;
						this.currentIndex = i;
						break;
					}
				}
			},
			sureClick(){
				this.setGlobalUser(this.compyList[this.currentIndex]);
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
.changeCompy{
	padding-bottom: 150upx;
	.titleBox{
		width:100%;
		height:80upx;
		// padding-left:40upx;
		box-sizing: border-box;
		font-size:28upx;
		color:#888888;
		// line-height:80upx;
		padding:30upx 40upx;
		line-height:40upx;
		.inline{
			display:inline-block;
			color:#000000;
		}
	}
	.eachCompyBox{
		width:100%;
		height:87upx;
		padding-left:40upx;
		box-sizing: border-box;
		background:white;
		.eachCompy{
			width:100%;
			height:98%;
			border-bottom:1px solid #E5E5E5;
			// padding-top:20upx;
			font-size:34upx;
			line-height:80upx;
			.radios{
				float:left;
				margin-right:10upx;
			}
		}
	}
	.bottomBox{
		width:100%;
		height:140upx;
		background:#FBFCFB;
		position:fixed;
		left:0;
		bottom: 0;
		.loginBtn{
			border-radius:10upx;
			color:white;
			width:calc(100% - 80upx);
			height:100upx;
			line-height:94upx;
			text-algn:center;
			margin-top:20upx;
			background:linear-gradient(270deg,rgba(67,26,255,1) 0%,rgba(32,58,210,1) 100%);
		}
		.disableds{
			background:#999999;
		}
		// border-top:1px solid #
	}
}
.eachCompy:last-child{
	border-bottom:none;
}
</style>
