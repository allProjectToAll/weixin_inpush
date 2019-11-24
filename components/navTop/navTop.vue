<template>
	<view>
		<view class="nav_top" :class={bgColor:hasBgc} :style="{height:headHeight+'px'}">
			<view class="statusBar" :style="{height:statusBarHeight+'px'}"></view>
			<view class="topContent">
				<view v-if="isBack" class="goBack" @click="goBack(backUrl)" hover-class="bgBlack999">
					<!-- <image src="../static/back.png" mode=""></image> -->
				</view>
				<view class="title">{{title}}</view>
			</view>
		</view>
		<view v-if="isHeight" class="marginBox" :style="{height:headHeight+'px'}"></view>
	</view>
</template>
 
<script>
	export default {
		props:{
			title:{
				type:String,
				default:'自定义头部'
			},
			hasBgc:{   //有背景色
				type:Boolean,
				default:false
			},
			isBack:{   //是否有返回箭头
				type: Boolean,
				default:false
			},
			isHeight:{   //头部撑开高度
				type:Boolean,
				default:true
			},
			isNavBack:{   //固定返回前面的页面
				type:Boolean,
				default:true
			},
			backUrl:{    //返回到指定页面
				type:String,
				default:'index'
			},
			backNum:{   //返回几个页面
				type:Number,
				default:1
			}
		},
		data() {
			return {
				statusBarHeight:'',
				headHeight:''
			};
		},
		methods:{
			goBack(url){
				if(this.isNavBack){
					const that = this
					uni.navigateBack({
						delta:that.backNum
					})
				}else{
					var isUrl = `/pages/${url}/${url}`
					uni.redirectTo({
						url: isUrl
					})
				}
			}
		},
		created() {
			const system = uni.getSystemInfoSync()
			this.statusBarHeight = system.statusBarHeight || 25
			this.headHeight = (system.statusBarHeight || 25) + 45//可调整
		}
	}
</script>
 
<style lang="scss" scoped>
	
.nav_top{
		width: 100vw;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 900;
		display: flex;
		flex-direction: column;
		background-color: transparent;
		&.bgColor{
			// background-color: #5FCBAD;
		}
		.topContent{
			width: 100vw;
			height: 45px;//可调整
			position: relative;
			.goBack{
				position: absolute;
				top: 0;
				left: 0;
				width: 10vw;
				height: 100%;
				display: flex;
				align-items: center;
				padding-left: 20upx;
				box-sizing: border-box;
				image{
					width: 40upx;
					height: 42upx;
				}
			}
			.title{
				width: 100%;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				// color: #fff;
				font-size: 40upx;
			}
		}
	}
	.marginBox{
		
	}
</style>