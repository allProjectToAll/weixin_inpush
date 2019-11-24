<template>
	<view class="loginPage" :style="{height:windowHeight+'px'}">
		<image src="../static/icos/loginBg.png" class="loginBg"></image>
		<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="loginBtn">授权登录</button>
		<changeCompy :compyList="compyList" v-if="compyAsync" class="changeCompy"></changeCompy>
	</view>
</template>

<script>
	import changeCompy from '@/components/changeCompy/changeCompy'
	export default {
		data() {
			return {
				code:"",
				compyList:[],
				compyAsync:false,
				windowHeight:"",
			}
		},
		components:{
			changeCompy
		},
		onLoad() {
			wx.getSystemInfo({
			  success: res=> {
				this.windowHeight = res.windowHeight;
			  }
			})
		},
		onShow(){
			uni.setNavigationBarTitle({title: '登录'});
			this.toLogin();
		},
		methods: {
			toLogin(){
				let _this = this;
				uni.login({
					provider: 'weixin',
					success(loginResult) {
						// uni.showLoading({
						// 	title: '登录中...'
						// });
						_this.code = loginResult.code;
						
					}
				})
			},
			getPhoneNumber(e){
				console.log(e);
				if(!e.detail.encryptedData){
					return;
				}
				let encryptedData = e.detail.encryptedData;
				let iv = e.detail.iv;
				let _this = this;
				_this.unirequest({
					url: '/wx/loginByMobile',
					data: {
						code: _this.code,
						encryptedData: encryptedData,
						iv: iv
					},
					success: res => {
						console.log(res);
						uni.setStorageSync(_this.ACCESS_TOKEN, res);
						_this.changeLoginStatus(true);
						uni.showToast({
							title: '登录成功',
							duration: 1000
						});
						_this.getCompy();
						
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			getCompy(){
				this.unirequest({
					url: '/card/list',
					success: res => {
						console.log(res);
						if(res.compCardList.length == 0){//游客
							uni.navigateTo({url: './otherIndex/otherIndex'});
						}else if(res.compCardList.length == 1){//一个企业
							this.setGlobalUser(res.compCardList[0]);
							uni.navigateBack();
						}else if(res.compCardList.length > 1){//多个企业
							this.compyAsync = true;
							uni.setNavigationBarTitle({title: '选择企业'});
							this.compyList = res.compCardList;
						}
						
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			cancel(){
				uni.navigateBack();
			}
		}
	}
</script>

<style lang="scss">
.loginPage{
	width:100%;
	background:white;
	.loginBg{
		width:750upx;
		height:860upx;
		margin-top:30upx;
	}
	.loginBtn{
		background:#1AAD19;
		border-radius:10upx;
		color:white;
		width:calc(100% - 80upx);
		height:94upx;
		line-height:94upx;
		text-algn:center;
		margin-top:-225upx;
	}
	.changeCompy{
		position: fixed;
		left:0;
		top:0;
		width:100%;
		height:100%;
		background:#F8F8F7;
	}
}
	
</style>
