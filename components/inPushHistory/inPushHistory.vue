<template>
	<view>
		<view class="fast-search-box fast-search-box-relative">
			<view class="each-fast-tab each-fast-tab2" :class="activeTab==index?' activeTab':''"
				v-for="(item,index) in searchTab" :key="index" @tap="toFastSearch" :data-index="index">
				{{item.title}}
				<view class="bottom-line" v-if="activeTab==index"></view>
			</view>
		</view>
		<view class="inpushHistoryBody" :style="{height:bodyHeight+'px'}">
			<scroll-view
				class="wxaSortPickerList"
				scroll-y="true"
				style="height:100%;"
				@scrolltolower="scrollToLower"
			>
				<view class="eachHistoryBox">
					<view class="jobLeft">
						<view class="jobInName">张三丰</view>
						<view class="inJobDetailBox">
							<view class="inJobTitle">应聘职位</view>
							<view class="inJobDetail">需求分析师</view>
						</view>
						<view class="inJobDetailBox">
							<view class="inJobTitle">奖励</view>
							<view class="inJobDetail">内推成功后，奖励5000元</view>
						</view>
					</view>
					<view class="jobStatus jobStatusSucc">
						已转正
					</view>
				</view>
			
				<uniLoadMore :loadingType="loadingType" :contentText="contentText"></uniLoadMore>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '../uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				rpx:1,
				bodyHeight:0,
				topHeight:0,
				searchTab:[{title:"成功入职"},{title:"未入职"}],
				activeTab:0,
				
				listArray:[],
				pageNum:0,
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
			}
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.rpx = res.windowWidth / 750;
					this.topHeight = (102+20) * this.rpx;
					this.bodyHeight = res.windowHeight - this.topHeight;
				}
			});
		},
		onShow() {
			let initEnter = uni.getStorageSync("initPushHistory");
			
			if(initEnter == 1){//从详情中返回的 页面不作处理
				
			}else{//初始化进来的
				this.listArray = [];
				this.pageNum = 0;
				// this.userInfo = this.getGlobalUser();
				this.getDate();
			}
			uni.setStorageSync("initPushHistory",2);
		},
		methods: {
			toFastSearch(e){//快捷搜索点击
				var index = e.currentTarget.dataset.index;
				this.activeTab = index;
				console.log(index,"indexindex")
			},
			getDate(){
				let _this = this;
				_this.pageNum++;
				// _this.unirequest({
				// 	url: '',
				// 	data: {
				// 		pageNum: _this.pageNum,
				// 		pageSize: 10,
				// 	},
				// 	success: res => {
				// 		if(res){
				// 			console.log(res,"resss")
				// 			_this.listArray = _this.listArray.concat(res);
				// 			// _this.listDateArray = _this.listDateArray.concat(res);
				// 			_this.toDate();
				// 			if(res.length<10){
				// 				_this.loadingType = 2;
				// 			}else{
				// 				_this.loadingType = 0;
				// 			}
				// 		}else{
				// 			var loginStatu = this.getLoginStatus();
				// 			if(!res && !loginStatu){
				// 				console.log("请求中未登录")
				// 				uni.navigateTo({url: '../../pages/login'});
				// 			}
				// 		}
				// 	},
				// 	fail:e=>{
				// 		console.log(e);
				// 	}
				// });
			},
			scrollToLower(){
				if(this.loadingType == 2)return;
				this.loadingType = 1;
				this.getDate();
			},
			toJobDetail(e){//职位详情
				uni.setStorageSync("initPushHistory",1);
				// let id =  e.currentTarget.dataset.id;//职位id
				// let isMe = true;//判断去详情是不是自己去的  还是分享进的详情页
				// uni.navigateTo({
				// 	url: '../../components/jobDetail/jobDetail?id=' + id+'&isMe='+isMe
				// });
			}
		}
	}
</script>

<style lang="scss">
.fast-search-box-relative{
	position:relative;
}
.inpushHistoryBody{
	margin-top:20upx;
	width:100%;
	background:white;
	overflow:auto;
	.eachHistoryBox{
		width:calc(100% - 80upx);
		margin:0 auto;
		height:220upx;
		padding:38upx 0 0 0;
		box-sizing: border-box;
		border-bottom:1px solid #E5E5E5;
		.jobLeft{
			width:550upx;
			float:left;
			.jobInName{
				color:#222222;
				font-size:34upx;
				font-weight:bolder;
				margin-bottom:20upx;
			}
			.inJobDetailBox{
				font-size:28upx;
				margin-top:20upx;
				.inJobTitle{
					float:left;
					width:120upx;
					margin-right:30upx;
					color:#999999;
				}
				.inJobDetail{
					color: #595959;
				}
			}
		}
		.jobStatus{
			float:right;
			padding:10upx 16upx;
			border-radius:22upx;
			font-size:24upx;
		}
		.jobStatusSucc{
			color:#0CBBA3;
			background:rgba(12,187,163,0.1);
		}
		.jobStatusLoad{
			background:rgba(255,167,33,0.1);
			color:#FFA721;
		}
		.jobStatusError{
			background:rgba(248,0,128,0.1);
			color:#F80080;
		}
		.jobStatusWating{
			background:rgba(143,142,144,0.2);
			color:#8F8E90;
		}
	}
}
</style>
