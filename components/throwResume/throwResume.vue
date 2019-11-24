<template>
	<view class="inpushResumeContent">
		<view class="eachTitle">
			基本信息
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<view class="require">*</view>
				<label>姓名</label>
				<input type="text" v-model="name" placeholder="请选择" />
			</view>
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<view class="require">*</view>
				<label>邮箱</label>
				<input type="text" v-model="email" placeholder="请选择" />
			</view>
		</view>
		<view class="eachForm">
			<view class="eachFormbox">
				<view class="require">*</view>
				<label>手机号</label>
				<input type="text" v-model="phone" placeholder="请选择" />
			</view>
		</view>
		<view class="eachTitle">
			附件简历
		</view>
		<view class="uploadFiles">
			<view class="uploadBox">
				<image src="../../static/icos/addFile.png" class="addFileImg" @tap="chooseFile"></image>
				<view class="loadDetailRule">
					<view>简历上传说明：</view>
					<view>请上传doc、docx、pdf格式简历</view>
					<view>文件大小5M以内</view>
				</view>
			</view>
			<view class="uploadBox uploadBox2" v-if="loaded">
				<view class="fileName">{{uploadFileName}}</view>
				<image src="../../static/icos/close2.png" class="deletFile" @tap="deletFile"></image>
			</view>
		</view>
		<view class="bottom">
			<button class="sureSubmit" @tap="sureSubmit">确认投递</button>
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
								
				loaded:false,//上传完成
				uploadFileName:"",
				
				tempFilePath:"",
				positionId:"",
				shareId:"",
			}
		},
		onLoad(e) {
			this.positionId = e.positionId;
			this.shareId = e.shareId?e.shareId:"";
		},
		methods: {
			chooseFile(){
				let _this = this;
				wx.chooseMessageFile({
					count: 1,
					success(res) {
						console.log(res);
						if(!res.tempFiles[0]){
							uni.showToast({ icon: 'none', duration: 3000, title: '请选择doc、docx、pdf格式文档！且文档应小于5M！'});
							return;
						}
						
						var str = res.tempFiles[0].name;
						if(str.substring(str.length-3) !="doc" && str.substring(str.length-3) !="pdf" && str.substring(str.length-4) !="docx"){
							uni.showToast({ icon: 'none', duration: 3000, title: '请选择doc、docx、pdf格式文档！'});
							return;
						}
						if(res.tempFiles[0].size/1024/1024 > 5){
							uni.showToast({ icon: 'none', duration: 3000, title: '文档应小于5M！'});
							return;
						}
						_this.loaded = true;
						_this.uploadFileName = res.tempFiles[0].name
						_this.tempFilePath = res.tempFiles[0].path;
						
					}
				});
			},
			deletFile(){
				let _this = this;
				_this.loaded = false;
				_this.uploadFileName = "";
				_this.tempFilePath = "";
			},
			sureSubmit(){
				let _this = this;
				
				if(_this.trim(_this.name) == ""){
					uni.showToast({ icon: 'none', duration: 3000, title: '姓名不能为空！'});
					return;
				}
				if(_this.trim(_this.email) == ""){
					uni.showToast({ icon: 'none', duration: 3000, title: '邮箱不能为空！'});
					return;
				}
				if(_this.trim(_this.phone) == ""){
					uni.showToast({ icon: 'none', duration: 3000, title: '手机号不能为空！'});
					return;
				}
				if(!_this.tempFilePath){
					uni.showToast({ icon: 'none', duration: 3000, title: '请上传文件！'});
					return;
				}
				console.log(_this.positionId,_this.name,_this.email,_this.phone,_this.shareId,_this.getAccessToken())
				uni.uploadFile({
				  url:_this.serverUrl+'/position/outPut',
				  filePath: _this.tempFilePath,
				  name: 'file',
				  formData: {
					 positionId: _this.positionId,
					 name:_this.name,
					 email:_this.email,
					 mobile:_this.phone,
					 shareId:_this.shareId,
					 // relation:_this.pickIndex
				  },
				  header: {
					"Content-Type": "multipart/form-data",
					accessToken: _this.getAccessToken()
				  },
				  success: function (res) {
					  let data = JSON.parse(res.data);
					  if(data.success){
						  uni.showToast({ icon: 'none', duration: 3000, title: "投递成功"});
						  uni.navigateTo({
						  	url: '../toSucc/toSucc?pushSuccess=isFalse'
						  });
					  }else{
						  var loginStatu = _this.getLoginStatus();
						  if(!res && !loginStatu){
						  	uni.navigateTo({url: '../../pages/login'});
							return;
						  }
						  uni.showToast({ icon: 'none', duration: 3000, title: data.errorMsg});
					  }
				  }, fail: function (err) {
					console.log(err,222)
				  }
				})
			}
		}
	}
</script>

<style lang="scss">
.inpushResumeContent{
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
				// font-weight: bolder;
			}
			input{
				height:90upx;
				line-height:90upx;
				width:500upx;
				float:left;
				font-size:32upx;
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
			.progress{
				width:87upx;
				height:87upx;
				font-size:24upx;
				color:#595959;
				border:1px solid #EEEEEE;
				border-radius: 50%;
				float:right;
				margin:45upx 40upx 0 0;
				text-align:center;
				line-height:87upx;
			}
			.deletFile{
				width:34upx;
				height:34upx;
				margin:71upx 40upx 0 0;
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
	}
}
</style>
