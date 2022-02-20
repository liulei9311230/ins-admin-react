const path = require('path');
const {
  ROOT_PATH,
  BUILD_PATH,
  APP_PATH,
  ANTD,
  NODE_MODULES
} = require('./paths');
const isWsl = require('is-wsl');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'none',
  output: {
    path: BUILD_PATH,
    filename: 'asset/js/[name].[chunkhash:8].js',
    chunkFilename: 'asset/js/[name][contenthash:8].chunk.js'
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: 8,
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
            drop_console: true,
            drop_debugger: true
          },
          mangle: {
            safari10: true
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true
          }
        },
        parallel: !isWsl,
        cache: true
      }),
      new OptimizeCssAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 200,
          name: 'asset/image/[name].[contenthash:5].[ext]'
        },
        include: [APP_PATH]
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'asset/fonts/[name].[contenthash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'asset/style/[name].[contenthash:5].css',
      chunkFilename: 'asset/style/[name].[contenthash:5].chunk.css'
    })
  ],
  stats: {
    // Add asset Information
    assets: true,
    // Add children information
    children: false,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    modules: false
  }
});
