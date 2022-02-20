const path = require('path');
const fs = require('fs');
const appDirectory = fs.realpathSync(process.cwd());
const ROOT_PATH = path.resolve(appDirectory); // 根目录
module.exports = {
  ROOT_PATH: path.resolve(appDirectory), // 根目录
  BUILD_PATH: path.resolve(ROOT_PATH, 'dist'), // 打包目录
  APP_PATH: path.resolve(ROOT_PATH, 'src'), // src目录
  ANTD: path.resolve(ROOT_PATH, 'node_modules/antd'), // ant
  NODE_MODULES: path.resolve(ROOT_PATH, 'node_modules') // node_modules
};
