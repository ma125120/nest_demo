export const domain =
	window._domain || process.env.NODE_ENV === 'development' ? '/proxy' : '' // `http://localhost:3001`
export const baseurl = `${domain}/end`
