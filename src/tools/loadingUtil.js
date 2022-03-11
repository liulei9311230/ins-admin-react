/*
 * @Author: lei.liu
 * @Date: 2022-02-20 22:39:02
 * @LastEditTime: 2022-03-10 09:49:48
 * @Description:
 * @FilePath: /ins-admin-react/src/tools/loadingUtil.js
 */
/**
 * 全局唯一的Loading显示隐藏工具类。
 * use:

 导入：import LoadingUtil from "./LoadingUtil";
 显示：LoadingUtil.showLoading();
 隐藏：LoadingUtil.hideLoading();
 */
import globalState from './globalState';
let LoadingUtil = {
  showLoading(timeOut = 10000) {
    globalState.mLoadingComponentRef &&
      globalState.mLoadingComponentRef.showLoading();
    // this.timerLoading = setTimeout(() => {
    //   this.hideLoading();
    // }, timeOut);
  },
  hideLoading() {
    globalState.mLoadingComponentRef &&
      globalState.mLoadingComponentRef.hideLoading();
    // this.timerLoading && clearTimeout(this.timerLoading);
  }
};

export default LoadingUtil;
