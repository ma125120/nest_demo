<template>
	<div class="page flex">
		<SideBar></SideBar>
		<div class="flex-1 column">
			<HeaderNav></HeaderNav>
			<AppMain></AppMain>
		</div>
	</div>
</template>

<script>
import SideBar from './component/SideBar'
import AppMain from './component/AppMain'
import HeaderNav from './component/HeaderNav'

export default {
	name: 'layout',
	components: {
		SideBar,
		AppMain,
		HeaderNav,
	},
	data() {
		return {}
	},
	created() {
		setTimeout(() => {
			this.$router.push('/login')
		}, 100)
	},
	methods: {},
}
</script>

<style lang="scss">
// .page {
// 	display: flex;
// }
</style>
