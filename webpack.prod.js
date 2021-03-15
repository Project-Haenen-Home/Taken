const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					MiniCssExtractPlugin.loader,
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
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style.css'
		}),
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		minimizer: [
			"...",
			new CssMinimizerPlugin()
		]
	}
});