import Vue from 'vue'
import App from './App'

import store from './store'
import uView from "@/uview/uview-ui";
Vue.use(uView);

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$url = "http://39.106.76.49:5000";

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
