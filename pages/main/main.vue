<template>
	<view class="content">
		<!-- <view v-if="hasLogin" class="hello">
            <view class="title">
                您好 {{userName}}，您已成功登录。
            </view>
            <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “退出” 可以 “注销当前账户”</view>
            </view>
        </view>
        <view v-if="!hasLogin" class="hello">
            <view class="title">
                您好 游客。
            </view>
            <view class="ul">
                <view>这是 uni-app 带登录模板的示例App首页。</view>
                <view>在 “我的” 中点击 “登录” 可以 “登录您的账户”</view>
            </view>
        </view> -->
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
	methods: {
		routerTo(path) {
			uni.navigateTo({
				url: path
			});
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
