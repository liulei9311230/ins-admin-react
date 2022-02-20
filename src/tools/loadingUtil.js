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
