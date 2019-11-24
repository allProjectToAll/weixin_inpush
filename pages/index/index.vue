<template>
	<view class="content">
		<!-- 头部 -->
		<view class="header-self">
			<view class="header-status" :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="page-header-title-box" :style="{ top: statusBarHeight + 'px' }">
				<image src="../../static/index/indexLogo.png" mode="" class="indexLogo"></image>
			</view>
		</view>
		<!-- 搜索 -->
		<view class="search-control" :style="{top: statusBarHeight + topHeight + 'px'}">
			<input class="search-input " type="text" @confirm="search" placeholder="搜索" @input="enterSearch" confirm-type="search" v-model="searchData" />
			<image src="../../static/icos/search.png" mode="aspectFit" class="i-sc-img"></image>
			<image src="../../static/icos/close.png" mode="aspectFit" class="i-sc-close" v-if="keyword != ''" @tap="clear"></image>
		</view>
		<!-- 快捷搜索 -->
		<view class="fast-search-box" :style="{top: statusBarHeight + topHeight + searchHeight + 'px'}">
			<view class="each-fast-tab each-fast-tab3" :class="activeTab==index?' activeTab':''"
				v-for="(item,index) in searchTab" :key="index" @tap="toFastSearch" :data-index="index">
				{{item.title}}
				<view class="bottom-line" v-if="activeTab==index"></view>
			</view>
		</view>
		<!-- 列表 -->
		<view class="list-box" :style="{top: statusBarHeight + topHeight + searchHeight + fastSearchHeight + 'px',height:windowHeight+'px'}">
			<scroll-view
				class="wxaSortPickerList"
				scroll-y="true"
				style="height:100%;"
				@scrolltolower="scrollToLower"
			>
				<view class="each-zw-list" v-for="(item,index) in listArray" :key="index" :data-id="item.id" @tap="toJobDetail">
					<view class="each-zw-list-left">
						<view class="each-zw-list-job">{{item.name}}</view>
						<view class="each-zw-list-detail">{{item.location}} | {{item.workExpLabel}} | {{item.eduLabel}} | {{item.natureLabel}} | {{item.total}}人</view>
					</view>
					<view class="each-zw-list-right">
						<view class="getMoney">奖{{item.reward}}</view>
						<view class="salary">{{item.salary}}</view>
					</view>
				</view>
				<uniLoadMore :loadingType="loadingType" :contentText="contentText"></uniLoadMore>
			</scroll-view>
		</view>
		
	</view>
</template>

