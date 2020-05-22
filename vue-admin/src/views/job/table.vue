<template>
	<PageHeader>
		<!-- <h1>职位信息</h1> -->
		<div class="between-center table-top">
			<div>
				<MySelect v-model="cityId" :list="cities" text="城市" @change="refresh"></MySelect>
			</div>
			<div>
				<el-button type="primary" @click="$router.push(`/job/create`)">新建</el-button>
			</div>
		</div>
		<el-table :data="list" style="width: 100%" :height="$root.tableHeight">
			<el-table-column type="index" label="序号" width="60"></el-table-column>
			<el-table-column prop="city" label="所属城市" width="180" />
			<el-table-column prop="name" label="职位名称" width="180" />
			<el-table-column prop="content" label="职位描述">
				<template slot-scope="scope">
					<div v-html="scope.row.content"></div>
				</template>
			</el-table-column>
			<el-table-column label="操作">
				<template slot-scope="scope">
					<el-button
						style="margin-right: 6px"
						size="mini"
						@click="handleEdit(scope.$index, scope.row)"
					>编辑</el-button>
					<el-popconfirm title="确定删除吗？" @onConfirm="handleDelete(scope.$index, scope.row)">
						<el-button size="mini" type="danger" slot="reference">删除</el-button>
					</el-popconfirm>
				</template>
			</el-table-column>
		</el-table>
		<div class="all-center table-page">
			<el-pagination
				background
				layout="prev, pager, next"
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

export default {
	name: 'UserTable',
	data() {
		return {
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
	methods: {
		async fetchData() {
			if (this.loading) return

			this.loading = true

			try {
				this.loading = false
				const params = {
					current: this.current,
					size: this.size,
				}
				if (this.cityId) {
					params.cityId = this.cityId
				}
				const res = await api.job.getJobList(params)
				this.list = res.records
				this.total = res.total
			} catch (err) {
				console.log(err)
			}
		},
		refresh() {
			this.current = 1
			this.fetchData()
		},
		handleEdit(index, obj) {
			this.$router.push(`/job/create?id=${obj.id}`)
		},
		async handleDelete(index, obj) {
			await api.job.del(obj.id)
			this.$toast('删除成功')
			this.fetchData()
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
