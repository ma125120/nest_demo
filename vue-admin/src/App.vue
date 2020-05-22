<template>
	<div id="app">
		<router-view></router-view>
		<!-- <div id="container"></div> -->
	</div>
</template>

<script>
export default {
	name: 'app',
	created() {
		this.$store.commit(`generateRoutes`, this.$router.options.routes)
		this.$store.dispatch(`getCateList`)
	},
	mounted() {
		/* eslint-disable */
		// const centerPoint = [108.402634, 30.145682]
		// const companyes = [
		// 	{
		// 		id: 1,
		// 		name: '上海',
		// 		lon: 121.423922,
		// 		lat: 31.21409,
		// 	},
		// 	{
		// 		id: 2,
		// 		name: '武汉',
		// 		lon: 114.327279,
		// 		lat: 30.477878,
		// 	},
		// 	{
		// 		id: 3,
		// 		name: '杭州',
		// 		lon: 120.164332,
		// 		lat: 30.184949,
		// 	},
		// 	{
		// 		id: 4,
		// 		name: '广州',
		// 		lon: 113.412151,
		// 		lat: 23.130367,
		// 	},
		// ]
		// const map = new BMap.Map('container')
		// const point = new BMap.Point(centerPoint[0], centerPoint[1])
		// map.centerAndZoom(point, 6)
		// map.enableScrollWheelZoom(true)
		// // map.addControl(new BMap.NavigationControl())
		// companyes.forEach((v) => {
		// 	const point = new BMap.Point(v.lon, v.lat)
		// 	const text = new BMap.Label(`${v.name}预言软件有限公司`, {
		// 		position: point,
		// 		offset: new BMap.Size(-60, -28),
		// 	})
		// 	text.setStyle({
		// 		backgroundColor: '#333',
		// 		color: '#bbb',
		// 		padding: '4px 8px',
		// 		border: '0px',
		// 		borderRadius: '4px',
		// 	})
		// 	const text1 = new BMap.Label(``, {
		// 		position: point,
		// 	})
		// 	text1.setStyle({
		// 		backgroundColor: '#333',
		// 		width: '12px',
		// 		height: '12px',
		// 		border: '0px',
		// 		borderRadius: '50%',
		// 	})
		// 	map.addOverlay(text)
		// 	map.addOverlay(text1)
		// })
	},
}
</script>

<style>
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
#container {
	width: 100vw;
	height: 100vh;
}
</style>
