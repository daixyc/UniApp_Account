<template>
	<view class="content">
		<view class="main_addAccount image_button" hover-class="button_style" @click="routerTo('/pages/Account/addAccount')">
			<image class="uni-image" src="../../static/img/newAcount.png" mode="aspectFit"></image>
			<text>新加记账</text>
		</view>
		<view class="main_liushui image_button" hover-class="button_style" @click="routerTo('/pages/Account/selectAccount')">
			<image class="uni-image" src="../../static/img/liushui.png" mode="aspectFit"></image>
			<text>账目查询</text>
		</view>
		<view class="main_yuyin image_button" hover-class="button_style">
			<image class="uni-image" src="../../static/img/yuyin.png" mode="aspectFit"></image>
			<text>语音记账</text>
		</view>
		<view class="main_tixing image_button" hover-class="button_style">
			<image class="uni-image" src="../../static/img/block.png" mode="aspectFit"></image>
			<text>设置提醒</text>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	computed: mapState(['forcedLogin', 'hasLogin', 'userName']),

	onLoad() {
		
	},
	methods: {
		login() {
			if (!this.hasLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: res => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			}
		},
		routerTo(path) {
			let userInfo = uni.getStorageSync("USERINFO");
			if(!userInfo) {
				// 未授权
				uni.navigateTo({
					url: '/pages/authorizate/authorizate'
				})
			} else {
				// 已授权
				if(!this.hasLogin) {
					// 未登录
					uni.navigateTo({
						url: '/pages/login/login'
					});
				} else {
					uni.navigateTo({
						url: path
					});
				}
			}
		}
	}
};
</script>

<style lang="scss" scoped>
/* .hello {
        display: flex;
        flex: 1;
        flex-direction: column;
    }

    .title {
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul {
        font-size: 30upx;
        color: #8f8f94;
        margin-top: 50upx;
    }

    .ul>view {
        line-height: 50upx;
    } */
.content {
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	justify-content: space-between;
}
.image_button {
	width: 160px;
	height: 160px;
	text-align: center;
}
.image_button .uni-image {
	width: 80%;
	height: 80%;
	margin: auto;
	display: block;
}
.button_style {
	background-color: beige;
}
</style>
