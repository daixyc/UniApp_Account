import Vue from 'vue'
import App from './App'
import store from './store'
import uView from "@/uview/uview-ui";
import net from "./common/net.js"
Vue.use(uView);

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$net = net.net
Vue.prototype.$url = net.host

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
