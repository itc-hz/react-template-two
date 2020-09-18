const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')
const webpack = require('webpack')
const ManifestPlugin = require('webpack-manifest-plugin')

// console.log(paths.publicUrlOrPath.slice(0, -1))
module.exports = {
    entry: ['react-hot-loader/patch', './src/index.tsx'],
    module: {
        rules: [
            {
                test: /\.(png|jpeg|jpg|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        name: '[name]_[hash].[ext]',
                        outputPath: 'imgs',
                        limit: 8192
                    }
                }
            },
            {
                test: /\.(eot|ttf|svg|woff)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[contenthash].[ext]',
                        outputPath: 'fonts'
                    }
                }
            },
            {
                test: /\.css$/i,
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/braft-editor')],
                // exclude: /(node_modules)/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                        }
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/i,
                // exclude: [/(node_modules)/, path.resolve(__dirname, '../public')],
                // exclude: path.resolve(__dirname, '../public'),
                include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../node_modules/antd')],
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(sass|scss)$/i,
                exclude: /(node_modules)/,
                use: [
                    process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2,
                            // 0 => no loaders (default);
                            // 1 => postcss-loader;
                            // 2 => postcss-loader, sass-loader
                            localsConvention: 'camelCase',
                            modules: {
                                localIdentName: '[path][name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(tsx|ts)$/,
                loader: 'eslint-loader',
                enforce: 'pre',
                include: [path.resolve(__dirname, '../src')],
                options: {}
            },
            {
                test: /\.(tsx|ts)$/,
                exclude: [/(node_modules)/, path.resolve(__dirname, '../mock')],
                // include: path.resolve(__dirname, '../src'),
                use: {
                    loader: 'babel-loader',
                }
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json', '.less', '.scss', '.css'],
        alias: {
            'react-dom': '@hot-loader/react-dom',
        },
        plugins: [
            new TsconfigPathsPlugin({
                configFile: './tsconfig.json'
            })
        ]
    },
    output: {
        filename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            NODE_ENV: 'development' // use 'development' unless process.env.NODE_ENV is defined
        }),
        new HtmlWebpackPlugin({
            // auto insert entry url to index.html
            template: path.resolve(__dirname, '../public/index.html'),
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        new ManifestPlugin()
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                // 打包业务中公共代码
                common: {
                    name: 'common',
                    chunks: 'initial',
                    minSize: 1,
                    priority: 0,
                    minChunks: 2
                },
                // 打包第三方库的文件
                vendor: {
                    test: /[\\/]node_modules[\\/](react|react-dom|moment|react-pdf|antd|axios|braft-editor)[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        },
        runtimeChunk: {name: 'manifest'}
    }
}
console.log(process.env.NODE_ENV)
