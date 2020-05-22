<template>
	<div class="page">
		<h1>用户详情页</h1>
		<TinyMce v-model="content"></TinyMce>
	</div>
</template>

<script>
export default {
	name: 'UserTable',
	data() {
		return {
			content: '',
		}
	},
	created() {},
	methods: {},
}
</script>

<style lang="scss"></style>
