/* eslint import/no-extraneous-dependencies: ["off"] */

const path              = require('path');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',

  entry: [
    'webpack-hot-middleware/client',
    'babel-polyfill',
    path.join(__dirname, '../../src/web/index.jsx'),
  ],

  module: {
    loaders: [

      // Process JS with Babel
      {
        test:    /\.jsx?$/,
        exclude: /node_modules/,
        loader:  'babel-loader',
        query:   {
          presets: ['es2015', 'react', 'stage-0'],
          plugins: [
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports:   ['react'],
                locals:    ['module'],
              }],
            }]],
        },
      },

    ],
  },

  output: {
    path:     path.join(__dirname, '../public'),
    filename: 'js/bundle.js',
  },

  plugins: [

    // Setup environment variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV:     JSON.stringify('development'),
        PLATFORM_ENV: JSON.stringify('web'),
      },
      __DEV__: true,
    }),

    // Build index.html
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject:   'body',
      template:  path.join(__dirname, '../../src/web/index.html'),
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // new webpack.NoEmitOnErrorsPlugin()
  ],

  resolve: {

    // Fixes React Navigation failing to find PlatformHelpers.web.js etc.
    extensions: ['.js', '.json', '.jsx', '.web.js'],

  },
};
