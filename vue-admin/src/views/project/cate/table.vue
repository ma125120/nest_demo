<template>
	<PageHeader>
		<!-- <h1>职位信息</h1> -->
		<div class="between-center table-top">
			<div>
				<!-- <MySelect
					v-model="cityId"
					:list="cities"
					text="城市"
					@change="refresh"
				></MySelect>-->
			</div>
			<div>
				<el-button type="primary" @click="$router.push(`/project/cate/create`)">新建</el-button>
			</div>
		</div>
		<el-table :data="list" style="width: 100%" :height="$root.tableHeight">
			<el-table-column type="index" label="序号" width="60"></el-table-column>
			<el-table-column prop="name" label="名称" width="180" />
			<el-table-column prop="title" label="标题" width="180" />
			<el-table-column prop="desc" label="描述">
				<!-- <template slot-scope="scope">
					<div v-html="scope.row.content"></div>
				</template>-->
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
import { mapActions, mapState } from 'vuex'

export default {
	name: 'CateList',
	data() {
		return {
			content: '',
			total: 0,
			current: 1,
			size: 10,
			// list: [],
			cityId: '',
			cities,
		}
	},
	created() {
		this.getCateList()
	},
	computed: {
		...mapState({
			list: 'cates',
		}),
	},
	methods: {
		...mapActions(['getCateList']),
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
				const res = await api.cate.getList(params)
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
			console.log(`/project/cate/create?id=${obj.id}`)
			this.$router.push(`/project/cate/create?id=${obj.id}`)
		},
		async handleDelete(index, obj) {
			await api.cate.del(obj.id)
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
