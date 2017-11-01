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
    : ['./assets/js/main.js'];

var plugins = PRODUCTION
    ? [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('./css/styles-[contenthash:10].css')
    ]
    : [
        new ExtractTextPlugin('./css/styles.css')
    ];

plugins.push(
    new webpack.DefinePlugin({
        DEVELOPMENT: JSON.stringify(DEVELOPMENT),
        PRODUCTION: JSON.stringify(PRODUCTION)
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
        // In case you imported plugins individually, you must also require them here:
        Util: "exports-loader?Util!bootstrap/js/dist/util",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown"
    }),
    new HTMLWebpackPlugin({
        title: 'Custom template',
        template: 'base.tp.html',
        path: path.resolve(__dirname, '/'),
        publicPath: path.resolve(__dirname, '/'),
        filename: path.join(__dirname, '/app/Resources/views/base.html.twig')
    }),
    new webpack.HotModuleReplacementPlugin()
);

const cssIdentifier = PRODUCTION ? '[hash:base64:10]' : '[path][name]---[local]';

const cssLoader = PRODUCTION
    ? ExtractTextPlugin.extract(['css-loader?sourceMap&localIdentName=' + cssIdentifier, 'sass-loader?sourceMap'])
    : ['style-loader', 'css-loader?sourceMap&localIdentName=' + cssIdentifier, 'sass-loader?sourceMap'];

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
        hot:true,
        port: 8080,
        host: '127.0.0.1',
        historyApiFallback: true,
        proxy: {
            "/": "http://0.0.0.0:8000"
        }
    },
    plugins: plugins
};
