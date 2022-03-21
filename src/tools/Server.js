/**
 * Created with WebStorm.
 * User: stoneship
 * Email:258137678@qq.com
 * Date: 16/11/7
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
import axios from 'axios';
import { Modal } from 'antd';
import LoadingUtil from './loadingUtil';
import Config from '../config';
import qs from 'qs';
import { getPassport } from './Utils';

function Utf8ArrayToStr(array) {
  let out, i, len, c;
  let char2, char3;
  out = '';
  len = array.length;
  i = 0;
  while (i < len) {
    c = array[i++];
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        // 0xxxxxxx
        out += String.fromCharCode(c);
        break;
      case 12:
      case 13:
        // 110x xxxx   10xx xxxx
        char2 = array[i++];
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f));
        break;
      case 14:
        // 1110 xxxx  10xx xxxx  10xx xxxx
        char2 = array[i++];
        char3 = array[i++];
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        );
        break;
    }
  }
  return out;
}
let instance = axios.create({
  baseURL: Config.host,
  timeout: 3600 * 1000,
  headers: {},
  trimNull: true, // 是否去除空值
  withCredentials: true, // default
  needLoading: true, // 是否需要加载效果
  ignoreCode: false // 是否忽略服务端的错误提示
});
instance.interceptors.request.use(
  function(config) {
    if (config.needLoading) {
      LoadingUtil.showLoading();
    }
    config.data = config.data || {};
    if (config.trimNull && !(config.data instanceof window.FormData)) {
      let _data = Object.assign({}, config.data);
      isNull(_data);
      config.data = _data;
    }
    if (Config.mock) {
      config.withCredentials = false;
      config.url = config.url.replace(Config.host, Config.mockhost);
    }
    let headers = {};
    if (config.needPassPort !== false) {
      headers = getPassport();
    }
    config.headers = Object.assign(headers, config.headers);
    if (config.download) {
      config.responseType = 'arraybuffer';
    }
    if (
      config.headers['Content-Type'] === 'application/x-www-form-urlencoded'
    ) {
      config.data = qs.stringify(config.data);
    }
    return config;
    function isNull(obj) {
      for (let [key, value] of Object.entries(obj)) {
        if (value && typeof value == 'object' && !(value instanceof Date))
          isNull(value);
        if (value === '' && typeof value != 'number') {
          obj[key] = null;
        }
      }
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function(response) {
    if (response.config.needLoading) {
      LoadingUtil.hideLoading();
    }
    const { result, status, msg, errorMsg, errorCode } = response.data;
    let code = result === 0 ? '0' : result || '';
    code = status && status === 'ERROR' ? errorCode || '' : code;
    if (code && code !== 1 && !response.config.ignoreCode) {
      switch (code) {
        case 999:
          Modal.warning({
            title: '重新登录',
            content: '认证失败,重新登录',
            onOk() {
              // 重新登录
              window.location.replace(
                `${Config.ssoHost}?url=${encodeURIComponent(
                  window.location.href
                )}`
              );
            }
          });
          break;
        default:
          Modal.warning({
            title: '提示',
            content: msg || errorMsg
          });
      }
      return Promise.reject(response);
    } else {
      if (response.config.download) {
        try {
          createAndDownloadFile(response);
        } catch (e) {
          return Promise.reject(e);
        }
      }
      return response;
    }
  },
  function(error) {
    let status = error.response && error.response.status;
    let message = error.message || '请求失败,请联系管理员。';
    if (status !== 200) {
      switch (status) {
        case 401:
          Modal.warning({
            title: '重新登录',
            content: '认证失败,重新登录',
            onOk() {
              // 重新登录
              window.location.replace(
                `${Config.ssoHost}?url=${encodeURIComponent(
                  window.location.href
                )}`
              );
            }
          });
          break;
        case 403:
          Modal.warning({
            title: '您无权限',
            content: '您无权限访问该内容,请联系管理员分配权限',
            onOk() {}
          });
          break;
        case 404:
          Modal.warning({
            title: '提示',
            content: '接口地址不存在',
            onOk() {}
          });
          break;
        default:
          Modal.warning({
            title: '提示',
            content: msg || errorMsg
          });
      }
    }
    return Promise.reject(error);
  }
);

function createAndDownloadFile(res) {
  let filename = '';
  let type = res.headers['content-type'];
  filename =
    res.headers['content-disposition'] &&
    decodeURIComponent(
      res.headers['content-disposition'].match(/filename=(.+)/)[1]
    );
  let blob = new window.Blob([res.data], { type: type });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    window.navigator.msSaveBlob(blob, filename);
  } else {
    let URL = window.URL || window.webkitURL;
    let downloadUrl = URL.createObjectURL(blob);
    let a = document.createElement('a');
    if (filename) {
      if (typeof a.download === 'undefined') {
        window.location = downloadUrl;
      } else {
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
      }
    } else {
      let err;
      try {
        err = JSON.parse(Utf8ArrayToStr(new Uint8Array(res.data)));
      } catch (e) {}
      throw new Error((err && err.errorMsg) || '文件不存在');
    }
    setTimeout(function() {
      URL.revokeObjectURL(downloadUrl);
    }, 100); // cleanup
  }
}

export default instance;

export const simpleServer = function(url, config = {}, method = 'get') {
  return axios[method](url, {
    headers: {
      ...getPassport()
    },
    ...config
  });
};
