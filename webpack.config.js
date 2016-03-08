var path = require('path');

var port = process.env.PORT || 2000;
var host = process.env.IP || '127.0.0.1';

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    './client/favicon.ico',
    './client/src/styles/main.scss',
    './client/index.html',
    'eventsource-polyfill', // necessary for hot reloading with IE
    './client/src/index',
  ],
  output: {
    path: __dirname + '/client/build',
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'client/src'),
      query: {
        presets: [ 'es2015', 'react' ]
      }
    }, {
      test: /\.html$/,
      loader: 'file'
    }, {
      test: /\.scss$/,
      loaders: ['style', 'css', 'sass']
    }, {
      test: /\.(png|jpg)$/,
      loader: 'url'
    }, {
      test: /\.ico$/,
      loader: 'file'
    }]
  },
  resolve: {
    root: path.resolve('./client/src'),
  },
  devServer: {
    port: port,
    host: host
  }
}
