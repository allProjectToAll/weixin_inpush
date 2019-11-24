<template>
	<view class="careResumeList">
		<view class="fast-search-box fast-search-box-relative" >
			<view class="each-fast-tab each-fast-tab2" :class="activeTab==index?' activeTab':''"
				v-for="(item,index) in searchTab" :key="index" @tap="toFastSearch" :data-index="index">
				{{item.title}}
				<view class="bottom-line" v-if="activeTab==index"></view>
			</view>
		</view>
		<view class="list-box" :style="{height:windowHeight+'px'}" v-if="asyncNum1" >
			<scroll-view
				class="wxaSortPickerList"
				scroll-y="true"
				style="height:100%;"
				@scrolltolower="scrollToLower1"
			>
				<view class="eachCareResume" v-for="(item,index) in result" :key="index">
					<view class="eachCareResumeBox" :style="{left:item.txtStyle}"  @touchstart="touchS" @touchmove="touchM" 
					@touchend="touchE"  :data-index="index" :data-id="item.position.id" :data-shareid="item.shareId" @tap="toJobDetail">
						<view class="eachCareResumeBoxContent">
							<view class="eachCareResumeLeftBox">
								<view class="eachCareResumeLeftName">{{item.position.name}}</view>
								<view class="eachCareResumedetail">{{item.position.location}}&nbsp;|&nbsp;{{item.position.workExpLabel}}&nbsp;|&nbsp;{{item.position.eduLabel}}&nbsp;|&nbsp;{{item.position.natureLabel}}&nbsp;|&nbsp;{{item.position.total}}人</view>
								<view class="eachCareCompy">{{item.shareUserInfo.compName}}</view>
								<view class="otherPeopBox">
									<image :src="item.shareUserInfo.avatarUrl" class="headerImg"></image>
									<view class="peopName">{{item.shareUserInfo.name?item.shareUserInfo.name:(item.shareUserInfo.nickName?item.shareUserInfo.nickName:"")}}</view>
									<view class="peopInvite">邀你投递</view>
								</view>
							</view>
							<view class="eachCareResumeRightBox">
								<view class="money">{{item.position.salary}}</view>
								<view class="time">{{getTime(item.createTime)}}</view>
							</view>
						</view>
					</view>
					<view class="deletCare">
						<view class="notCareBox" :data-id="item.id" @tap="delItem">
							<image src="../../static/icos/delet.png" class="deletImg"></image>
							<view class="noCareMess">不再关注</view>
						</view>
					</view>
				</view>
				
				<uniLoadMore :loadingType="loadingType1" :contentText="contentText1"></uniLoadMore>
			</scroll-view>
		</view>
		
		<view class="list-box list-box2" :style="{height:windowHeight+'px'}" v-if="!asyncNum1" >
			<scroll-view
				class="wxaSortPickerList"
				scroll-y="true"
				style="height:100%;"
				@scrolltolower="scrollToLower2"
			>
				<view class="eachlistBox2" v-for="(item,index) in listArray2" :key="index"  @tap="toJobDetail" :data-id="item.position.id">
					<view class="jobNameBox">
						<view class="jobName">{{item.position.name}}</view>
						<view class="money">{{item.position.salary}}</view>
					</view>
					<view class="compyName">上海特斯拉电动汽车有限公司</view>
					<view class="time">{{getTime(item.createTime)}}</view>
					<view class="status isStatus statusWating" v-if="item.status==0">待递交</view>
					<view class="status isStatus statusLoad" v-if="item.status==1">待筛选</view>
					<view class="status isStatus statusSucc" v-if="item.status==2">匹配</view>
					<view class="status isStatus statusError" v-if="item.status==3">不匹配</view>
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
				asyncNum1:true,
				statusBarHeight: 0,
				topHeight: 0,
				// searchHeight:0,
				fastSearchHeight:0,
				rpx:1,
				searchTab:[{title:"待投递"},{title:"已投递"}],
				windowHeight:0,
				activeTab:0,
				
				result:[{txtStyle:""}],
				delBtnWidth: 160, //删除按钮宽度单位（rpx）
                startX:'',
				
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
		props:{
			isIndex:Boolean,
		},
		components: {
			uniLoadMore
		},
		onShow() {
			
		},
		onLoad() {
			uni.getSystemInfo({
				success: res => {
					this.statusBarHeight = res.statusBarHeight;
					this.rpx = res.windowWidth / 750;
					this.topHeight = 94 * this.rpx;
					// this.searchHeight = 90*this.rpx;
					this.fastSearchHeight = 102*this.rpx;
					//  this.statusBarHeight - this.topHeight -
					this.windowHeight = res.windowHeight - this.fastSearchHeight-10;
				}
			});
		},
		mounted() {
			console.log("careResume页面");
			var loginStatu = this.getLoginStatus();
			if(!loginStatu || !this.getAccessToken()){
				uni.navigateTo({url: '../../pages/login'});
				return;
			}
			
			this.getDate1();
		},
		methods: {
			getDate1(){
				let _this = this;
				_this.pageNum1++;
				_this.unirequest({
					url: '/position/deliveringPaging',
					data: {
						pageNum: _this.pageNum1,
						pageSize: 10,
					},
					success: res => {
						if(res){
							console.log(res,"resss")
							_this.listArray1 = _this.listArray1.concat(res);
							_this.toResult(_this.listArray1);
							// _this.listDateArray = _this.listDateArray.concat(res);
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
			toResult(array){
				this.result = [];
				for(let i=0;i<array.length;i++){
					// array[i].txtStyle = "";
					// this.result[i] = array[i];
					let obj = JSON.parse(JSON.stringify(array[i]));
					obj['txtStyle'] = '';
					this.result.push(obj);
				}
				// this.result = [{txtStyle:""}];
				console.log(this.result);
			},
			getDate2(){
				let _this = this;
				_this.pageNum2++;
				_this.unirequest({
					url: '/position/deliveredPaging',
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
						}
						// else{
						// 	var loginStatu = this.getLoginStatus();
						// 	if(!res && !loginStatu){
						// 		console.log("请求中未登录")
						// 		uni.navigateTo({url: '../../pages/login'});
						// 	}
						// }
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
			toFastSearch(e){//快捷搜索点击
				var index = e.currentTarget.dataset.index;
				this.activeTab = index;
				if(index == 0){
					this.asyncNum1 = true;
					
					this.listArray1 = [];
					this.pageNum1=0;
					this.loadingType1 = 0;
					this.getDate1();
				}else{
					this.asyncNum1 = false;
					
					this.listArray2 = [];
					this.pageNum2=0;
					this.loadingType2 = 0;
					this.getDate2();
				}
			},
			toJobDetail(e){
				var id = e.currentTarget.dataset.id;
				uni.navigateTo({url: '../jobDetail/jobDetail?isMe=isTrue&id='+id});
			},
			//////////////////////////////////////////////////////////
			touchS (e) {
                for(var i=0;i<this.result.length;i++){
					this.result[i].txtStyle = "";
				}
                if (e.touches.length == 1) {
					console.log(888)
                    //设置触摸起始点水平方向位置
                    this.startX=e.touches[0].clientX;
                }
            },
            touchM: function (e) {
                 // console.log('touchM')
                if (e.touches.length == 1) {
                    //手指移动时水平方向位置
                    var moveX = e.touches[0].clientX;
                    //手指起始点位置与移动期间的差值
                    var disX = this.startX - moveX;
                    var delBtnWidth = this.delBtnWidth;
                    var txtStyle = "";
                    if (disX == 0 || disX < 0) {//如果移动距离小于等于0，说明向右滑动，文本层位置不变
                        txtStyle = "0px";
                    } else if(disX > 0){//移动距离大于0，文本层left值等于手指移动距离
                        txtStyle = "-" + disX + "rpx";
                        if (disX >= delBtnWidth) {
                            //控制手指移动距离最大值为删除按钮的宽度
                            txtStyle = "-" + delBtnWidth + "rpx";
                        }
                    }
                    //获取手指触摸的是哪一项
                    var index = e.currentTarget.dataset.index;
                    var list = this.result;
                    list[index].txtStyle = txtStyle;
                    // console.log(list[index].txtStyle)
                    //更新列表的状态
                    this.result=list;
                }else{
				}
            },
            touchE: function (e) {
                // console.log('touchE')
                if (e.changedTouches.length == 1) {
                    //手指移动结束后水平位置
                    var endX = e.changedTouches[0].clientX;
                    //触摸开始与结束，手指移动的距离
                    var disX = this.startX - endX;
                    var delBtnWidth = this.delBtnWidth;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                    var txtStyle = disX > delBtnWidth / 3 ? "-" + delBtnWidth + "rpx" : "0px";
                    //获取手指触摸的是哪一项
                    var index = e.currentTarget.dataset.index;
                    var list = this.result;
                    list[index].txtStyle = txtStyle;
                    // console.log(list[index].txtStyle)
                    //更新列表的状态{
                    this.result=list;
                }
            },
            //点击删除按钮事件
            delItem(e){
                //获取列表中要删除项的下标
                var id = e.currentTarget.dataset.id;
                this.deleteMember(id);
            },
			deleteMember(id){
				let _this = this;
				_this.unirequest({
					url: '/position/deliveringDel',
					data: {
						id:id
					},
					success: res => {
						for(let i=0;i<_this.result.length;i++){
							if(_this.result[i].id == id){
								_this.result.splice(i,1);
							}
						}
					},
					fail:e=>{
						console.log(e);
					}
				});
			}
		}
	}
</script>

<style lang="scss">
.careResumeList{
	width:100%;
	height:100%;
	overflow:hidden;
	.fast-search-box-relative{
		position: relative;
	}
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
		position:relative;
		width:100%;
		box-sizing: border-box;
		padding:0 0 40upx 0;
		overflow:auto;
		background:white;
		margin-top:20upx;
		height:calc(100% - 122upx);
		.eachCareResume{
			width:100%;
			height:312upx;
			position:relative;
			.eachCareResumeBox,.deletCare{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				box-sizing: border-box;
				// border-bottom: 1px solid #ccc;
			}
			.eachCareResumeBox{
				display: flex;
				z-index: 2;
				background: white;
				transition: left 0.2s ease-in-out;
				padding:40upx 40upx 0 40upx;
				.eachCareResumeBoxContent{
					width:100%;
					height:99%;
					border-bottom:1px solid #E5E5E5;
					position:relative;
					.eachCareResumeLeftBox{
						width:500upx;
						float:left;
						.eachCareResumeLeftName{
							font-size:34upx;
							font-weight:bolder;
							width:100%;
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
						}
						.eachCareResumedetail{
							font-size:26upx;
							color:rgba(0,0,0,0.65);
							margin-top:16upx;
						}
						.eachCareCompy{
							font-size:26upx;
							color:#203AD2;
							margin-top:16upx;
						}
						.otherPeopBox{
							margin-top:36upx;
							.headerImg{
								width:60upx;
								height:60upx;
								display:block;
								float:left;
							}
							.peopName{
								color:rgba(0,0,0,0.65);
								font-size:26upx;
								line-height:60upx;
								float:left;
								margin-left:20upx;
							}
							.peopInvite{
								float:left;
								color:rgba(0,0,0,0.85);
								font-size:26upx;
								font-weight:bolder;
								margin-left:20upx;
								line-height:60upx;
							}
						}
					}
					.eachCareResumeRightBox{
						float:right;
						.money{
							color:#F80080;
							text-align:right;
							font-size:34upx;
						}
						.time{
							text-align:center;
							color:rgba(0,0,0,0.65);
							font-size:26upx;
							margin-top:149upx;
						}
					}
				}
			}
			.deletCare{
				.notCareBox{
					width:160upx;
					float:right;
					height:100%;
					background:#F06262;
					overflow:hidden;
				}
				.deletImg{
					margin:107upx 0 0 55upx;
					width:66upx;
					height:66upx;
				}
				.noCareMess{
					font-size:24upx;
					text-align:center;
					line-height:40upx;
					color:white;
				}
			}
		}
	}
	.list-box2{
		.eachlistBox2{
			position:relative;
			height:225upx;
			width:calc(100% - 80upx);
			margin:40upx auto 0;
			border-bottom:1px solid #E5E5E5;
			overflow: hidden;
			.jobNameBox{
				font-size:34upx;
				font-weight:bolder;
				display:table;
				.jobName{
					float:left;
				}
				.money{
					margin-left:10upx;
					float:left;
					color:#F80080;
				}
			}
			.compyName{
				color:#595959;
				font-size:28upx;
				margin-top:36upx;
			}
			.time{
				color:#595959;
				font-size:28upx;
				margin-top:20upx;
			}
		}
		.status{
			position:absolute;
			right:0;
			top:0;
		}
	}
}
</style>
