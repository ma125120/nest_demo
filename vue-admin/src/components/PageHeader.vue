<template>
	<div class="page-header">
		<h3 class="page-title">{{ title || $route.meta.title }}</h3>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: 'PageHeader',
	props: {
		title: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			content: '',
		}
	},
	created() {
		// console.log(this.$route)
	},
	methods: {},
}
</script>

<style lang="scss">
.page-title {
	font-size: 24px;
	padding-left: 12px;
	margin-bottom: 24px;
	border-left: 4px solid var(--primary);
}
</style>
