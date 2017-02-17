var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");



module.exports = {
    entry: './web/js/app.js',
    output: {
       // path: path.resolve(__dirname, 'build'),
        filename: 'app.bundle.js',
        path: 'web/build/',
        publicPath: '/build'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
            //    test: /\.css/,
             //   loader: ExtractTextPlugin.extract("css-loader")
            },
           // { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loaders: ['url-loader?limit=100000', 'file-loader']}
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map',
    plugins: [
  //      new ExtractTextPlugin("styles.css")
    ]
};


