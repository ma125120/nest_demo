import { getToken, setToken, removeToken } from '@/utils/token'
// import { resetRouter } from "@/router";
import api from '@/api'
const { login, getInfo } = api.user

const getDefaultState = () => {
	return {
		token: getToken(),
		user: null,
		name: '',
		avatar: '',
	}
}

const state = getDefaultState()

const mutations = {
	RESET_STATE: (state) => {
		Object.assign(state, getDefaultState())
	},
	SET_TOKEN: (state, token) => {
		state.token = token
	},
	SET_USER: (state, user) => {
		state.user = user
	},
}

const actions = {
	// user login
	async login({ commit }, userInfo) {
		// const { username, password } = userInfo;
		const res = await login(userInfo)
		const token = res.token
		setToken(token)
		return res
	},

	// get user info
	async getInfo({ commit, state }) {
		const res = await getInfo()
		commit('SET_USER', res)
	},

	// user logout
	logout({ commit, state }) {
		removeToken()
		commit('RESET_STATE')
	},

	// remove token
	resetToken({ commit }) {
		removeToken()
	},
}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
}
