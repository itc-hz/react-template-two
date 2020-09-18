const merge = require('webpack-merge')
const common = require('./webpack.common')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const webpack = require('webpack')
const path = require('path')

module.exports = merge(common, {
    mode: 'development',
    // 'cheap-module-eval-source-map'
    // source-map -> run project will add .map file
    // inline-source-map -> run project will not add .map file, but contains in .js file
    // cheap-inline-source-map -> run project will not add .map file, but contains in .js file, when error will not console column only show row. 报错信息不会包含列信息，只包含行信息
    // cheap-module-source-map 包含第三方模块的映射
    // eval 打包速度最快，提示全
    devtool: 'cheap-module-eval-source-map',
    // 监测到变化会强制刷新页面
    devServer: {
        // publicPath: '/public',
        contentBase: path.join(__dirname, '../public'),
        port: 8001,
        hot: true,
        // 可在局域网内使用
        host: '0.0.0.0',
        // hotOnly: true
        compress: true,
        proxy: {
            '/meetingcloud': {
                target: 'http://localhost:3000'
            }
        }
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new ErrorOverlayPlugin()
    ],
    optimization: {
        usedExports: true
    }
})
