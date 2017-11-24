var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    // entry: __dirname+'/myPhotoSwipeEntry.js',
    entry: __dirname+'/entry.js',
    output: {
        path: __dirname+'/dist',
        // filename: 'myPhotoswipe.js'
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/,loader: 'style-loader!css-loader'},
            {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
            {test: /\.svg/, loader: 'svg-url-loader'},
            {test: /\.vue/, loader: 'vue-loader'}
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
      })
    ],
    devServer: {
      host: '0.0.0.0',
      disableHostCheck: true, // 为了使用本机ip访问页面，关闭host检查
      port: 88
    }
};