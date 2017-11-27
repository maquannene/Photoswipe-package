var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenPackPlugin = require('openpack');

module.exports = {
    entry: __dirname+'/entry.js',
    // entry: __dirname+'/photo-package-entry.js',
    output: {
        path: __dirname+'/build',
        filename: 'build.js'
        // filename: 'photoswipe-package.js'
    },
    module: {
        loaders: [
            {test: /\.css$/,loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg/, loader: 'svg-url-loader'},
            {test: /\.vue/, loader: 'vue-loader'},
            {test: /\.js$/,use: ['babel-loader'],exclude: /node_modules/}
        ]
    },
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      }),
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),
      new OpenPackPlugin({
        lan: true
      })
    ],
    devServer: {
      host: '0.0.0.0',
      port: 88
    }
};