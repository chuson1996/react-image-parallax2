'use strict';

process.env.NODE_ENV = process.env.NODE_ENV || 'production';

// var webpack = require('webpack');
var path = require('path');

// currently, this is for bower
var config = {
  devtool: 'sourcemap',
  entry: {
    index: './src/react-image-parallax2.js'
  },
  output: {
    path: path.join(__dirname, 'lib'),
    publicPath: 'lib/',
    filename: 'react-image-parallax2.js',
    sourceMapFilename: 'react-image-parallax2.map',
    library: 'ReactFoldImage',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [{
      test: /\.(js|jsx)/,
      loader: 'babel'
    }]
  },
  plugins: [],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  externals: {
    'react': {
      root: 'React',
      commonjs2: 'react',
      commonjs: 'react',
      amd: 'react'
    },
    'styled-components': 'styled-components',
  }
};

module.exports = config;