<script>
	import uniLoadMore from '../../components/uni-load-more/uni-load-more.vue';
	export default {
		data() {
			return {
				statusBarHeight: 0,
				topHeight: 0,
				searchHeight:0,
				fastSearchHeight:0,
				rpx:1,
				searchData:"",
				keyword:"",
				// {title:"默认排序"},
				searchTab:[{title:"新发布"},{title:"分享多"},{title:"奖励多"}],
				activeTab:0,
				windowHeight:0,
				listArray:[],
				loadingType: 0,
				contentText: {
					contentdown: '上拉显示更多',
					contentrefresh: '正在加载...',
					contentnomore: '没有更多数据了'
				},
				//分页
				totalPage:0,
				pageNum:0,
				
				userInfo:{},
				currentSortKey:0,
				
			}
		},
		components: {
			uniLoadMore
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight;
					this.rpx = res.windowWidth / 750;
					this.topHeight = 94 * this.rpx;
					this.searchHeight = 90*this.rpx;
					this.fastSearchHeight = 102*this.rpx + 10;
					this.windowHeight = res.windowHeight - this.statusBarHeight - this.topHeight - this.searchHeight - this.fastSearchHeight;
				}
			});
		},
		onShow() {
			var loginStatu = this.getLoginStatus();
			console.log(loginStatu,this.getAccessToken(),"this.getAccessToken()")
			if(!loginStatu || !this.getAccessToken()){
				console.log("当前状态未登录")
				uni.navigateTo({url: '../login'});
				return;
			}else{
				this.getCompy();
			}
			let initEnter = uni.getStorageSync("initEnter");
			
			if(initEnter == 1){//从详情中返回的 页面不作处理
				
			}else{//初始化进来的
				this.listArray = [];
				this.keyword = '';
				this.searchData = '';
				this.activeTab = 0;
				this.currentSortKey = 0;
				this.pageNum = 0;
				this.userInfo = this.getGlobalUser();
				this.getDate();
			}
			uni.setStorageSync("initEnter",2);
			//从访客的“我的”里面跳转到当前页面，需要清除点击“我的”的记录
			uni.setStorageSync("toOtherMe", false);
			
		},
		methods: {
			getCompy(){
				this.unirequest({
					url: '/card/list',
					success: res => {
						console.log(res);
						if(res.compCardList.length == 0){//游客
							uni.navigateTo({url: '../otherIndex/otherIndex'});
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			enterSearch(){
				this.keyword = this.trim(this.searchData);
			},
			search(){
				if (this.keyword != null) { //查询
					this.listArray = [];
					this.pageNum = 0;
					this.getDate();
				}else{
					this.listArray = [];
				}
			},
			getDate(){//sortKey  ,0-新发布，1-分享多，2-奖励高
				let _this = this;
				_this.pageNum++;
				_this.unirequest({
					url: '/position/paging',
					data:{
						compId:_this.userInfo.compId,
						keywords:_this.keyword,
						pageNum:_this.pageNum,
						pageSize:20,
						sortKey:_this.currentSortKey,
					},
					success: res => {
						if(res){
							console.log(res,"resss")
							_this.listArray = _this.listArray.concat(res);
							if(res.length<20){
								_this.loadingType = 2;
							}else{
								_this.loadingType = 0;
							}
						}else{
							var loginStatu = this.getLoginStatus();
							if(!res && !loginStatu){
								console.log("请求中未登录")
								uni.navigateTo({url: '../login'});
							}
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			},
			clear(){
				this.keyword = '';
				this.searchData = '';
			},
			toFastSearch(e){//快捷搜索点击
				var index = e.currentTarget.dataset.index;
				this.activeTab = index;
				this.currentSortKey = index;
				this.pageNum = 0;
				this.listArray = [];
				this.getDate();
			},
			scrollToLower(){//滚动到底部
				if(this.loadingType == 2)return;
				this.loadingType = 1;
				this.getDate();
			},
			toJobDetail(e){//职位详情
				uni.setStorageSync("initEnter",1);
				let id =  e.currentTarget.dataset.id;//职位id
				let isMe = true;//判断去详情是不是自己去的  还是分享进的详情页
				uni.navigateTo({
					url: '../../components/jobDetail/jobDetail?id=' + id+'&isMe='+isMe
				});
			}
		}
	}
</script>

<style  lang="scss" scoped>
.content{
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
	.list-box{
		position:absolute;
		width:100%;
		box-sizing: border-box;
		padding:40upx;
		overflow:auto;
		background:white;
		.each-zw-list{
			width:100%;
			height:169upx;
			border-bottom:1px solid #E5E5E5;
			padding-top:29upx;
			box-sizing: border-box;
			.each-zw-list-left{
				width:500upx;
				float:left;
				.each-zw-list-job{
					width:100%;
					font-size:34upx;
					font-weight:bolder;
					overflow: hidden;/*超出部分隐藏*/
					white-space: nowrap;/*不换行*/
					text-overflow:ellipsis;/*超出部分文字以...显示*/
				}
				.each-zw-list-detail{
					width:100%;
					font-size:26upx;
					color:rgba(0,0,0,0.65);
					overflow: hidden;
					white-space: nowrap;
					text-overflow:ellipsis;
					margin-top:25upx;
				}
				// text-align:left;
			}
			.each-zw-list-right{
				float:right;
				text-align:right;
				.getMoney{
					font-size:34upx;
					font-weight:600;
					color:#F80080;
				}
				.salary{
					font-size:26upx;
					color:rgba(0,0,0,0.65);
					margin-top:20upx;
				}
			}
		}
	}
}
</style>
