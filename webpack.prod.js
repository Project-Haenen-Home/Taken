const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
	mode: 'production',
	output: {
		filename: 'main.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
		clean: true
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
		new HtmlWebpackPlugin({
			title: "Taken @ HaenenHome",
			meta: { viewport: "width=device-width, initial-scale=1.0" },
			template: "./public/index.html",
			favicon: "./public/favicon.ico"
		}),
		new MiniCssExtractPlugin({
			filename: 'style.[contenthash].css'
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