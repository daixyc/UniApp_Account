import store from '../store/index.js'
const host = "http://39.106.76.49:5000/";
const appId = 'wxe82fc1e870202f2b';
const secret = '2c66ffb849eecebc976b636fc9a6b0d7';

const net = {
	async post(url, data, throwMsg) {
		let arg = {
			...data
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: host + url,
				data: arg,
				method: 'POST',
				header: {
					"Content-Type": "application/json"
				}, // 设置请求的 header
				success(res) {
					if (res.statusCode != 200) {
						uni.showToast({
							title: "网络出错，稍后再试",
							icon: "none"
						});
						return false;
					}
					if (res.data.code == "200" || throwMsg == true) {
						resolve(res.data);
					}else {
						uni.showModal({
							title: "提示",
							content: res.data.header.errorMsg,
							showCancel: false
						});
						return false;
					}
				},
				fail(error) {
					uni.showModal({
						title: "提示",
						content: "网络请求超时",
						showCancel: false
					});
					reject(error);
				}
			})
		})
	}
}

export default {
	net,
	host,
	appId
}