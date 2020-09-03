<template>
	<view class="content">
		<view class="account account_money">
			<text class="label-text">金额</text>
			<u-input class="uni-input" type="number" v-model="Info.money" placeholder="请输入记账金额" />
		</view>
		<view class="account account_type">
			<text class="label-text">收支</text>
			<u-radio-group class="radioInline" v-model="Info.szType" @change="radioChange">
				<u-radio class="uni-list-input" v-for="(item, index) in lstType" :key="index" :name="item.name">{{ item.name }}</u-radio>
			</u-radio-group>
		</view>
		<view class="account account_kemu">
			<text class="label-text">科目</text>
			<view class="uni-list-cell-db">
				<picker @change="bindPickerChange" :value="index" :range="this.current == 0 ? lstInKemu : lstOutKemu">
					<view class="uni-input">{{this.current == 0 ? lstInKemu[index] : lstOutKemu[index]}}</view>
				</picker>
			</view>
		</view>
		<view class="account account_date">
			<text class="label-text">日期</text>
			<view class="uni-list-cell-db">
				<picker mode="date" :value="Info.date" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="uni-input">{{Info.date}}</view>
				</picker>
			</view>
		</view>
		<view class="account account_moneyType">
			<text class="label-text">方式</text>
			<view class="uni-list-cell-db">
				<picker @change="bindMoneyTypeChange" :value="MTindex" :range="lstMoneyType">
					<view class="uni-input">{{lstMoneyType[MTindex]}}</view>
				</picker>
			</view>
		</view>
		<view class="account account_address">
			<text class="label-text">地点</text>
			<u-input class="uni-input" v-model="Info.address" type="text" @input="onInputAddress" placeholder="请输入消费(收入)地点" />
		</view>
		<view class="account account_remark">
			<text class="label-text">备注</text>
			<view class="uni-list-cell-db textarea">
				<u-input type="textarea" v-model="Info.remark" @input="onInputRemark" placeholder="请输入备注"/>
			</view>
		</view>
		
		<view class="account_button">
			<button type="primary" @click="saveInfo">立即保存</button>
			<button type="primary" @click="againInfo">再记一笔</button>
		</view>
		<uni-popup ref="popup" type="center" class="pop">{{errorMsg}}</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				Info: {
					money: "",
					address: "",
					szType: "",
					kmName: "",
					date: currentDate,
					moneyType: "",
					remark: ""
				},

				lstType: [{
					value: "0",
					name: "收入"
				}, {
					value: "1",
					name: "支出"
				}],
				lstInKemu: ["资产卖出", "借贷收入", "工资收入", "其他收入"],
				lstOutKemu: ["饮食", "交通", "通讯", "衣服", "教育"],
				lstMoneyType: ["现金", "微信", "支付宝", "银行卡"],
				current: 0,
				index: 0,
				MTindex: 0,
				errorMsg: "",
				timer: ""
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		components: {uniPopup},
		methods: {
			onInputMoney(e) {
				//this.money = e.target.value;
			},
			radioChange(e) {
				this.lstType.forEach(type => {
					if (type.name == e) {
						this.current = type.value;
					}
				})
				this.Info.szType = this.lstType[this.current].name;
			},
			bindPickerChange(e) {
				this.index = e.target.value;
				this.Info.kmName = this.current == 0 ? this.lstInKemu[this.index] : this.lstOutKemu[this.index];
			},
			bindDateChange(e) {
				this.Info.date = e.target.value;
			},
			bindMoneyTypeChange(e) {
				this.MTindex = e.target.value;
				this.Info.moneyType = this.lstMoneyType[this.MTindex];
			},
			onInputAddress(e) {
				//setTimeout(() => console.log(this.address),1000)
				//this.address = e.target.value;
			},
			onInputRemark(e) {
				//console.log(this.remark);
			},
			saveInfo() {
				if(this.Info.money == ""){
					if(this.timer !== "") clearTimeout(this.timer);
					this.errorMsg = "账目金额未填写";
					this.$refs.popup.open();
					this.timer = setTimeout(() => this.$refs.popup.close(), 2000);
				}else {
					console.log(this.Info);
				}
			},
			againInfo() {
				this.saveInfo();
				this.Info = {
					money: "",
					address: "",
					szType: "",
					kmName: "",
					date: this.getDate({ format: true }),
					moneyType: "",
					remark: ""
				}
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 10;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
	}
	.account {
		margin: 10px 0;
		display: flex;
		flex-direction: row;
		align-items: center;
		border-bottom: 1px #c8c7cc solid;
	}

	.radioInline {
		display: flex;
		flex-direction: row;
		
		
		.uni-list-input {
			display: inline-block;
			margin-right: 10rpx;
		}
	}

	.radioInline uni-view,
	.uni-input,
	.uni-list-cell-db {
		display: inline-block;
	}
	.uni-list-cell-db{
		width: 70%;
	}

	.label-text {
		margin: 16px;
	}
	.account_remark {
		display: flex;
	}
	.account_remark >* {
		align-self: center;
	}
	.account_button {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}
	.uni-input {
		overflow: inherit;
		width: 75%;
	}
</style>
