export const cities = [
	{ id: 1, name: '上海' },
	{ id: 2, name: '武汉' },
	{ id: 3, name: '杭州' },
	{ id: 4, name: '广州' },
]

const arr2obj = (arr, id = 'id', name = 'name') =>
	arr.reduce((prev, next) => ((prev[next[id]] = next[name]), prev), {})

export const cityObj = arr2obj(cities)
