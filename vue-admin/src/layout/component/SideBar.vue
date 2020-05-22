<template>
	<div :class="{ 'has-logo': showLogo }">
		<!-- <logo v-if="showLogo" :collapse="isCollapse" /> -->
		<el-scrollbar class="scrollbar-wrapper">
			<el-menu
				:default-active="activeMenu"
				:collapse="isCollapse"
				background-color="rgb(48, 65, 86)"
				text-color="rgba(255, 255, 255, .6)"
				:unique-opened="false"
				active-text-color="#fff"
				:collapse-transition="false"
				mode="vertical"
				router
			>
				<SideItem
					v-for="item in routes"
					:menu="item"
					:key="item.path"
				></SideItem>
			</el-menu>
		</el-scrollbar>
	</div>
</template>

<script>
import SideItem from './SideItem'

export default {
	name: 'SideBar',
	components: {
		SideItem,
	},
	data() {
		return {
			showLogo: false,
			// activeMenu: '/',
			isCollapse: false,
		}
	},
	created() {},
	computed: {
		routes() {
			return this.$store.state.routes
		},
		activeMenu() {
			return this.$route.path || '/'
		},
	},
	methods: {},
}
</script>

<style lang="scss">
.scrollbar-wrapper {
	// width: 227px;
	width: 160px;
	height: 100vh;
}
.el-scrollbar__wrap {
	overflow-x: hidden !important;
}
.el-scrollbar__view {
	height: 100%;
	overflow-x: hidden !important;
}
.el-menu {
	width: 100%;
	height: 100%;
	.el-menu-item:hover {
		background: #263445 !important;
	}
}
.el-menu-item {
	text-align: left;
}
.el-menu-item.is-active {
	background: #263445 !important;
}
</style>
