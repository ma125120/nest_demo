<template>
	<div class="between-center header-nav">
		<div class="align-center">
			<!-- <i class="el-icon-s-fold"></i> -->
			<Breadcrumb></Breadcrumb>
		</div>
		<el-dropdown class="align-center header-avatar hover">
			<div>
				<i class="el-icon-s-custom" style="font-size: 20px"></i>
				<i class="el-icon-arrow-down"></i>
			</div>
			<el-dropdown-menu slot="dropdown">
				<!-- <el-dropdown-item>黄金糕</el-dropdown-item>
				<el-dropdown-item>狮子头</el-dropdown-item>-->
				<el-dropdown-item @click.native="show = true">修改密码</el-dropdown-item>
				<el-dropdown-item :divided="false" @click.native="logout">退出登录</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>

		<el-dialog title="修改密码" :visible.sync="show" :modal-append-to-body="false">
			<el-form ref="form" :model="form" label-width="80px" :rules="rules">
				<el-form-item label="原密码" prop="password">
					<el-input v-model="form.password" type="password"></el-input>
				</el-form-item>
				<el-form-item label="新密码" prop="pwd" required>
					<el-input v-model="form.pwd" type="password"></el-input>
				</el-form-item>
				<el-form-item label="确认密码" prop="pwd1" required>
					<el-input v-model="form.pwd1" type="password"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="close">取 消</el-button>
				<el-button type="primary" @click="changePwd">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import http from '@/utils/http'
const initForm = {
	password: '',
	pwd: '',
	pwd1: '',
}
export default {
	name: 'HeaderNav',
	data() {
		const validatePass = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请输入密码'))
			} else {
				if (this.form.pwd1 !== '') {
					this.$refs.form.validateField('pwd1')
				}
				callback()
			}
		}
		const validatePass2 = (rule, value, callback) => {
			if (value === '') {
				callback(new Error('请再次输入密码'))
			} else if (value !== this.form.pwd) {
				callback(new Error('两次输入密码不一致!'))
			} else {
				callback()
			}
		}

		return {
			show: false,
			formLabelWidth: 80,
			form: { ...initForm },
			rules: {
				password: [
					{
						required: true,
						message: '请输入原密码',
					},
				],
				pwd: [
					{ validator: validatePass, trigger: 'blur' },
					{
						min: 4,
						message: '密码至少为4位',
					},
				],
				pwd1: [{ validator: validatePass2, trigger: 'blur' }],
			},
		}
	},
	created() {},
	methods: {
		close() {
			this.form = { ...initForm }
			this.show = false
		},
		async logout() {
			await this.$store.dispatch(`user/logout`)
			this.$router.push(`/login`)
		},
		async changePwd() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					const user = {
						...this.$store.state.user.user,
						...this.form,
					}
					await http.post(`/user/changePwd`, user)
					this.$toast(`修改密码成功,请重新登录`)
					this.logout()
					this.close()
				}
			})
		},
	},
	watch: {
		show(val) {
			if (val) {
				this.$refs?.form?.clearValidate()
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.header-nav {
	padding: 6px 12px;
	box-shadow: 0 2px 2px rgba(128, 128, 128, 0.1);
	background: #fff;
}
.header-avatar {
	padding: 0 24px;
	&:hover {
		color: #409eff;
	}
}
</style>
