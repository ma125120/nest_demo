<template>
	<PageHeader :title="$route.query.id ? '编辑职位信息' : '新建职位信息'">
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="所属城市" prop="cityId">
				<MySelect v-model="form.cityId" :list="cities" text="城市"></MySelect>
			</el-form-item>
			<el-form-item label="职位名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入职位名称"></el-input>
			</el-form-item>
			<el-form-item label="职位描述" prop="content">
				<TinyMce v-model="form.content"></TinyMce>
			</el-form-item>
			<div class="form-btns">
				<el-button type="primary" @click="submit">提交</el-button>
			</div>
		</el-form>
	</PageHeader>
</template>

<script>
import api from '@/api'
import { cities } from '@/utils/enum'

export default {
	name: 'JobCreate',
	data() {
		return {
			form: {
				name: '',
				content: '',
				cityId: '',
			},
			cities,
			rules: {
				cityId: [{ required: true, message: '请输入所属城市' }],
				name: [{ required: true, message: '请输入职位名称' }],
				content: [
					{ required: true, message: '请输入职位描述', trigger: 'change' },
				],
			},
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		async fetchData() {
			const id = this.$route.query.id
			if (!id) return

			const obj = await api.job.get(id)
			this.form = { ...obj }
		},
		async submit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					const res = await api.job.create(this.form)
					this.$toast(`${this.form.id ? '修改' : '新建'}成功`)
					this.$router.back()
				}
			})
		},
	},
}
</script>

<style lang="scss"></style>
