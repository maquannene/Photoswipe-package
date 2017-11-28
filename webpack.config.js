var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenPackPlugin = require('openpack');

module.exports = {
    entry: {
      // vue: ['vue'],
      // path: __dirname+'/entry.js',
      path: __dirname+'/photo-package-entry.js',
    },
    output: {
        path: __dirname+'/dist',
        // filename: '[name].js',
        // chunkFilename: '[name].js',
        filename: 'photoswipe-package.js'
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
      // new webpack.optimize.CommonsChunkPlugin({
      //   names: ['vue']
      // }),
      // new HtmlWebpackPlugin({
      //   template: 'index.html'
      // }),
      // new OpenPackPlugin({
      //   lan: true
      // })
    ],
    devServer: {
      host: '0.0.0.0',
      port: 88
    }
};