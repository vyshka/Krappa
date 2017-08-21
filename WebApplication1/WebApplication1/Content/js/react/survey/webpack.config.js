var path = require('path')
var webpack = require('webpack')

module.exports = {
    entry: "./index.jsx",
    output: {
      path: __dirname + '/out',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /.jsx?$/,
          loader: 'babel-loader',
          exclude: /node_modules/
        }
      ]
    },
    stats: {
        warnings: false
    }
  };