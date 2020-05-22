<template>
	<PageHeader>
		<!-- <h1>职位信息</h1> -->
		<div class="between-center table-top">
			<div>
				<MySelect v-model="cateId" :list="cates" text="项目种类" @change="refresh"></MySelect>
			</div>
			<div>
				<el-button type="primary" @click="$router.push(`${prefix}/create`)">新建</el-button>
			</div>
		</div>

		<ResTable :drag="!!cateId" v-model="list" :prefix="prefix" @refresh="fetchData" />
		<div class="all-center table-page">
			<el-button type="primary" :loading="loading" @click="save" v-if="cateId">保存排序</el-button>
			<el-pagination
				background
				layout="prev, pager, next"
				v-else
				:total="total"
				:page-size="size"
				:current-page.sync="current"
			></el-pagination>
		</div>
	</PageHeader>
</template>

<script>
import api from '@/api'
import { cities } from '@/utils/enum'
import { mapState } from 'vuex'
import ResTable from './ResTable'

export default {
	name: 'CateList',
	components: {
		ResTable,
	},
	data() {
		return {
			loading: false,
			cateId: '',
			prefix: '/project/resource',
			content: '',
			total: 0,
			current: 1,
			size: 10,
			list: [],
			cityId: '',
			cities,
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
		async fetchData() {
			if (this.loading) return

			this.loading = true

			try {
				if (this.cateId) {
					this.fetchByCate()
				} else {
					this.loading = false
					const params = {
						current: this.current,
						size: this.size,
					}
					if (this.cityId) {
						params.cityId = this.cityId
					}
					const res = await api.resource.getList(params)
					this.list = res.records
					this.total = res.total
				}
			} catch (err) {
				console.log(err)
			}
			this.loading = false
		},
		async fetchByCate() {
			const params = {
				cateId: this.cateId,
			}
			const list = await api.resource.getListByCate(params)
			this.list = list
		},
		refresh() {
			this.current = 1
			this.fetchData()
		},
		async save() {
			this.loading = true
			try {
				await api.resource.updateMany({ list: this.list })
				this.$toast('更新成功')
			} catch (err) {
				console.log(err)
			}
			this.loading = false
		},
	},
	watch: {
		current(current) {
			this.fetchData()
		},
	},
}
</script>

<style lang="scss"></style>
