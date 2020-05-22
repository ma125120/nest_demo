import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/token'
// import qs from "qs";
import { baseurl } from '@/config'

// 创建axios实例
const service = axios.create({
	baseURL: baseurl || window.cfg.baseurl, // api 的 base_url
	timeout: 5000, // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
	(config) => {
		if (getToken()) {
			// config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
			config.headers['token'] = getToken()
		}
		return config
	},
	(error) => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	},
)

// response 拦截器
service.interceptors.response.use(
	(response) => {
		/**
		 * code为非20000是抛错 可结合自己业务进行修改
		 */
		const res = response.data
		if (res.code !== 0) {
			Message({
				message: res.msg,
				type: 'error',
				duration: 5 * 1000,
			})

			// 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
			if (res.code === 401 || res.code === 50012 || res.code === 50014) {
				MessageBox.confirm(
					'你已被登出，可以取消继续留在该页面，或者重新登录',
					'确定登出',
					{
						confirmButtonText: '重新登录',
						cancelButtonText: '取消',
						type: 'warning',
					},
				).then(() => {
					store.dispatch('FedLogOut').then(() => {
						location.reload() // 为了重新实例化vue-router对象 避免bug
					})
				})
			}
			return Promise.reject('error')
		} else {
			return response.data.data
		}
	},
	(error) => {
		console.log('err' + error) // for debug
		Message({
			message: error.msg,
			type: 'error',
			duration: 5 * 1000,
		})
		return Promise.reject(error)
	},
)

service.get = function(url, params) {
	return service({
		url,
		params,
		method: 'GET',
	})
}

function complexMethod(method, url, data, options = {}) {
	const __options = {
		url,
		data,
		method,
		headers: {
			...options.headers,
		},
	}

	return service(__options)
}

function createMethod(method) {
	return function(...args) {
		return complexMethod(method, ...args)
	}
}

service.post = createMethod('POST')
service.delete = createMethod('DELETE')
service.put = createMethod('PUT')

export default service
