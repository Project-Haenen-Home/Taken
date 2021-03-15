const { VueLoaderPlugin } = require("vue-loader");
const webpack = require("webpack");
var path = require('path');

module.exports = {
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@c": path.resolve(__dirname, "./src/components"),
            "@v": path.resolve(__dirname, "./src/views"),
            "@i": path.resolve(__dirname, "./src/assets/icons"),
            "@s": path.resolve(__dirname, "./src/assets/styles")
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    'babel-loader',
                    {
                        loader: 'ts-loader',
                        options: { appendTsSuffixTo: [/\.vue$/] }
                    }
                ],
            },
            {
                test: /\.svg$/,
                use: [
                    'vue-loader',
                    'vue-svg-loader'
                ],
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            __VUE_OPTIONS_API__: true,
            __VUE_PROD_DEVTOOLS__: false
        })
    ]
};