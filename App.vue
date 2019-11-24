<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
page {
	background-color: #f8f8f7;
}
*{
	margin:0;
	padding:0;
}
.page {
	width: 100%;
	height: 100%;
	background-color: #f8f8f7;
	position: relative;
}
/*每个页面公共css */
.header-self{
	.header-status{
		background: #fff;
		position: fixed;
		z-index: 100;
		top: 0;
		width: 100%;
	}
	.page-header-title-box{
		background: #fff;
		padding: 15upx 40upx;
		display: flex;
		align-items: center;
		position: fixed;
		z-index: 100;
		width: 100%;
		box-sizing: border-box;
		height: 95upx;
	}
}
/*搜索框*/
.search-control{
	width:100%;
	box-sizing: border-box;
	padding:20upx 40upx 0;
	position:absolute;
	background:white;
	.search-input{
		height:70upx;
		padding-left: 70upx;
		background:#F7F7F7;
		border-radius: 8upx;
		font-size:35upx;
	}
	.i-sc-img{
		width:37upx;
		height:37upx;
		position: absolute;
		left:60upx;
		top:36upx;
	}
	.i-sc-close{
		width:30upx;
		height:30upx;
		position: absolute;
		right:60upx;
		top:40upx;
		z-index:99;
	}
}
/*快捷筛选*/
.fast-search-box{
	width:100%;
	height:102upx;
	box-sizing: border-box;
	line-height:102upx;
	background:white;
	position:absolute;
	.each-fast-tab{
		color:#8C8C8C;
		float:left;
		text-align:center;
		font-size:30upx;
	}
	.activeTab{
		color:black;
		font-weight:600;
	}
	/*两个tab*/
	.each-fast-tab2{
		width:50%;
	}
	/*三个tab*/
	.each-fast-tab3{
		width:33.3%;
	}
	/*四个tab*/
	.each-fast-tab4{
		width:25%;
	}
	.bottom-line{
		width:40upx;
		height:4upx;
		bottom:0;
		margin:0 auto;
		background:#203AD2;
	}
}

// 几种处理状态
.isStatus{//非固定宽度 padding支撑
	padding:10upx 16upx;
	border-radius:22upx;
	font-size:24upx;
}
.statusFor{//固定宽度
	padding:10upx 16upx;
	border-radius:22upx;
	font-size:24upx;
}
.statusSucc{//绿色
	color:#0CBBA3;
	background:rgba(12,187,163,0.1);
}
.statusLoad{//黄色
	background:rgba(255,167,33,0.1);
	color:#FFA721;
}
.statusError{//红色
	background:rgba(248,0,128,0.1);
	color:#F80080;
}
.statusWating{//灰色
	background:rgba(143,142,144,0.2);
	color:#8F8E90;
}
</style>
