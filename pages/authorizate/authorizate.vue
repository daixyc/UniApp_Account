<template>
	<div class="author-wrap" v-if="canIUse">
		<div>
			<img src="../../static/img/newAcount.png" />
			<h5>轩尘账本申请获得以下权限</h5>
			<p>获得您的公开信息(昵称，头像等)</p>
		</div>
		<div style="display: flex;justify-content: center;width:100%;">
			<button class="author-btn" lang="zh_CN" open-type="getUserInfo" @getuserinfo="bindGetUserInfo">确认授权</button>
			<!-- <button class="author-btn" lang="zh_CN" open-type="getPhoneNumber" @getuserinfo="getPhoneNumber">确认授权</button> -->
		</div>
	</div>
	<div v-else>
		请升级微信版本
		<!-- <van-dialog id="van-dialog" /> -->
	</div>
</template>
<script>
export default {
	name: 'Button',
	data() {
		return {
			goFlag: true,
			canIUse: uni.canIUse('button.open-type.getUserInfo'), //判断小程序的API，回调，参数，组件等是否在当前版本可用。
			// portrait: this.$imgHost + "logoMainPage.png",
			backFlag: '',
			shopIdFlag: ''
		};
	},
	created() {
		// this.getSettings();
	},
	methods: {
		getSettings() {
			var that = this;
			if (this.$store.getters.userId) {
				uni.getSetting({
					success: function(res) {
						if (res.authSetting['scope.userInfo']) {
							uni.getUserInfo({
								success: function(res) {
									//用户已经授权过
									uni.switchTab({
										url: '/pages/main/main'
									});
								}
							});
						} else {
							uni.setStorage({
								key: 'userInfo',
								data: ''
							});
							//用户还未授权过
							uni.reLaunch({
								url: '/pages/authorizate/authorizate'
							});
						}
					}
				});
			} else {
				uni.reLaunch({
					url: '/pages/authorizate/authorizate'
				});
			}
		},
		bindGetUserInfo(e) {
			if (e.mp.detail.rawData) {
				this.goFlag = !this.goFlag;
				//用户按了允许授权按钮
				uni.setStorageSync('USERINFO', JSON.parse(e.mp.detail.rawData));
				this.$store.commit('SET_USERINFO', JSON.parse(e.mp.detail.rawData));
				let info = uni.getStorageSync('USERINFO');
				console.log('info', info); //chen-log
				// let params = {};
				// params.signature = e.mp.detail.signature;
				// params.encryptedData = e.mp.detail.encryptedData;
				// params.iv = e.mp.detail.iv;
				// params.rawData = e.mp.detail.rawData;
				// this.queryUsreInfo(params);
			} else {
				//用户按了拒绝按钮
				uni.showModal({
					title: '提示',
					content: '请点击授权后进入页面访问',
					showCancel: false,
					confirmText: '返回授权',
					success: function(res) {
						// 用户没有授权成功，不需要改变 isHide 的值
						if (res.confirm) {
						}
					}
				});
			}
		},
		getPhoneNumber: function(e) {
			console.log("手机号登录", e);
		},
		queryUsreInfo: function(params) {
			uni.login({
				success: res => {
					let paramers = JSON.parse(params.rawData);
					paramers.code = res.code;
					paramers.signature = params.signature;
					paramers.encryptedData = params.encryptedData;
					paramers.iv = params.iv;
					paramers.wechatType = '0';
					this.$net.post('CP3010.do', { parameters: JSON.stringify(paramers) }, true).then(res => {
						console.log(res);
						if (res.header.errorCode == 'CMS00000') {
							// if (res.header.errorCode == "CMS00000" || throwMsg == true) {
							if (res.body.userIdCms) {
								var that = this;
								uni.setStorageSync('SET_USERID', res.body.userIdCms);
								this.$store.commit('SET_USERID', res.body.userIdCms);
								if (this.shopIdFlag) {
									uni.navigateBack({
										delta: 1 // 回退前 delta(默认为1) 页面
									});
								} else if (this.backFlag) {
									uni.navigateBack({
										delta: 1 // 回退前 delta(默认为1) 页面
									});
									// uni.redirectTo({
									//   url:
									//     "/pages/deposit/sanxiangloan/taxLoan/calculateStart/index"
									// });
								} else {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}
							}
						} else {
							uni.showToast({
								title: '错误代码：' + res.header.errorCode + '-' + res.header.errorMsg,
								icon: 'none'
							});
						}
					});
				}
			});
		}
	},
	computed: {},
	mounted() {
		this.backFlag = this.$root.$mp.query.backFlag;
		this.shopIdFlag = this.$root.$mp.query.shopIdFlag;
		this.goFlag = true;
	},
	onUnload() {
		//如果页面被卸载时被执行
		if (this.backFlag) {
			uni.navigateBack({
				delta: 1 // 回退前 delta(默认为1) 页面
			});
		} else if (this.goFlag) {
			uni.switchTab({
				url: '/pages/index/index'
			});
		}
	}
};
</script>
<style scoped lang="scss">
.author-wrap {
	width: 100%;
	padding: 0 32rpx;
	div {
		text-align: center;
		margin-bottom: 70rpx;
		img {
			width: 180rpx;
			height: 180rpx;
			border-radius: 200rpx;
			margin: 150rpx 0 70rpx 0;
		}
		h5 {
			font-size: 36rpx;
			font-weight: bold;
		}
		p {
			font-size: 31rpx;
			color: #b3b3b3;
			line-height: 70rpx;
		}
	}
	.author-btn {
		// background: #d7000f;
		// color: #fff;
		width: 500rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: -webkit-linear-gradient(left, #ff695a 1%, #d7000f 100%);
		background: -moz-linear-gradient(left, #ff695a 1%, #d7000f 100%);
		background: linear-gradient(left, #ff695a 1%, #d7000f 100%);
		border: none;
		color: #ffffff;
		font-size: 36rpx;
		text-align: center;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
	}
}
</style>
