import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: false,
        hasLogin: false,
        userName: "",
				userInfo: uni.getStorageSync("USERINFO"),
				userId: uni.getStorageSync("USERID"),
    },
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
				SET_USERINFO(state, userInfo) {
					state.userInfo = userInfo;
				},
				SET_USERID(state, userId) {
					state.userId = userId;
				}
    }
})

export default store
