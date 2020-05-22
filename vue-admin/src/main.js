import Vue from 'vue'
// import "./plugins/axios";
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
import ElementUI from 'element-ui'
import { baseurl } from '@/config'
Vue.use(ElementUI)

import './utils/extend'
import './router/hook'
import './plugins/element.js'

Vue.config.productionTip = false

new Vue({
	router,
	store,
	data() {
		return {
			baseurl,
			tableHeight: `calc(100vh - 141px - 138px)`,
		}
	},
	render: (h) => h(App),
}).$mount('#app')
