<template>
	<view class="manageJob">
		
		<view class="eachManegeJob">
			<view class="eachManegeJobTop">
				<view class="jobleftBox">
					<viw class="jobName">
						产品经理（后台）
						<view class="jjMoney">奖3000</view>
					</viw>
					<view class="someDetail">
						上海 | 3-5年 | 学历不限 | 全职 | 2人
					</view>
				</view>
				<view class="jobrightBox">
					<view class="time">2019.12.12</view>
					<view class="xzCash">10k-20k</view>
				</view>
			</view>
			<view class="eachManegeJobfooter">
				<view class="eachBottom">
					<image src="../../static/icos/sh3.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh5.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh1.png" class="btnImage"></image>
					219
				</view>
			</view>
		</view>
		
		<view class="eachManegeJob">
			<view class="eachManegeJobTop">
				<view class="jobleftBox">
					<viw class="jobName">
						产品经理（后台）
						<view class="jjMoney">奖3000</view>
					</viw>
					<view class="someDetail">
						上海 | 3-5年 | 学历不限 | 全职 | 2人
					</view>
				</view>
				<view class="jobrightBox">
					<view class="time">2019.12.12</view>
					<view class="xzCash">10k-20k</view>
				</view>
			</view>
			<view class="eachManegeJobfooter">
				<view class="eachBottom">
					<image src="../../static/icos/sh3.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh5.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh1.png" class="btnImage"></image>
					219
				</view>
			</view>
		</view>
		<view class="eachManegeJob">
			<view class="eachManegeJobTop">
				<view class="jobleftBox">
					<viw class="jobName">
						产品经理（后台）
						<view class="jjMoney">奖3000</view>
					</viw>
					<view class="someDetail">
						上海 | 3-5年 | 学历不限 | 全职 | 2人
					</view>
				</view>
				<view class="jobrightBox">
					<view class="time">2019.12.12</view>
					<view class="xzCash">10k-20k</view>
				</view>
			</view>
			<view class="eachManegeJobfooter">
				<view class="eachBottom">
					<image src="../../static/icos/sh3.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh5.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh1.png" class="btnImage"></image>
					219
				</view>
			</view>
		</view>
		<view class="eachManegeJob">
			<view class="eachManegeJobTop">
				<view class="jobleftBox">
					<viw class="jobName">
						产品经理（后台）
						<view class="jjMoney">奖3000</view>
					</viw>
					<view class="someDetail">
						上海 | 3-5年 | 学历不限 | 全职 | 2人
					</view>
				</view>
				<view class="jobrightBox">
					<view class="time">2019.12.12</view>
					<view class="xzCash">10k-20k</view>
				</view>
			</view>
			<view class="eachManegeJobfooter">
				<view class="eachBottom">
					<image src="../../static/icos/sh3.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh5.png" class="btnImage"></image>
					219
				</view>
				<view class="eachBottom eachBottom2">
					<image src="../../static/icos/sh1.png" class="btnImage"></image>
					219
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.manageJob{
	.eachManegeJob{
		height:214upx;
		width:100%;
		margin-bottom: 20upx;
		background:white;
		padding-top:30upx;
		.eachManegeJobTop{
			width:calc(100% - 40upx);
			border-bottom:1px solid #E5E5E5;
			height:139upx;
			margin-left:40upx;
			.jobleftBox{
				float:left;
				.jobName{
					font-size:34upx;
					font-weight:600;
					.jjMoney{
						padding:9upx 12upx;
						border-radius:17upx;
						background:rgba(248,0,128,0.1);
						color:#F80080;
						font-size:24upx;
						display:inline-block;
						font-weight:400;
					}
				}
				.someDetail{
					font-size:26upx;
					color:rgba(0,0,0,0.65);
					margin-top:26upx;
				}
			}
			.jobrightBox{
				float:right;
				font-size:26upx;
				color:rgba(0,0,0,0.65);
				text-align:right;
				margin-right:40upx;
				.time{
					margin-top:15upx;
				}
				.xzCash{
					margin-top:25upx;
				}
			}
		}
		.eachManegeJobfooter{
			width:100%;
			.eachBottom{
				width:33.33%;
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
			.eachBottom2{
				color:#999999;
			}
		}
	}
}
</style>
