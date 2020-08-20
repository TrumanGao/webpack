const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');

module.exports = {
    devServer: {
    //     contentBase: './dist',  //项目根路径
        open: true, // 自动拉起浏览器
        hot: true, // 热更新，然后自动刷新
    //     // hotOnly: true // 修改hot为支持热更新
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ],
    },
    plugins: [
        // HtmlWebpackPlugin 打包输出HTML
        // 主要有两个作用
        // 1. 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
        // 2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口
        new HtmlWebpackPlugin({
            title: 'index.html', // 生成html文件的标题
            template: './src/index.html', // html模板所在的文件路径
            filename: './index.html', // 输出的html的文件名称
            favicon: '', // 给生成的 html 文件生成一个 favicon 网页图标。属性值为 favicon 文件所在的路径名
            // 压缩HTML文件
            minify: {
                removeComments: true, // 移除HTML中的注释
                collapseWhitespace: true, // 删除空白符与换行符
                minifyCSS: true, // 压缩内联css
                removeEmptyAttributes: true, // 是否删除空属性，默认false
            },
            hash: true // hash选项的作用是 给生成的 js 文件一个独特的 hash 值，该 hash 值是该次 webpack 编译的 hash 值。默认值为 false 
        }),
        // 提取css成单独文件
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        // 热更新
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
}