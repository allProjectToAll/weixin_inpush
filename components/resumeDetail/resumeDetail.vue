<template>
	<view class="resumeDetailContent">
		<view class="eachTitle">
			候选人基本信息
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<label>姓名</label>
				<view class="formMess">{{name}}</view>
			</view>
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<label>邮箱</label>
				<view class="formMess">{{email}}</view>
			</view>
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<label>手机号</label>
				<view class="formMess">{{phone}}</view>
			</view>
		</view>
		<view class="eachTitle">
			附件简历
		</view>
		<view class="uploadFiles">
			<view class="uploadBox uploadBox2">
				<view class="fileName" @tap="openFile">{{uploadFileName}}</view>
			</view>
		</view>
		<view class="eachTitle">
			推荐信息
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<view class="require">*</view>
				<label style="width:220upx;">与推荐人关系</label>
				<view class="pickerBox">
                    <picker @change="bindPickerChange" :value="pickIndex" :range="array" range-key="value">
						<view class="uni-input" style="color:gray;" v-if="pickIndex==-1">请选择&nbsp;&nbsp;></view>
						<view class="uni-input" v-else>{{array[pickIndex].value}}</view>
                    </picker>
                </view>
			</view>
		</view>
		<view class="checkBox">
			<checkbox-group @change="checkboxChange">
				<label><checkbox value="true" color="#203AD2" />确认所填信息属实</label>
			</checkbox-group>
		</view>
		
		<view class="bottom" v-if="isSurePush">
			<button class="sureSubmit" @tap="sureSubmit">确认内推</button>
		</view>
		<view class="bottom" v-else>
			<button class="bottomBtn refuseBtn" @tap="refuseFn">简历不匹配</button>
			<button class="bottomBtn agreeBtn" @tap="agreeFn">简历匹配</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name:"",
				email:"",
				phone:"",
				isRealy:false,
				//下标
				pickIndex: -1,
				// {key:'000',value:'请选择 >'},
				array: [{key:'0',value:'配偶'},{key:'1',value:'男女朋友'},{key:'2',value:'兄弟姐妹'},{key:'3',value:'同学'},{key:'4',value:'朋友'},{key:'5',value:'前同事'}],
				
				uploadFileName:"",
				cvUrl:"",//简历路径
				
				isSurePush:true,//确认内退按钮还是 简历匹配的两个按钮
				id:"",
			}
		},
		onLoad(e) {
			console.log(e);
			this.name = e.name;
			this.email = e.email;
			this.phone = e.mobile;
			this.uploadFileName = e.cvFileName;
			this.id = e.id;
			this.cvUrl = e.cvUrl;
		},
		onShow() {
			
		},
		methods: {
			openFile(){
				console.log(this.cvUrl,9999)
				// let type = this.cvUrl.substr(this.cvUrl.indexOf(".")+1);
				let array = this.cvUrl?this.cvUrl.split("."):[];
				let type = array[array.length-1];
				console.log(type);
				uni.downloadFile({
				  url: this.cvUrl,
				  success: function (res) {
					var filePath = res.tempFilePath;
					console.log(filePath)
					uni.openDocument({
					  filePath: filePath,
					  fileType: type,
					  success: function (res) {
						console.log(res,'打开文档成功');
					  },
					  fail:function(res){
						  console.log(res,'打开失败')
					  }
					});
				  }
				});
			},
			checkboxChange(e){
				this.isRealy = e.detail.value.length>0?true:false;
			},
			bindPickerChange(e) {
				this.pickIndex = e.target.value;
			},
			sureSubmit(){
				let _this = this;
				if(!_this.isRealy){
					uni.showToast({ icon: 'none', duration: 3000, title: '请勾选"确认所填信息属实"！'});
					return;
				}
				if(_this.pickIndex == "" || _this.pickIndex == -1 || _this.pickIndex == "-1"){
					uni.showToast({ icon: 'none', duration: 3000, title: '请选择与推荐人关系！'});
					return;
				}
				
				uni.showLoading({mask:true,title:'加载中'});
				
				_this.unirequest({
					url: '/position/confirmPut',
					data: {
						id: _this.id,
						relation: _this.pickIndex,
					},
					header: {
						"Content-Type": "application/x-www-form-urlencoded",
						accessToken: _this.getAccessToken()
					},
					success: res => {
						uni.hideLoading();
						uni.showToast({ icon: 'none', duration: 3000, title: "内推成功"});
						uni.setStorageSync("receivedResume",1);//去除点击查看简历
						uni.navigateTo({url: '../receivedResume/receivedResume'});
						
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
.resumeDetailContent{
	padding-bottom:200upx;
	.eachTitle{
		width:100%;
		height:76upx;
		line-height:76upx;
		font-size:28upx;
		padding:0 40upx;
		box-sizing: border-box;
		color:#969696;
	}
	.eachForm{
		width:100%;
		padding-left:40upx;
		box-sizing: border-box;
		background:white;
		display: table;
		.eachFormbox{
			width:100%;
			display:table;
			border-bottom:1px solid #eee;
			.require{
				color:#F80080;
				float:left;
				line-height:90upx;
				width:30upx;
			}
			label{
				font-size:34upx;
				line-height:90upx;
				width:120upx;
				float:left;
			}
			.formMess{
				height:90upx;
				line-height:90upx;
				color:#8C8C8C;
				float:right;
				font-size:32upx;
				margin-right:40upx;
			}
		}
	}
	.uploadFiles{
		width:100%;
		height:176upx;
		background:white;
		position:relative;
		.uploadBox{
			width:100%;
			height:100%;
			.addFileImg{
				width:116upx;
				height:116upx;
				margin:30upx 40upx;
				float:left;
			}
			.loadDetailRule{
				padding-top:30upx;
				color:rgba(0,0,0,0.45);
				line-height:41upx;
				font-size:28upx;
			}
		}
		.uploadBox2{
			position:absolute;
			left:0;
			top:0;
			background:white;
			.fileName{
				width:500upx;
				font-size:34upx;
				color:#203AD2;
				margin:63upx 0 0 40upx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				float:left;
			}
		}
	}
	.pickerBox{
		float:right;
		padding-right:40upx;
		.uni-input{
			width:250upx;
			height:90upx;
			line-height:90upx;
			text-align:right;
			font-size:34upx;
		}
	}
	.checkBox{
		padding-left:40upx;
		margin-top:32upx;
		font-size:28upx;
	}
	.bottom{
		width:100%;
		height:140upx;
		padding:20upx 40upx;
		box-sizing: border-box;
		position: fixed;
		left:0;
		bottom:0;
		// box-shadow: 10px 10px 10px #ccc;
		background:#FBFCFB;
		border-top:1px solid #eee;
		.sureSubmit{
			width:100%;
			background:linear-gradient(270deg,rgba(67,26,255,1) 0%,rgba(32,58,210,1) 100%);
			color:white;
		}
		.bottomBtn{
			width:325upx;
			height:100upx;
			border:1px solid #203AD2;
			float:left;
			border-radius:4px;
			font-weight:bolder;
		}
		.refuseBtn{
			background:rgba(32,58,210,0.1);
			color:#203AD2;
		}
		.agreeBtn{
			background:linear-gradient(270deg,rgba(67,26,255,1) 0%,rgba(32,58,210,1) 100%);
			color:white;
			margin-left:20upx;
		}
	}
}
</style>
