<template>
	<div class="app-main">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: 'AppMain',
	data() {
		return {}
	},
	created() {},
	methods: {},
}
</script>

<style lang="scss">
.app-main {
	box-sizing: border-box;
	margin: 12px;
	padding: 12px 12px;
	box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.1);
	background: #fff;
	border-radius: 6px;
	flex: 1;
}
</style>
