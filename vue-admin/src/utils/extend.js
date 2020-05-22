import { Message } from 'element-ui'
import Vue from 'vue'
import { domain } from '@/config'

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const toast = async (msg, type = 'success', time = 1000) => {
	Message({
		type,
		message: msg,
	})
	await delay(time)
	return
}

Vue.prototype.$toast = toast

Vue.prototype.$dt = function(...args) {
	return this.$store.dispatch(...args)
}
Vue.prototype.$to = function(name) {}

const resolveImg = (src = '') => {
	if (src.startsWith('public')) {
		return `${domain}/${src}`
	}

	return src
}
Vue.filter('img', resolveImg)
Vue.prototype.$resolveImg = resolveImg

Vue.prototype.$resolvePath = function(obj = {}) {
	const path = obj.path || obj?.response?.data?.path
	if (path) return path

	const url = obj.url
	if (!url.startsWith('http')) return url
	return ''
}
// Vue.prototype.$ajaxCb = async (res) => {
// 	if (res.code === 0) {
// 		await toast(res.msg)
// 	} else {
// 		await toast(res.msg, 'fail')
// 	}
// }
