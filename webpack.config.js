const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const srcPath = path.join(__dirname, 'assets');
const dstPath = path.join(__dirname, 'web');

const sassLoaders = [
    'css-loader?minimize',
    'sass-loader'
];

module.exports = {
    entry: {
        client: './assets/js/main.js'
    },
    module: {
        loaders: [
            {
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract(sassLoaders)
            },
            {
                test: /\.(png|jpg|bmp)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    devtool: 'source-map',
    output: {
         path: path.resolve(__dirname, 'web'),
         filename: './js/client.js',
    },
    devServer: {
        hot: true,
        //contentBase: path(__dirname, 'dist'),
        publicPath: '/',
        proxy: {
            '/': {
                target: 'http://localhost:8000',
                secure: false,
                changeOrigin: true,
            }
        },
    },
    plugins: [
        new ExtractTextPlugin({
            filename: './css/styles.css',
            allChunks: true
        })
    ]
};