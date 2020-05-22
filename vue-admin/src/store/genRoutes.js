import path from 'path'
const resolve = (basePath, filePath) => {
	basePath = basePath === true ? '' : basePath
	filePath = filePath.replace(/^\//g, '')

	return path.resolve(basePath, filePath)
}

export const onlyOneShowingChildFn = (children = [], parent) => {
	let onlyOneChild = null
	const showingChildren = children.filter((item) => !item.hidden)

	// When there is only one child route, the child route is displayed by default
	if (showingChildren.length === 1) {
		onlyOneChild = showingChildren[0]
		onlyOneChild.path = path.resolve(parent.path, onlyOneChild.path)
		return onlyOneChild
	}

	// Show parent if there are no child route to display
	if (showingChildren.length === 0) {
		onlyOneChild = { ...parent, path: '', noShowingChildren: true }
		return onlyOneChild
	}

	return false
}
export const generateRoutes = (routes, basePath = '/') => {
	const res = []

	for (let route of routes) {
		// skip some route
		if (route.hidden) {
			continue
		}

		const onlyOneShowingChild = onlyOneShowingChildFn(route.children, route)

		if (route.children && onlyOneShowingChild && !route.alwaysShow) {
			route = onlyOneShowingChild
		}

		const data = {
			path: resolve(basePath, route.path),
			title: route.title || (route.meta && route.meta.title),
		}

		// recursive child routes
		if (route.children) {
			data.children = generateRoutes(route.children, data.path)
		}
		res.push(data)
	}
	return res
}
