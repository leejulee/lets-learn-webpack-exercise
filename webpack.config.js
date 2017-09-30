const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');

module.exports = {
    entry: {
        app: './src/index.js',
        about: './src/js/about.js',
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'sass-loader', options: { sourceMap: true } }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new CleanWebPackPlugin(['dist']),
        new ExtractTextPlugin('styles.css'),
        new HtmlWebPackPlugin({
            title: 'Multiple Bundles!'
        })
    ]
}