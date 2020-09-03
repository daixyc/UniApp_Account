<template>
	<view class="content">
		<view class="head-title">
			<text class="head-con">手机号注册</text>
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<u-input class="input-con" type="number" focus clearable v-model="account" placeholder="请输入手机号"></u-input>
			</view>
			<view class="input-row border">
				<text class="title">密码：</text>
				<u-input class="input-con" type="password" displayable v-model="password" placeholder="请输入密码"></u-input>
			</view>
			<view class="input-row border">
				<text class="title">邮箱：</text>
				<u-input class="input-con" type="text" clearable v-model="email" placeholder="请输入邮箱"></u-input>
			</view>
			<view class="input-row border">
				<text class="title">性别：</text>
				<u-radio-group class="uni-list" v-model="sex" @change="radioChange">
					<u-radio class="uni-list-input" v-for="(item, index) in radioItems" :key="index" :name="item.name">{{ item.name }}</u-radio>
				</u-radio-group>
			</view>
			<view class="input-row border">
				<text class="title">年龄：</text>
				<u-input class="input-con" type="number" clearable v-model="age" placeholder="请输入年龄"></u-input>
			</view>
			<view class="input-row border">
				<text class="title">验证码：</text>
				<u-input class="input-con yzm" type="number" clearable v-model="age" placeholder="请输入短信验证码"></u-input>
				<text class="yzmBut" @click="getYZM">{{yzmText}}</text>
			</view>
		</view>
		<view class="btn-row"><button type="primary" class="primary" @tap="register">注册</button></view>
	</view>
</template>

<script>
import service from '../../service.js';

export default {
	components: {},
	data() {
		return {
			account: '',
			password: '',
			email: '',
			sex: '',
			age: '',
			yzmText: '获取验证码',
			radioItems: [
				{
					name: '男',
					value: '男'
				},
				{
					name: '女',
					value: '女'
				}
			]
		};
	},
	methods: {
		getYZM() {
			let that = this;
			let time = 60;
			let timer = setInterval(function() {
				if(time > 0) {
					time = time - 1;
					that.yzmText = time + 'S';
				} else {
					that.yzmText = '重新获取';
					clearTimeout(timer);
				}
			}, 1000)
		},
		radioChange(e) {
			console.log('e', e);
			this.sex = e;
		},
		register() {
			/**
			 * 客户端对账号信息进行一些必要的校验。
			 * 实际开发中，根据业务需要进行处理，这里仅做示例。
			 */
			if (this.account.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '账号不能为空'
				});
				return;
			}
			if (this.password.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '密码不能为空'
				});
				return;
			}
			if (this.email.length < 3 || this.email.indexOf('@') < 0) {
				uni.showToast({
					icon: 'none',
					title: '邮箱地址不合法'
				});
				return;
			}

			const data = {
				username: this.account,
				password: this.password,
				email: this.email,
				sex: this.sex,
				age: this.age
			};
			uni.request({
				url: this.$url + '/addAccount',
				method: 'GET',
				data: data,
				success(res) {
					const result = res.data;
					if (result.code == '200') {
						uni.showToast({
							title: '注册成功',
							content: '注册成功，您的注册信息已保存！',
							duration: 2000
						});
						setTimeout(function() {
							uni.navigateTo({
								url: '../login/login'
							});
						}, 2000);
					} else {
						uni.showModal({
							content: result.code + '-->' + result.msg,
							title: '服务错误'
						});
					}
				}
			});
			/* service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                }); */
		}
	}
};
</script>

<style lang="scss" scoped>
	.content {
		background-color: #FFFFFF;
	}
	.head-title {
		text-align: center;
		height: 50rpx;
		line-height: 50rpx;
		.head-con {
			font-size: 36rpx;
			font-weight: bold;
		}
	}
	.input-con {
		width: 70%;
	}
	.input-con.yzm {
		width: 60%;
	}
	.yzmBut {
		height: 70rpx;
		line-height: 70rpx;
	}
.uni-list {
	display: flex;
	flex-direction: row;
	align-items: center;
	padding: 7px;
}
.uni-list-input {
	display: inline-block;
	margin-right: 10rpx;
}
</style>
