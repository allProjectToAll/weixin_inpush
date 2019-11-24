import Vue from 'vue'
import App from './App'
// 引入vuex 状态库
import store from "./store";

Vue.config.productionTip = false

// 配置服务器前缀
// uEnvDev
if (process.env.NODE_ENV === 'development') {
	Vue.prototype.serverUrl = "http://10.254.236.11:9000";
}
// uEnvProd
if (process.env.NODE_ENV === 'production') {
	Vue.prototype.serverUrl = "https://hi.mandao.com";
}
// 本地
// Vue.prototype.serverUrl = "http://10.6.51.123:9000";
 // Vue.prototype.serverUrl = "http://10.6.51.74:9000";

// 状态数据
Vue.prototype.$store = store;

// 全局用户信息
Vue.prototype.SESSION_KEY = 'login_user';
// 全局access_Token
Vue.prototype.ACCESS_TOKEN = 'access_token';
// 是否登录
Vue.prototype.LOGIN_STATUS = "login_status";



Vue.prototype.trim = (e) => {
	return e.replace(/(^\s*)|(\s*$)/g, '');
}

Vue.prototype.getAccessToken = function() {
	if (this.getLoginStatus()) {
		var access_token = uni.getStorageSync(Vue.prototype.ACCESS_TOKEN);
		if (access_token != null && access_token != "" && access_token != undefined) {
			return access_token;
		}
	}
	return null;
}

Vue.prototype.changeLoginStatus = function(flag) {
	let login_status = Vue.prototype.LOGIN_STATUS;
	uni.setStorageSync(login_status, flag);
}
Vue.prototype.getLoginStatus = function() {
	let login_status = Vue.prototype.LOGIN_STATUS;
	var status = uni.getStorageSync(login_status);
	if (status != null && status != "" && status != undefined) {
		return status;
	}
	return false;
}
// 全局用户信息
Vue.prototype.setGlobalUser = function(userInfo) {
	let globalUser = Vue.prototype.SESSION_KEY;
	var userInfo = uni.setStorageSync(globalUser,userInfo);
	return userInfo;
}
Vue.prototype.getGlobalUser = function() {
	if (this.getLoginStatus()) {
		let globalUser = Vue.prototype.SESSION_KEY;
		var userInfo = uni.getStorageSync(globalUser);
		if (userInfo != null && userInfo != "" && userInfo != undefined) {
			return userInfo;
		}
	}
	return {};
}

Vue.prototype.getAccessToken = function() {
	if (this.getLoginStatus()) {
		var access_token = uni.getStorageSync(Vue.prototype.ACCESS_TOKEN);
		if (access_token != null && access_token != "" && access_token != undefined) {
			return access_token;
		}
	}
	return null;
}
Vue.prototype.getTime = function(time){
	if(time){
		return time.split(" ")[0];
	}else{
		return "";
	}
}

Vue.prototype.refresh = function(callBack) {
	// console.log(this.getLoginStatus());
	if (this.getLoginStatus()) {
		let SESSION_KEY = Vue.prototype.SESSION_KEY;
		// console.log('刷新缓存');
		this.unirequest({
			url: '/user/get',
			show: 'false',
			success: function(loginUser) {
				console.log(loginUser, "loginUser")
				// 保存用户信息到全局的缓存中
				uni.setStorageSync(SESSION_KEY, loginUser);
				if (null != callBack && typeof callBack === 'function') {
					callBack();
				}
			}
		});
	}
}

