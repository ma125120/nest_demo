'use strict'
const path = require('path')
// const defaultSettings = require("./src/settings.js");

function resolve(dir) {
	return path.join(__dirname, dir)
}

module.exports = {
	publicPath: './',
	outputDir: '../public/front',
	assetsDir: 'static',
	lintOnSave: process.env.NODE_ENV === 'development',
	productionSourceMap: false,
	devServer: {
		// port: port,
		open: true,
		overlay: {
			warnings: false,
			errors: true,
		},
		proxy: {
			'/proxy': {
				target: 'http://192.168.0.56:3001',
				ws: true,
				changeOrigin: true,
				pathRewrite: {
					'^/proxy': '',
				},
			},
		},
		// before: require('./mock/mock-server.js')
	},
	configureWebpack: {
		// provide the app's title in webpack's name field, so that
		// it can be accessed in index.html to inject the correct title.
		// name: name,
		resolve: {
			alias: {
				'@': resolve('src'),
			},
		},
	},
}
