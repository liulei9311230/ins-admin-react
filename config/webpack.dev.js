const path = require('path');
const {
  ROOT_PATH,
  BUILD_PATH,
  APP_PATH,
  ANTD,
  NODE_MODULES
} = require('./paths');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const webpack = require('webpack');
const baseConfig = require('./webpack.base');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');

module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'source-map',
  output: {
    path: BUILD_PATH,
    filename: 'asset/js/[name].js',
    chunkFilename: 'asset/js/[name].chunk.js'
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 200,
          name: 'asset/image/[name].[ext]'
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
              name: 'asset/fonts/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    port: 8980,
    publicPath: '/',
    // 热替换
    hot: true,
    open: true,
    overlay: false,
    // host: 'web.amh-group.com',
    https: true
  },
  stats: {
    colors: true,
    // Add asset Information
    assets: false,
    // Add children information
    children: false,
    // Add chunk information (setting this to `false` allows for a less verbose output)
    chunks: false,
    modules: false
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin((percentage, msg) => {
      const stream = process.stderr;
      if (stream.isTTY && percentage < 1) {
        stream.cursorTo(0);
        stream.write(
          `${chalk.magenta(msg)} ${chalk.magenta(~~(percentage * 100) + '%')}`
        );
        stream.clearLine(1);
      } else if (percentage === 1) {
        console.log(chalk.green('\nwebpack: bundle build is now finished.'));
      }
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'asset/style/[name].css',
      chunkFilename: 'asset/style/[name].chunk.css'
    })
  ]
});
