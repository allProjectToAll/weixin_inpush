<template>
	<view class="shareHistory">
		<scroll-view
			class="wxaSortPickerList"
			scroll-y="true"
			style="height:100%;"
			@scrolltolower="scrollToLower"
		>
		<block v-for="(item,index) in listDateArray" :key="index">
			<view class="timeBox" v-if="item.isDate">{{item.time}}</view>
			<view class="eachResumeBox" v-else>
				<view class="eachResumeBoxTop">
					<view class="jobDetailBox">
						<view class="jobName">{{item.name}}</view>
						<view class="jobDetails"> {{item.location}} | {{item.workExpLabel}} | {{item.eduLabel}} | {{item.natureLabel}} | {{item.total}}人 </view>
					</view>
					<view class="moneyBox">
						<view class="money">奖{{item.reward}}</view>
						<view class="xzFw">{{item.salary}}</view>
					</view>
				</view>
				<view class="eachResumeBoxBottom">
					<view class="halfEachBottom">
						<image src="../../static/icos/sh2.png" class="btnImage"></image>
						{{item.shareNum}}
					</view>
					<view class="halfEachBottom halfEachBottom2">
						<image src="../../static/icos/sh1.png" class="btnImage"></image>
						{{item.visitNum}}
					</view>
				</view>
			</view>
		</block>
		
		<uniLoadMore :loadingType="loadingType" :contentText="contentText"></uniLoadMore>
		</scroll-view>
	</view>
</template>

<script>
	import uniLoadMore from '../uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				listArray:[],
				listDateArray:[],
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
		onShow() {
			let initEnter = uni.getStorageSync("initSharHistory");
			
			if(initEnter == 1){//从详情中返回的 页面不作处理
				
			}else{//初始化进来的
				this.listArray = [];
				this.pageNum = 0;
				// this.userInfo = this.getGlobalUser();
				this.getDate();
			}
			uni.setStorageSync("initSharHistory",2);
		},
		methods: {
			getDate(){
				let _this = this;
				_this.pageNum++;
				_this.unirequest({
					url: '/position/sharePaging',
					data: {
						pageNum: _this.pageNum,
						pageSize: 10,
					},
					success: res => {
						if(res){
							console.log(res,"resss")
							_this.listArray = _this.listArray.concat(res);
							// _this.listDateArray = _this.listDateArray.concat(res);
							_this.toDate();
							if(res.length<10){
								_this.loadingType = 2;
							}else{
								_this.loadingType = 0;
							}
						}else{
							var loginStatu = this.getLoginStatus();
							if(!res && !loginStatu){
								console.log("请求中未登录")
								uni.navigateTo({url: '../../pages/login'});
							}
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			toDate(){
				let arrayList = [];
				if(this.listArray && this.listArray.length>0){
					arrayList.push({isDate:true,time:this.listArray[0].shareTime.slice(0,10)})
				}
				for(let i=0;i<this.listArray.length;i++){
					if(i==0){
						arrayList.push(this.listArray[0]);
					}else{
						if(this.listArray[i].shareTime.slice(0,10) != this.listArray[i-1].shareTime.slice(0,10)){
							arrayList.push({isDate:true,time:this.listArray[i].shareTime.slice(0,10)});
							arrayList.push(this.listArray[i]);
						}else{
							arrayList.push(this.listArray[i]);
						}
					}
				}
				this.listDateArray = arrayList;
			},
			scrollToLower(){
				if(this.loadingType == 2)return;
				this.loadingType = 1;
				this.getDate();
			},
			toJobDetail(e){//职位详情
				uni.setStorageSync("initSharHistory",1);
				let id =  e.currentTarget.dataset.id;//职位id
				let isMe = true;//判断去详情是不是自己去的  还是分享进的详情页
				uni.navigateTo({
					url: '../../components/jobDetail/jobDetail?id=' + id+'&isMe='+isMe
				});
			}
		}
	}
</script>

<style lang="scss">
.shareHistory{
	.timeBox{
		width:100%;
		height:60upx;
		line-height:80upx;
		padding-left:40upx;
		box-sizing: border-box;
		color:#999999;
		font-size:24upx;
		font-weight:400;
	}
	.eachResumeBox{
		width:100%;
		height:245upx;
		background:white;
		margin-top:20upx;
		overflow: hidden;
		.eachResumeBoxTop{
			width:calc(100% - 40upx);
			height:140upx;
			margin:30upx 0 0 40upx;
			border-bottom: 1px solid #E5E5E5;
			.jobDetailBox{
				width:510upx;
				float:left;
				.jobName{
					width:100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-weight:600;
					color:rgba(0,0,0,0.85);
					font-size:34upx;
				}
				.jobDetails{
					color:rgba(0,0,0,0.65);
					font-weight:400;
					font-size:26upx;
					width:100%;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					margin-top:25upx;
					
				}
			}
			.moneyBox{
				float:right;
				margin-right:40upx;
				.money{
					color:#F80080;
					font-weight:600;
					font-size:34upx;
				}
				.xzFw{
					font-weight:400;
					color:rgba(0,0,0,0.65);
					font-size:26upx;
					margin-top:20upx;
				}
			}
		}
		.eachResumeBoxBottom{
			width:100%;
			.halfEachBottom{
				width:50%;
				float:left;
				display:flex;
				justify-content: center;
				align-items: center;
				color:#203AD2;
				font-weight:400;
				font-size:28upx;
				padding-top:22upx;
				.btnImage{
					width:32upx;
					height:32upx;
					display:inline-block;
					margin-right:5upx;
				}
			}
			.halfEachBottom2{
				color:#999999;
			}
		}
	}
}
</style>
