<template>
	<view class="otherInder" :class="isIPX ? 'bottom-view-IPX' : ''">
		<!-- 头部 -->
		<view class="header-self">
			<view class="header-status" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="page-header-title-box" :style="{ top: statusBarHeight + 'px' }">
				<image src="../../static/index/indexLogo.png" mode="" class="indexLogo"></image>
			</view>
		</view>
		
		<careResume class="careResumeClass" v-if="isIndex" :isIndex="isIndex" :style="{top: statusBarHeight + topHeight + 'px',height: componentsHeight + 'px'}"></careResume>
		<meComponent class="careResumeClass" v-else :isIndex="isIndex" :otherMy="isOtherTrue" :style="{top: statusBarHeight + topHeight + 'px',height: componentsHeight + 'px'}"></meComponent>
		
		
		<view :class="isIPX ? 'footer feed-bottom-view-IPX' : 'footer'">
			<view class="halfFooter" data-index="1" @tap="changeTab">
				<image src="../../static/tabBarIco/zw1.png" class="btnImage" v-if="isIndex"></image>
				<image src="../../static/tabBarIco/zw2.png" class="btnImage" v-else></image>
				<view class="bottomName" :class="isIndex?'activeBtn':''">职位</view>
			</view>
			<view class="halfFooter" data-index="2" @tap="changeTab">
				<image src="../../static/tabBarIco/me1.png" class="btnImage" v-if="!isIndex"></image>
				<image src="../../static/tabBarIco/me2.png" class="btnImage" v-else></image>
				<view class="bottomName" :class="!isIndex?'activeBtn':''">我的</view>
			</view>
		</view>
	</view>
</template>

<script>
	import careResume from '../../components/careResume/careResume'
	import meComponent from '../my/meComponent.vue'
	export default {
		data() {
			return {
				statusBarHeight: 0,
				topHeight: 0,
				componentsHeight:0,
				footerHeight:0,
				isIPX:false,
				
				isIndex:true,//判断初始化 是职位菜单
				isOtherTrue:"isOtherTrue",//判断 给子组件高度设定
				
				toMe:false,//为true需要跳转到“我的”里面
			}
		},
		components:{
			careResume,
			meComponent
		},
		onShow() {
			let toOtherMe = uni.getStorageSync("toOtherMe");
			console.log(this.toMe,this.isIndex,toOtherMe,"this.toMe");
			if(toOtherMe){//已经点击过“我的”按钮
				if(this.toMe){
					this.isIndex = false;
				}
			}else{//没有点击“我的”
				if(!this.toMe){//不需要跳转到"我的"
					if(this.isIndex == true){//已经试“职位”的菜单，刷新一下当前职位的菜单
						console.log(111)
						this.isIndex = false;
						console.log(222)
						this.isIndex = true;
					}else{
						console.log(99999)
					}
				}else{//需要跳转到“我的”
					this.isIndex = false;
					uni.setStorageSync("toOtherMe", true);
				}
			}
			
		},
		onLoad(e) {
			wx.getSystemInfo({
			  success: res=> {
				//判断是否是iphonx
				if (res.model.search('iPhone X') != -1) {
				  this.isIPX = true;
				}
				this.statusBarHeight = res.statusBarHeight;
				this.rpx = res.windowWidth / 750;
				this.topHeight = 94 * this.rpx;
				if(this.isIPX){
					this.footerHeight = 134*this.rpx;
				}else{
					this.footerHeight = 100*this.rpx;
				}
				this.componentsHeight = res.windowHeight - this.statusBarHeight - this.topHeight - this.footerHeight;
			  }
			})
			if(e && e.isIndex=="isFalse"){//不仅如此主页 进入“我的”里面  e.isIndex和this.isIndex不是同一个东西
				this.toMe = true;
			}else{
				this.toMe = false;
			}
		},
		methods: {
			changeTab(e){
				console.log(e.currentTarget.dataset.index);
				if(e.currentTarget.dataset.index == 1){
					this.isIndex = true;
					uni.setStorageSync("toOtherMe", false);
				}else{
					this.isIndex = false;
					uni.setStorageSync("toOtherMe", true);
				}
			}
		}
	}
</script>

<style lang="scss">
.otherInder{
	width:100%;
	height:100%;
	.page-header-title-box{
		box-sizing: border-box;
		padding-left:40upx;
		font-size:40upx;
		font-weight:bolder;
		.tui-color{
			color:#200BFF;
		}
		.indexLogo{
			width:214upx;
			height:65upx;
		}
	}
	.careResumeClass{
		width:100%;
		position:absolute;
		left:0;
	}
	
	
	.footer{
		width:100%;
		height:100upx;
		position:fixed;
		left:0;
		bottom: 0;
		background:#FBFCFB;
		.halfFooter{
			width:50%;
			float:left;
			.btnImage{
				width:54upx;
				height:54upx;
				display:block;
				margin:10upx auto 7upx;
			}
			.bottomName{
				width:100%;
				text-align:center;
				font-size:20upx;
				font-weight:400;
				color:#C8C7CD;
			}
			.activeBtn{
				color:#203AD2;
			}
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
</style>
