<template>
	<PageHeader :title="`${$route.query.id ? '编辑' : '新建'}项目资源`">
		<el-form ref="form" :model="form" :rules="rules" label-width="80px">
			<el-form-item label="种类" prop="cateId">
				<MySelect v-model="form.cateId" :list="cates" text="项目种类"></MySelect>
			</el-form-item>
			<el-form-item label="图片" prop="url">
				<MyUpload :count="count" v-model="form.url" :list.sync="fileList"></MyUpload>
			</el-form-item>
			<el-form-item label="名称" prop="name">
				<el-input v-model="form.name" placeholder="请输入名称"></el-input>
			</el-form-item>
			<el-form-item label="描述" prop="desc">
				<el-input v-model="form.desc" placeholder="请输入项目描述"></el-input>
			</el-form-item>
			<el-form-item label="时间" prop="date">
				<el-date-picker
					v-model="form.date"
					type="year"
					value-format="yyyy"
					placeholder="请选择日期"
					clearable
				/>
			</el-form-item>
			<div class="form-btns">
				<el-button type="primary" :loading="loading" @click="submit">提交</el-button>
			</div>
		</el-form>
	</PageHeader>
</template>

<script>
import api from '@/api'
import { cities } from '@/utils/enum'
import { mapState } from 'vuex'

export default {
	name: 'CateCreate',
	data() {
		const validateImg = (rule, value, callback) => {
			if (!this.fileList || this.fileList.length === 0) {
				callback(new Error('请选择图片'))
			} else {
				// if (this.ruleForm.checkPass !== '') {
				// 	this.$refs.ruleForm.validateField('checkPass');
				// }
				callback()
			}
		}

		return {
			loading: false,
			count: 1,
			fileList: [],
			form: {
				url: '',
				cateId: '',
				name: '',
				date: '',
				desc: '',
			},
			cities,
			rules: {
				cateId: [{ required: true, message: '请选择种类' }],
				name: [{ required: true, message: '请输入名称' }],
				date: [{ required: true, message: '请选择项目时间' }],
				desc: [{ required: true, message: '请输入项目描述' }],
				url: [
					// { required: true, message: '请选择图片' },
					{
						validator: validateImg,
						trigger: 'change',
					},
				],
			},
		}
	},
	created() {
		this.fetchData()
	},
	computed: {
		...mapState({
			cates: 'cates',
		}),
	},
	methods: {
		changeFileList(list) {
			this.fileList = list
		},
		async fetchData() {
			const id = this.$route.query.id
			if (!id) return

			const obj = await api.resource.get(id)
			let url = this.$resolveImg(obj.url)
			this.form = { ...obj }
			this.fileList = [{ name: url, url, path: obj.url }]
			this.count = 1
		},
		async submit() {
			this.$refs.form.validate(async (valid) => {
				if (valid) {
					this.loading = true
					try {
						const params = {
							...this.form,
							url: this.$resolvePath(this.fileList?.[0]),
						}

						const res = await api.resource.create(params)
						this.$toast(`${this.form.id ? '修改' : '新建'}成功`)
						this.$router.back()
					} catch (err) {
						console.log(err)
					}
					this.loading = false
				}
			})
		},
	},
}
</script>

<style lang="scss"></style>
