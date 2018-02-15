/*
    ./webpack.config.js
*/
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const WebpackShellPlugin = require('webpack-shell-plugin')
const dev_stats = require('./dev_stats')
const cleanWebPack = new CleanWebpackPlugin(['dist'])
const scopeHoist = new webpack.optimize.ModuleConcatenationPlugin()
const webpackUgly = new webpack.optimize.UglifyJsPlugin()

const extractSass = new ExtractTextPlugin({
    filename: '[name].[contenthash].css',
    disable: process.env.NODE_ENV === 'development'
})

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './app/index.html',
  title: 'ParDat',
  favicon: './app/src/assets/img/favicon.png',
  filename: 'index.html',
  inject: 'body'
})

const runShell =  new WebpackShellPlugin({
  onBuildStart: ['echo \x1B[01;93m  ParDat v3.0.1 \x1B[0m']
})

// ####################
// ###### CONFIG ######
// ####################

const config = {

  entry: {
    index: './app/index.js'
  },
  
  devServer: {
    historyApiFallback: true,
    stats: dev_stats,
    port: 3300
  },

  // cheap-module-eval-source-map
  devtool: 'cheap-module-eval-source-map',
  
  node: {
    fs: 'empty'
  },

  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', query: {presets:[ 'es2015', 'react', 'stage-2' ]}, exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader'},
      { test: /\.scss$/, use: [{loader: 'style-loader'}, 
      {loader: 'css-loader'}, {loader: 'sass-loader', options: {includePaths: ['/app/src/assets/scss', 'absolute/path/b']}}]},
      { test: /\.(png|jpg|gif)$/, use: [{loader: 'file-loader', options: {}}]},
      { test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
            publicPath: '../'
          }
        }]
      }
    ]
  },

  plugins: [
    //  openBrowser,
    HtmlWebpackPluginConfig,
    extractSass,
    // statsplug,
    cleanWebPack, 
    runShell
  ],

  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js',
    publicPath: '/'
  }
}


if (process.env.NODE_ENV === 'production') {
  config.plugins.push(webpackUgly)
  config.plugins.push(scopeHoist)
}

module.exports = config

