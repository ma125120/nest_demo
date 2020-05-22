import router from './index'
import store from '@/store'
import { getToken } from '@/utils/token'
import { Message } from 'element-ui'

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
	// set page title
	// console.log(to, to.meta.title, to.title || to.meta.title)
	document.title = to.title || to.meta.title

	// determine whether the user has logged in
	const hasToken = getToken()

	if (hasToken) {
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			// next({ path: '/' })
			next(from)
			// NProgress.done();
		} else {
			const hasGetUserInfo = store.state.user.user

			// console.log(hasGetUserInfo, store.state);
			// return;
			if (hasGetUserInfo) {
				next()
			} else {
				try {
					// get user info
					await store.dispatch('user/getInfo')

					next({ ...to, replace: true })
				} catch (error) {
					// remove token and go to login page to re-login
					await store.dispatch('user/resetToken')
					Message.error(error || 'Has Error')
					next(`/login?redirect=${to.fullPath}`)
					// NProgress.done();
				}
			}
		}
	} else {
		/* has no token*/

		if (whiteList.includes(to.path)) {
			// in the free login whitelist, go directly
			next()
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			next(`/login?redirect=${to.path}`)
			// NProgress.done();
		}
	}
})
