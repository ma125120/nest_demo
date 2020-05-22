<template>
	<div class="login-page page all-center column">
		<h1 class="login-title">登录</h1>
		<el-form :model="form" :rules="rule" class="login-form">
			<el-form-item>
				<el-input
					v-model="form.username"
					placeholder="请输入用户名"
					class="login-input"
					prefix-icon="el-icon-user-solid"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-input
					v-model="form.password"
					type="password"
					placeholder="请输入密码"
					class="login-input"
					prefix-icon="el-icon-lock"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="login" class="login-btn"
					>登录</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import { login } from '@/api'

export default {
	name: 'login',
	data() {
		return {
			form: {
				username: '',
				password: '',
			},
			rule: {
				username: [
					{ required: true, message: '请输入用户名', trigger: 'change' },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'change' },
				],
			},

			redirect: undefined,
		}
	},
	watch: {
		$route: {
			handler: function(route) {
				const query = route.query
				if (query) {
					this.redirect = query.redirect
					// this.otherQuery = this.getOtherQuery(query)
				}
			},
			immediate: true,
		},
	},
	created() {},
	methods: {
		async login() {
			// const { username, password } = this.form;
			const res = await this.$dt(`user/login`, this.form)
			await this.$toast('登陆成功')
			this.$router.replace({ path: this.redirect || '/' })
		},
	},
}
</script>

<style lang="scss">
.login-page {
	background: #2d3a4b;
	color: #fff;
}
.login-form {
	width: 520px;
	max-width: 100%;
}
.login-title {
	margin-bottom: 40px;
}

@mixin item {
	width: 100%;
	margin-bottom: 0px;
}
.login-input {
	@include item();
	background: rgba(0, 0, 0, 0.1);
	color: #444;
	border: 1px solid rgba(255, 255, 255, 0.5);
	border-radius: 5px;
	color: #fff;
	input {
		background: transparent;
		border: 0;
		color: #fff;
	}
}
.login-btn {
	width: 100%;
}
</style>