//http请求
Vue.prototype.unirequest = (opt) => {
	const ApiUrl = Vue.prototype.serverUrl;
	opt = opt || {};
	opt.url = opt.url || '';
	opt.data = opt.data || null;
	opt.method = opt.method || 'POST';
	opt.header = opt.header || {
		"accessToken": Vue.prototype.getAccessToken()?Vue.prototype.getAccessToken():""
	};
	opt.isasync = opt.isasync || 'true'
	opt.success = opt.success || function() {};
	opt.fail = opt.fail || function() {};
	opt.complete = opt.complete || function() {};
	opt.show = opt.show || 'true';
	opt.hideModel = opt.hideModel || 'false'; //true不会重新登陆
	if (opt.show == 'true') {
		uni.showLoading({
			title: "加载中...",
			mask: true
		});
	}
	// console.log('token=',opt.header);
	uni.request({
		url: ApiUrl + opt.url,
		data: opt.data,
		method: opt.method,
		header: opt.header,
		success: function(res) {
			if (res.statusCode == 200) {
				if (res.data.success == undefined || res.data.success == 'undefined') {
					opt.success(res.data);
					return;
				}
				if (res.data.success) {
					opt.success(res.data.data);
					if (!(res.data.data != null && res.data.data.hasLogin == false)){
						Vue.prototype.changeLoginStatus(true);
					}
				} else {
					if (res.data.errorCode == '00402') {
						console.log(res,'重新登录。。。。')
						Vue.prototype.changeLoginStatus(false);
						opt.success(false);
						// Vue.prototype.relogin()
					} else if (res.data.errorCode == '00003') {
						console.log("00003");
						Vue.prototype.changeLoginStatus(false);
						opt.success(false);
					} else if (res.data.errorCode == '00500') {
						console.log("00500");
						opt.success(false);
					} else {
						console.log("系统封装请求提示");
						uni.showModal({
							title: "提示",
							showCancel: false,
							content: res.data.errorMsg
						});
					}
				}
			} else {
				uni.showModal({
					title: "提示",
					showCancel: false,
					content: "系统繁忙，请稍后重试"
				});
			}
		},
		fail: function(e) {
			opt.fail(e);
			uni.showModal({
				title: "提示",
				showCancel: false,
				content: "网络繁忙，请稍后重试"
			});
		},
		complete: function(e) {
			opt.complete(e);
			if (opt.show == 'true') {
				uni.hideLoading();
			}
		}
	})
}



//获取状态Class
Vue.prototype.statuClass = (num) =>{
	if(num==0){//灰色 待投递
		return "statusWating";
	}else if(num==1){//黄色 待处理
		return "statusLoad";
	}else if(num==2){//绿色 匹配
		return "statusSucc";
	}else if(num==3){//红色 不匹配
		return "statusError";
	}else{
		return "";
	}
}
//获取状态中文
Vue.prototype.statuName = (num) =>{
	if(num==0){//灰色 待投递
		return "待投递";
	}else if(num==1){//黄色 待处理
		return "待处理";
	}else if(num==2){//绿色 匹配
		return "匹配";
	}else if(num==3){//红色 不匹配
		return "不匹配";
	}else{
		return "";
	}
}


//工作年限
Vue.prototype.toWorkExp = (num) =>{
	if(num==0){
		return "无经验";
	}else if(num==1){
		return "1-3年";
	}else if(num==2){
		return "3-5年";
	}else if(num==3){
		return "5-10年";
	}else if(num==4){
		return "10年以上";
	}else{
		return "";
	}
}
//学历
Vue.prototype.toEdu = (num) =>{
	if(num==0){
		return "学历不限";
	}else if(num==1){
		return "大专";
	}else if(num==2){
		return "本科";
	}else if(num==3){
		return "硕士";
	}else if(num==4){
		return "博士";
	}else{
		return "";
	}
}
//工作性质 	
Vue.prototype.toNature = (num) =>{
	if(num==0){
		return "全职";
	}else if(num==1){
		return "兼职";
	}else if(num==2){
		return "实习";
	}else{
		return "";
	}
}
//招聘类型 
Vue.prototype.toType = (num) =>{
	if(num==0){
		return "社会招聘";
	}else if(num==1){
		return "校园招聘";
	}else if(num==2){
		return "实习生招聘";
	}else{
		return "";
	}
}



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
