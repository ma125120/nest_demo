<template>
	<!-- el-table-draggable -->
	<component :is="drag ? 'el-table-draggable' : 'div'" @drop="changeList">
		<el-table :data="list" style="width: 100%" row-key="id" :height="$root.tableHeight">
			<el-table-column type="index" label="序号" width="60"></el-table-column>
			<el-table-column prop="sort" label="排序" width="60"></el-table-column>
			<el-table-column prop="cate.name" label="所属种类" width="120"></el-table-column>
			<!-- <el-table-column prop="sort" label="排序" width="100"></el-table-column> -->
			<el-table-column prop="desc" label="图片">
				<template slot-scope="scope">
					<el-image
						:src="scope.row.url | img"
						style="width: 200px; height: 100px"
						fit="cover"
						:preview-src-list="[$resolveImg(scope.row.url)]"
						lazy
					></el-image>
				</template>
			</el-table-column>
			<el-table-column prop="name" label="项目名称"></el-table-column>
			<el-table-column prop="desc" label="项目描述"></el-table-column>
			<el-table-column prop="dateStr" label="项目时间"></el-table-column>
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
	</component>
</template>

<script>
import api from '@/api'
export default {
	name: 'ResTable',
	model: {
		prop: 'list',
		event: 'change',
	},
	props: {
		list: {
			default() {
				return []
			},
		},
		prefix: {
			default: '',
		},
		drag: {
			default: false,
		},
	},
	data() {
		return {}
	},
	created() {},
	methods: {
		handleEdit(index, obj) {
			this.$router.push(`${this.prefix}/create?id=${obj.id}`)
		},
		async handleDelete(index, obj) {
			await api.resource.del(obj.id)
			this.$toast('删除成功')
			this.$$emit('refresh')
		},
		changeList(evt) {
			const len = evt.list.length
			const list = evt.list.map((v, i) => ({ ...v, sort: len - i }))

			this.$emit('change', list)
		},
	},
}
</script>

<style lang="scss"></style>
