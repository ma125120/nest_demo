<template>
	<el-select v-model="val" :placeholder="`请选择${this.text}`" clearable>
		<el-option v-for="item in list" :key="item.id + ''" :label="item.name" :value="item.id + ''"></el-option>
	</el-select>
</template>

<script>
import { cities } from '@/utils/enum'

export default {
	name: 'MySelect',
	props: {
		value: {
			default: '',
		},
		text: {
			default: '',
		},
		type: {
			default: '',
		},
		list: {
			type: Array,
			default() {
				return this.type === 'city' ? cities : []
			},
		},
	},
	model: {
		prop: 'value',
		event: 'change',
	},
	data() {
		return {
			val: '',
		}
	},
	created() {
		this.val = this.value + ''
	},
	watch: {
		val(val) {
			this.$emit('change', val)
		},
		value(value) {
			this.val = value + ''
		},
	},
	methods: {},
}
</script>

<style lang="scss">
.page-title {
	font-size: 24px;
	padding-left: 12px;
	margin-bottom: 12px;
	border-left: 4px solid var(--primary);
}
</style>
