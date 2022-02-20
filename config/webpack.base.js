const path = require('path');
const packageInfo = require('../package.json');
const {
  ROOT_PATH,
  BUILD_PATH,
  APP_PATH,
  ANTD,
  NODE_MODULES
} = require('./paths');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const HappyPack = require('happypack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
function getEvn() {
  return (() => {
    if (process.env.CODE_ENV === 'dev' || process.env.CODE_ENV === 'local') {
      return 'dev';
    } else if (process.env.CODE_ENV === 'beta') {
      return 'qa';
    } else {
      return '';
    }
  })();
}
const isEnvDevelopment =
  process.env.CODE_ENV === 'dev' || process.env.CODE_ENV === 'local';
module.exports = {
  entry: {
    app: APP_PATH + '/main.tsx'
  },
  optimization: {
    splitChunks: {
      //可以在这里直接设置抽离代码的参数，最后将符合条件的代码打包至一个公共文件
      // chunks: 'all',
      // name: false,
      cacheGroups: {
        //设置缓存组用来抽取满足不同规则的chunk,下面以生成common、vender为例
        common: {
          name: 'common',
          chunks: 'initial',
          minSize: 1,
          minChunks: 2,
          priority: -20 //设置匹配优先级，数字越小，优先级越低
        },
        vendor: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/, //匹配node模块中匹配的的模块
          priority: -10, //设置匹配优先级，数字越大，优先级越高
          chunks: 'initial',
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  module: {
    rules: [
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isEnvDevelopment
            }
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'less-loader' // compiles Less to CSS
          }
        ],
        include: [ANTD]
      },
      {
        test: /\.(css|less)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isEnvDevelopment
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]-[hash:5]'
              }
            }
          },
          'less-loader', // compiles Less to CSS
          'postcss-loader'
        ],
        include: [APP_PATH]
      },
      {
        test: /\.(js|jsx)$/,
        use: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.(js|jsx)$/,
        include: [APP_PATH],
        use: [
          {
            loader: 'happypack/loader?id=happyBabel'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(ts|tsx)$/ ,
        use: ["ts-loader"],
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', ".ts", ".tsx"],
    alias: {
      '@src': APP_PATH,
      '@pages': APP_PATH + '/pages',
      '@router': APP_PATH + '/router',
      mobx: ROOT_PATH + '/node_modules/mobx/lib/mobx.es6.js',
      '@BuildCommonTask':
        APP_PATH + '/pages/appSecurity/jarPkgDetect/components/BuildTask',
      '@SimpleConfirmDialog':
        APP_PATH +
        '/pages/basisSecurity/weakPwdScan/components/SimpleConfirmDialog',
      '@DetailDialog':
        APP_PATH + '/pages/basisSecurity/hostLeakScan/components/DetailDialog'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new StyleLintPlugin({
      context: 'src',
      configFile: path.resolve(ROOT_PATH, './.stylelintrc.js'),
      files: '**/*.less',
      failOnError: false,
      quiet: true,
      fix: true
    }),
    new webpack.DefinePlugin({
      'process.env.CODE_ENV': JSON.stringify(process.env.CODE_ENV)
    }),
    new HappyPack({
      //用id来标识 happypack处理那里类文件
      id: 'happyBabel',
      //如何处理  用法和loader 的配置一样
      loaders: [
        {
          loader: 'babel-loader?cacheDirectory=true'
        }
      ],
      //共享进程池threadPool: HappyThreadPool 代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
      threadPool: happyThreadPool,
      //允许 HappyPack 输出日志
      verbose: true
    }),
    new HtmlwebpackPlugin({
      favicon: './favicon.ico',
      filename: 'index.html',
      template: ROOT_PATH + '/public/index.tpl',
      title: packageInfo.description,
      evn: getEvn(),
      minify: {
        collapseWhitespace: false // 对html不压缩
      }
    })
  ],
  performance: {
    hints: false
  }
};
