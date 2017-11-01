var WebpackDevServer = require("webpack-dev-server");
var webpack = require("webpack");
var config = require("./webpack.config.js");
var path = require("path");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    hot: true,
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    stats: {
        colors: true
    },
    proxy: {
        "/": "http://0.0.0.0:8000"
    }
});

server.listen(8080, "127.0.0.1", function () {});
