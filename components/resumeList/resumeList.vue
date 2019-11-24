<template>
	<view>
		<view class="fast-search-box fast-search-box-relative">
			<view class="each-fast-tab each-fast-tab2" :class="activeTab==index?' activeTab':''"
				v-for="(item,index) in searchTab" :key="index" @tap="toFastSearch" :data-index="index">
				{{item.title}}
				<view class="bottom-line" v-if="activeTab==index"></view>
			</view>
		</view>
		
		<view class="resumeListBody" :style="{height:bodyHeight+'px'}">
			<view class="eachReceiveResume">
				<view class="eachReceiveResumeTop">
					<view style="display:table;width:100%;">
						<view class="eachReceiveResumeTopName">张三封</view>
						<view class="eachReceiveResumeTopTime">6月13日</view>
					</view>
					<view style="margin-top:26upx;width:100%;">
						<view class="eachReceiveResumeTitle">应聘职位</view>
						<view class="eachReceiveResumeValue">需求分析师</view>
						<view class="status statusLoad">
							待处理
						</view>
					</view>
				</view>
				<view class="toCheckResume">
					查看简历
				</view>
			</view>
			
			<view class="eachReceiveResume">
				<view class="eachReceiveResumeTop">
					<view style="display:table;width:100%;">
						<view class="eachReceiveResumeTopName">张三封</view>
						<view class="eachReceiveResumeTopTime">6月13日</view>
					</view>
					<view style="margin-top:26upx;">
						<view class="eachReceiveResumeTitle">应聘职位</view>
						<view class="eachReceiveResumeValue">需求分析师</view>
						<view class="status statusError">
							不匹配
						</view>
					</view>
				</view>
				<view class="toCheckResume">
					查看简历
				</view>
			</view>
			<view class="eachReceiveResume">
				<view class="eachReceiveResumeTop">
					<view style="display:table;width:100%;">
						<view class="eachReceiveResumeTopName">张三封</view>
						<view class="eachReceiveResumeTopTime">6月13日</view>
					</view>
					<view style="margin-top:26upx;">
						<view class="eachReceiveResumeTitle">应聘职位</view>
						<view class="eachReceiveResumeValue">需求分析师</view>
						<view class="status statusSucc">
							匹配
						</view>
					</view>
				</view>
				<view class="toCheckResume">
					查看简历
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				rpx:1,
				bodyHeight:0,
				topHeight:0,
				searchTab:[{title:"待处理"},{title:"已处理"}],
				activeTab:0,
			}
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.rpx = res.windowWidth / 750;
					this.topHeight = 102 * this.rpx;
					this.bodyHeight = res.windowHeight - this.topHeight;
				}
			});
		},
		methods: {
			toFastSearch(e){//快捷搜索点击
				var index = e.currentTarget.dataset.index;
				this.activeTab = index;
				console.log(index,"indexindex")
			},
		}
	}
</script>

<style lang="scss">
.fast-search-box-relative{
	position:relative;
}
.resumeListBody{
	width:100%;
	overflow:auto;
	.eachReceiveResume{
		width:100%;
		height:253upx;
		background:white;
		padding:30upx 0 0 0;
		box-sizing: border-box;
		margin-top:20upx;
		.eachReceiveResumeTop{
			width:calc(100% - 40upx);
			border-bottom:1px solid #E5E5E5;
			height:142upx;
			margin-left:40upx;
			.eachReceiveResumeTopName{
				float:left;
				font-size:34upx;
				font-weight:bolder;
				color:#222222;
			}
			.eachReceiveResumeTopTime{
				float:right;
				color:rgba(0,0,0,0.65);
				font-size:26upx;
				margin-right:40upx;
			}
			.eachReceiveResumeTitle{
				float:left;
				font-size:28upx;
				color:#999999;
				margin-right:40upx;
			}
			.eachReceiveResumeValue{
				float:left;
				font-size:28upx;
				color:#595959;
				float:left;
			}
			.status{
				float:right;
				// padding:10upx 16upx;
				width:104upx;
				height:44upx;
				line-height:44upx;
				text-align:center;
				border-radius:22upx;
				font-size:24upx;
				margin:-15upx 40upx 0 0;
			}
			.statusSucc{
				color:#0CBBA3;
				background:rgba(12,187,163,0.1);
			}
			.statusLoad{
				background:rgba(255,167,33,0.1);
				color:#FFA721;
			}
			.statusError{
				background:rgba(248,0,128,0.1);
				color:#F80080;
			}
		}
		.toCheckResume{
			width:100%;
			text-align:center;
			line-height:80upx;
			font-size:28upx;
			color:#222222;
		}
	}
}
</style>
