const merge = require('webpack-merge')
const common = require('./webpack.common')
// const fs = require('fs-extra')
const path = require('path')
// const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// const appDirectory = fs.realpathSync(process.cwd());
// const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// copyPublicFolder()

const prod = merge(common, {
    mode: 'production',
    // source-map -> run project will add .map file
    // inline-source-map -> run project will not add .map file, but contains in .js file
    // cheap-inline-source-map -> run project will not add .map file, but contains in .js file, when error will not console column only show row. 报错信息不会包含列信息，只包含行信息
    // cheap-module-source-map 包含第三方模块的映射
    // eval 打包速度最快，提示全
    devtool: 'none',
    plugins: [
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../public/'),
                    to: path.resolve(__dirname, '../dist')
                }
            ]
        }),
       /* new BundleAnalyzerPlugin({
            analyzerPort: 'auto'
        })*/
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_debugger: true,
                        drop_console: true
                    }
                }
            })
        ]
    }
})

module.exports = prod

/* function copyPublicFolder() {
    fs.copySync(resolveApp('public'), resolveApp('dist'), {
        dereference: true,
        filter: file => file !== '../public/index.html',
    });
} */
