<template>
    <view class="content">
        <view class="input-group">
            <view class="input-row border">
                <text class="title">账号：</text>
                <m-input type="text" focus clearable v-model="account" placeholder="请输入账号"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">密码：</text>
                <m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
            </view>
            <view class="input-row border">
                <text class="title">邮箱：</text>
                <m-input type="text" clearable v-model="email" placeholder="请输入邮箱"></m-input>
            </view>
			<view class="input-row border">
			    <text class="title">性别：</text>
			    <radio-group class="uni-list" v-model="sex" @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in radioItems" :key="index">
						<view>
							<radio :id="item.name" :value="item.name" :checked="item.checked"></radio>
							<label class="label-2-text" :for="item.name">
								<text>{{item.value}}</text>
							</label>
						</view>
					</label>
				</radio-group>
			</view>
			<view class="input-row border">
			    <text class="title">年龄：</text>
			    <m-input type="text" clearable v-model="age" placeholder="请输入年龄"></m-input>
			</view>
        </view>
        <view class="btn-row">
            <button type="primary" class="primary" @tap="register">注册</button>
        </view>
    </view>
</template>

<script>
    import service from '../../service.js';
    import mInput from '../../components/m-input.vue';

    export default {
        components: {
            mInput
        },
        data() {
            return {
                account: '',
                password: '',
                email: '',
				sex: '',
				age: '',
				radioItems: [{
					name: "男",
					value: "男"
				},{
					name: "女",
					value: "女"
				}]
            }
        },
        methods: {
			radioChange(e) {
				this.sex = e.target.value;
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
                }
				uni.request({
					url: this.$url + "/addAccount",
					method: "GET",
					data: data,
					success(res) {
						const result = res.data;
						if(result.code == "200") {
							uni.showToast({
								title: "注册成功",
								content: "注册成功，您的注册信息已保存！",
								duration: 2000
							});
							setTimeout(function(){
								uni.navigateTo({
									url: "../login/login"
								})
							},2000)
							
						}else {
							uni.showModal({
								content: result.code + "-->" + result.msg,
								title: "服务错误"
							})
						}
					}
				})
                /* service.addUser(data);
                uni.showToast({
                    title: '注册成功'
                });
                uni.navigateBack({
                    delta: 1
                }); */
            }
        }
    }
</script>

<style>
	.uni-list{
		padding: 7px;
	}
.uni-list-cell{
	display: inline-block;
	margin-right: 10rpx;
}
</style>
