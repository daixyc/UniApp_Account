import Vue from 'vue'
import App from './App'

import store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = store
Vue.prototype.$url = "http://127.0.0.1:5000";

App.mpType = 'app'

const app = new Vue({
    store,
    ...App
})
app.$mount()
