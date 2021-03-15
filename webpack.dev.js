const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
var path = require('path');

module.exports = merge(common, {
	target: "web",
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, 'dev'),
		port: 1000,
		hot: true,
		open: false,
		historyApiFallback: true
	},
	devtool: "eval-source-map",
	resolve: {
		alias: {
			vue: "@vue/runtime-dom"
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
				  	'vue-style-loader',
				  	'css-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"vue-style-loader",
					"css-loader",
					{
						loader: "sass-loader",
						options: {
							additionalData: '@import "@s/_variables.scss";'
						}
					}
				]
			}
		]
	}
});