<template>
	<view class="content">
		<view class="account account_type">
			<radio-group @change="radioChange" class="radioInline">
				<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in lstType" :key="item.value">
					<view class="radio-view"><radio :value="item.value" :checked="index === current" /></view>
					<view class="radio-view">{{ item.name }}</view>
				</label>
			</radio-group>
		</view>
		<view class="time-ward">
			<text class="text-title">选择统计区间：</text>
			<view class="ward-list">
				<picker @change="bindPickerChange" :value="index" :range="lstWard">
					<view class="uni-input">{{ lstWard[index] }}</view>
				</picker>
			</view>
		</view>
		<view class="table-list">
			<m-table class="" border="1" border-color="#95b99e">
				<t-tr font-size="14" color="#95b99e" align="center">
					<t-th>科目</t-th>
					<t-th>金额</t-th>
					<t-th>方式</t-th>
					<t-th>日期</t-th>
				</t-tr>
				<t-tr font-size="12" color="#5d6f61" align="center" v-for="item in tableList" :key="item.jine">
					<t-td>{{ item.kemu }}</t-td>
					<t-td>{{ item.jine }}</t-td>
					<t-td>{{ item.type }}</t-td>
					<t-td>{{ formatTime(item.time) }}</t-td>
				</t-tr>
			</m-table>
		</view>
		<text class="text">
			待补充内容：根据选择的时间区间，查询该区间内的数据，更新表格
		</text>
	</view>
</template>

<script>
import mTable from '../../components/t-table/t-table.vue';
import tTh from '@/components/t-table/t-th.vue';
import tTr from '@/components/t-table/t-tr.vue';
import tTd from '@/components/t-table/t-td.vue';
const util = require('../../common/util.js');
export default {
	onLoad() {
		this.lstWard = this.lstInWard;
	},
	components: {
		mTable,
		tTh,
		tTr,
		tTd
	},
	data() {
		return {
			lstType: [
				{
					value: '0',
					name: '收入统计'
				},
				{
					value: '1',
					name: '支出统计'
				}
			],
			index: 0,
			current: 0,
			lstInWard: ['今日收入情况', '本月收入情况', '上月收入情况', '今年收入情况', '去年收入情况'],
			lstOutWard: ['今日支出情况', '本月支出情况', '上月支出情况', '今年支出情况', '去年支出情况'],
			lstWard: [],
			tableList: [{
				kemu: "借贷收入",
				jine: 200,
				type: "我的现金",
				time: Date.now()
			},{
				kemu: "职业收入",
				jine: 2000,
				type: "银行卡",
				time: Date.now()
			}]
		};
	},
	methods: {
		formatTime(time) {
			return util.formatDate(time);
		},
		bindPickerChange(event) {
			//根据选择的时间区间，查询数据并将tableList替换
			this.index = event.target.value;
			//暂时先直接返回
			return this.lstWard[this.index];
			// 这里应该先调取API，根据选择的时间，查询账目记录
		},
		radioChange(e) {
			this.lstType.forEach(type => {
				if (type.value == e.target.value) {
					this.current = type.value;
				}
			});
			this.index = 0;
		},
		changeLstWard() {
			this.lstWard = this.current == 0 ? this.lstInWard : this.lstOutWard;
		}
	},
	watch: {
		current: 'changeLstWard'
	}
};
</script>

<style>
.account {
	margin: 10px 0;
}
.radioInline {
	display: flex;
	justify-content: space-around;
}
.radioInline >>> .uni-list-cell {
	display: inline;
	position: initial;
}
.radioInline .radio-view {
	display: inline-block;
}
.time-ward {
	padding: 0 30px;
}
.time-ward .ward-list {
	display: inline-block;
}
.text {
	display: block;
	padding: 40px;
	color: #999999;
}
</style>
