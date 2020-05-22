<template>
	<PageHeader :title="`${$route.query.id ? '编辑' : '新建'}项目种类`">
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入名称，长度在2-10个字符之间"></el-input>
			</el-form-item>
			<el-form-item label="标题" prop="title">
				<el-input v-model="form.title" placeholder="如需换行，请以逗号隔开，比如：臻于化境 栩栩如生"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="desc">
				<el-input v-model="form.desc" placeholder="请输入描述"></el-input>
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
	name: 'CateCreate',
	data() {
		return {
			form: {
				name: '',
				title: '',
				desc: '',
			},
			cities,
			rules: {
				title: [{ required: true, message: '请输入标题' }],
				name: [
					{ required: true, message: '请输入名称' },
					{
						min: 2,
						max: 10,
						message: '长度在 2 到 10 个字符',
						trigger: 'blur',
					},
				],
				desc: [{ required: true, message: '请输入描述' }],
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

			const obj = await api.cate.get(id)
			this.form = { ...obj }
		},
		async submit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					const res = await api.cate.create(this.form)
					this.$toast(`${this.form.id ? '修改' : '新建'}成功`)
					this.$router.back()
				}
			})
		},
	},
}
</script>

<style lang="scss"></style>
