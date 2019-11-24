<template>
	<view>
		<view class="fast-search-box fast-search-box-relative">
			<view class="each-fast-tab each-fast-tab2" :class="activeTab==index?' activeTab':''"
				v-for="(item,index) in searchTab" :key="index" @tap="toFastSearch" :data-index="index">
				{{item.title}}
				<view class="bottom-line" v-if="activeTab==index"></view>
			</view>
		</view>
		
		<view class="receiveResumeBody" v-if="waitForAsync" :style="{height:bodyHeight+'px'}">
			<scroll-view
				class="wxaSortPickerList"
				scroll-y="true"
				style="height:100%;"
				@scrolltolower="scrollToLower1"
			>
				<view class="eachReceiveResume" v-for="(item,index) in listArray1" :key="index">
					<view class="eachReceiveResumeTop">
						<view style="display:table;width:100%;">
							<view class="eachReceiveResumeTopName">{{item.name}}</view>
							<view class="eachReceiveResumeTopTime">{{getTime(item.createTime)}}</view>
						</view>
						<view style="margin-top:26upx;">
							<view class="eachReceiveResumeTitle">应聘职位</view>
							<view class="eachReceiveResumeValue">{{item.position.name}}</view>
						</view>
					</view>
					<view class="toCheckResume" @tap="checkResume" 
					:data-id="item.id" :data-positionid="item.position.id" :data-email="item.email" :data-name="item.name" 
					:data-mobile="item.mobile" :data-cvFileName="item.cvFileName" :data-cvUrl="item.cvUrl">
						查看简历
					</view>
				</view>
				<uniLoadMore :loadingType="loadingType1" :contentText="contentText1"></uniLoadMore>
			</scroll-view>
		</view>
		
		
		<view class="receiveResumeBody receiveResumeBody2"  v-if="!waitForAsync" :style="{height:bodyHeight+'px'}">
			<scroll-view
				class="wxaSortPickerList"
				scroll-y="true"
				style="height:100%;"
				@scrolltolower="scrollToLower2"
			>
				<view class="eachReceiveResume" v-for="(item,index) in listArray2" :key="index">
					<view class="eachReceiveResumeTop">
						<view style="display:table;width:100%;">
							<view class="eachReceiveResumeTopName">{{item.name}}</view>
							<view class="eachReceiveResumeTopTime">{{getTime(item.createTime)}}</view>
						</view>
						<view style="margin-top:26upx;">
							<view class="eachReceiveResumeTitle">应聘职位</view>
							<view class="eachReceiveResumeValue">{{item.position.name}}</view>
							<view class="statusFor statusWating" v-if="item.status==0">待投递</view>
							<view class="statusFor statusLoad" v-if="item.status==1">待处理</view>
							<view class="statusFor statusSucc" v-if="item.status==2">匹配</view>
							<view class="statusFor statusError" v-if="item.status==3">不匹配</view>
						</view>
					</view>
				</view>
				<uniLoadMore :loadingType="loadingType2" :contentText="contentText2"></uniLoadMore>
			</scroll-view>
		</view>
	</view>
</template>

<script>
import uniLoadMore from '../uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				waitForAsync:true,
				rpx:1,
				bodyHeight:0,
				topHeight:0,
				searchTab:[{title:"待内推"},{title:"已内推"}],
				activeTab:0,
				
				listArray1:[],
				pageNum1:0,
				loadingType1: 0,
				contentText1: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				
				listArray2:[],
				pageNum2:0,
				loadingType2: 0,
				contentText2: {
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
					this.topHeight = 102 * this.rpx;
					this.bodyHeight = res.windowHeight - this.topHeight;
				}
			});
		},
		onShow() {
			let initPage = uni.getStorageSync("receivedResume");
			if(initPage == "2"){//通过点击查看简历回退回来的 不做处理
				
			}else{
				this.activeTab = 0;
				this.waitForAsync = true;
				this.listArray1 = [];
				this.pageNum1 = 0;
				this.loadingType1 = 0;
				this.getDate1();
			}
		},
		methods: {
			getTime(time){
				if(time){
					return time.split(" ")[0];
				}else{
					return "";
				}
			},
			toFastSearch(e){//快捷搜索点击
				var index = e.currentTarget.dataset.index;
				this.activeTab = index;
				if(index == 0){
					uni.setStorageSync("receivedResume",1);
					this.waitForAsync = true;
					this.listArray1 = [];
					this.pageNum1 = 0;
					this.loadingType1 = 0;
					this.getDate1();
					
				}else{
					this.waitForAsync = false;
					this.listArray2 = [];
					this.pageNum2 = 0;
					this.loadingType2 = 0;
					this.getDate2();
				}
			},
			getDate1(){
				let _this = this;
				_this.pageNum1++;
				_this.unirequest({
					url: '/position/pendingPaging',
					data: {
						pageNum: _this.pageNum1,
						pageSize: 10,
					},
					success: res => {
						if(res){
							console.log(res,"resss")
							_this.listArray1 = _this.listArray1.concat(res);
							if(res.length<10){
								_this.loadingType1 = 2;
							}else{
								_this.loadingType1 = 0;
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
			getDate2(){
				let _this = this;
				_this.pageNum2++;
				_this.unirequest({
					url: '/position/pushedPaging',
					data: {
						pageNum: _this.pageNum2,
						pageSize: 10,
					},
					success: res => {
						if(res){
							console.log(res,"resss")
							_this.listArray2 = _this.listArray2.concat(res);
							if(res.length<10){
								_this.loadingType2 = 2;
							}else{
								_this.loadingType2 = 0;
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
			scrollToLower1(){
				if(this.loadingType1 == 2)return;
				this.loadingType1 = 1;
				this.getDate1();
			},
			scrollToLower2(){
				if(this.loadingType2 == 2)return;
				this.loadingType2 = 1;
				this.getDate2();
			},
			checkResume(e){//查看简历			
				// let id = e.currentTarget.dataset.id;
				let id = e.currentTarget.dataset.id;
				let email = e.currentTarget.dataset.email;
				let name = e.currentTarget.dataset.name;
				let mobile = e.currentTarget.dataset.mobile;
				let cvFileName = e.currentTarget.dataset.cvfilename;
				let cvUrl = e.currentTarget.dataset.cvurl;
				uni.setStorageSync("receivedResume",2);
				uni.navigateTo({url: '../resumeDetail/resumeDetail?id='+id+'&email='+email+'&name='+name
				+'&mobile='+mobile+'&cvFileName='+cvFileName+'&cvUrl='+cvUrl});
			}
			
		}
	}
</script>

<style lang="scss">
.fast-search-box-relative{
	position:relative;
}

.receiveResumeBody{
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
.receiveResumeBody2{
	padding-top:20upx;
	box-sizing: border-box;
	.eachReceiveResume{
		margin-top:0;
		height:175upx;
		.statusFor{
			float:right;
			margin:-15upx 40upx 0 0;
		}
	}
}
</style>
