const path = require('path')

const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const outputDir = './dist'

module.exports = {
	entry: {
		xqwlight: 'xqwlight.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, outputDir)
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: ['babel-loader'],
				exclude: [/node_modules/, /assets/]
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(
			[path.basename(outputDir)],
			{root: path.dirname(path.resolve(__dirname, outputDir))}
		)
	],
	resolve: {
		modules: [
			path.resolve('./'),
			path.resolve('./src'),
			path.resolve('./node_modules')
		]
	}
}
