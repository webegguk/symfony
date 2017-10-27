const path = require('path');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var HTMLWebpackPlugin = require('html-webpack-plugin');

var DEVELOPMENT = process.env.NODE_ENV === 'development';
var PRODUCTION = process.env.NODE_ENV === 'production';

const srcPath = path.join(__dirname, 'assets');
const dstPath = path.join(__dirname, 'web');

var entry = PRODUCTION
    ? ['./assets/js/main.js']
    : ['./assets/js/main.js',
        'webpack/hot/dev-server'];

var plugins = PRODUCTION
    ? [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('./css/styles-[contenthash:10].css'),
        new HTMLWebpackPlugin({
            title: 'Custom template',
            template: 'base.tp.html',
            path: path.resolve(__dirname, '/'),
            publicPath: path.resolve(__dirname, '/'),
            filename: path.join(__dirname, '/app/Resources/views/base.html.twig')
        })
    ]
    : [
        new ExtractTextPlugin('./css/styles.css'),
        new HTMLWebpackPlugin({
            title: 'Custom template',
            template: 'base.tp.html',
            path: path.resolve(__dirname, '/'),
            publicPath: path.resolve(__dirname, '/'),
            filename: path.join(__dirname, '/app/Resources/views/base.html.twig')
        })
    ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    })
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
    ? ExtractTextPlugin.extract(['css-loader?sourceMap&localIdentName=' + cssIdentifier, 'sass-loader'])
    : ['style-loader', 'css-loader?sourceMap&localIdentName=' + cssIdentifier, 'sass-loader'];

module.exports = {
    entry: entry,
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: cssLoader
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
        publicPath: path.resolve(__dirname, '/'),
        filename: PRODUCTION ? 'js/wp/client.[hash:12].min.js' : './js/wp/client.js'
    },
    devServer: {
        port: 8000,
        host: '127.0.0.1',
        historyApiFallback: true,
        proxy: {
            "/": {
                "target": {
                    "host": "http://127.0.0.1"
                }
            }
        }
    },
    plugins: plugins
};
