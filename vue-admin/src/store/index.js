import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'
import { generateRoutes } from './genRoutes'
Vue.use(Vuex)
import api from '@/api'

export default new Vuex.Store({
	modules: {
		user,
	},
	state: {
		routes: [],
		cates: [],
	},
	mutations: {
		generateRoutes(state, routes) {
			state.routes = generateRoutes(routes)
		},
		setCateList(state, list = []) {
			state.cates = list
		},
	},
	actions: {
		async getCateList({ commit }) {
			const list = await api.cate.getList()
			commit(`setCateList`, list)
		},
	},
})
