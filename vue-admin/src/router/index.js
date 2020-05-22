import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
	{
		path: '/login',
		name: 'login',
		hidden: true,
		meta: {
			title: '登录页',
		},
		title: '登录页',
		component: () => import('../views/login'),
	},
	{
		path: '/',
		component: Layout,
		children: [
			{
				path: '/',
				name: 'Home',
				meta: {
					title: '首页',
				},
				component: () => import('../views/Home'),
			},
		],
	},
	// {
	// 	path: '/user',
	// 	// name: "user",
	// 	meta: {
	// 		title: '查看用户',
	// 		breadcrumb: false,
	// 	},
	// 	component: Layout,
	// 	children: [
	// 		{
	// 			path: 'table',
	// 			name: 'user/table',
	// 			meta: {
	// 				title: '查看用户',
	// 			},
	// 			component: () => import('../views/user'),
	// 		},
	// 	],
	// },
	{
		path: '/job',
		component: Layout,
		meta: {
			title: '职位信息',
			breadcrumb: true,
		},
		redirect: '/job/table',
		children: [
			{
				path: 'table',
				name: 'job/table',
				meta: {
					title: '职位信息',
					breadcrumb: false,
				},
				component: () => import('../views/job/table.vue'),
			},
			{
				path: 'create',
				name: '/job/create',
				hidden: true,
				meta: {
					title: '新建职位信息',
				},
				component: () => import('../views/job/create.vue'),
			},
		],
	},
	{
		path: '/record',
		component: Layout,
		meta: {
			title: '客户预留信息',
			breadcrumb: true,
		},
		redirect: '/record/table',
		children: [
			{
				path: 'table',
				name: 'record/table',
				meta: {
					breadcrumb: false,
					title: '客户预留信息',
				},
				component: () => import('../views/record/table.vue'),
			},
		],
	},
	{
		path: '/project',
		component: Layout,
		meta: {
			title: '项目作品',
			breadcrumb: true,
		},
		redirect: '/project/cate',
		children: [
			{
				path: 'cate',
				name: '/project/cate',
				meta: {
					title: '项目种类',
					breadcrumb: true,
				},
				redirect: '/project/cate/table',
				component: () => import('../views/OtherView.vue'),
				children: [
					{
						path: 'table',
						name: '/project/cate/table',
						meta: {
							title: '项目种类',
							breadcrumb: false,
						},
						component: () => import('../views/project/cate/table.vue'),
					},
					{
						path: 'create',
						name: '/project/cate/create',
						hidden: true,
						meta: {
							title: '项目种类详情',
						},
						component: () => import('../views/project/cate/create.vue'),
					},
				],
			},

			{
				path: 'resource',
				name: '/project/resource/table',
				meta: {
					title: '项目资源',
				},
				redirect: '/project/resource/table',
				component: () => import('../views/OtherView.vue'),
				children: [
					{
						path: 'table',
						name: '/project/resource/table',
						meta: {
							title: '项目资源',
							breadcrumb: false,
						},
						component: () => import('../views/project/resource/table.vue'),
					},
					{
						path: 'create',
						name: '/project/resource/create',
						hidden: true,
						meta: {
							title: '项目资源详情',
						},
						component: () => import('../views/project/resource/create.vue'),
					},
				],
			},
		],
	},
	// {
	//   path: "/about",
	//   name: "About",
	//   title: "关于页面",
	//   // route level code-splitting
	//   // this generates a separate chunk (about.[hash].js) for this route
	//   // which is lazy-loaded when the route is visited.
	//   component: () =>
	//     import(/* webpackChunkName: "about" */ "../views/About.vue")
	// }
]

const router = new VueRouter({
	routes,
})

export default router
