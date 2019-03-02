import Vue from 'vue'
import App from './App'
import store from './store/index'
import { get, post } from './http/api'

Vue.prototype.$store = store
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
