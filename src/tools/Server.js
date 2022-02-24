/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-11 15:38:40
 * @LastEditTime: 2019-10-21 15:57:56
 * @LastEditors: Please set LastEditors
 */
import axios from 'axios';
import Config from '@src/config';
import { Modal } from 'antd';
import LoadingUtil from './loadingUtil';
import globalState from './globalState';
const TOKEN = 'ebfd64c0-318e-11e9-9dd4-8c16454a101b';
var instance = axios.create({
  baseURL: Config.host,
  timeout: 60 * 1000,
  headers: {},
  trimNull: false, // 是否去除空值
  withCredentials: true, // default
  needLoading: false, // 是否需要加载效果
  ignoreCode: false // 是否忽略服务端的错误提示
});

instance.interceptors.request.use(
  function(config) {
    config.data = config.data || {};
    config.data.token = TOKEN;
    config.method === 'get' && (config.url += '?token=' + TOKEN);
    if (config.trimNull && !(config.data instanceof window.FormData)) {
      let _data = Object.assign({}, config.data);
      isNull(_data);
      config.data = _data;
    }
    if (config.data instanceof window.FormData) {
      config.headers['content-type'] = 'application/x-www-form-urlencoded';
      config.data.append('token', TOKEN);
    }
    if (config.needLoading) {
      globalState.serverNum++;
      LoadingUtil.showLoading();
    }
    if (config.hostType) {
      config.baseURL = Config['host' + config.hostType];
      delete config.hostType;
    }
    if (config.download) {
      config['responseType'] = 'blob';
    }
    return config;
    function isNull(obj) {
      if (obj !== undefined && obj !== null) {
        for (let [key, value] of Object.entries(obj)) {
          if (typeof value == 'object' && !(value instanceof Date))
            isNull(value);
          if (typeof value != 'boolean' && !value && typeof value != 'number') {
            delete obj[key];
          }
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
      globalState.serverNum--;
      if (globalState.serverNum === 0) {
        LoadingUtil.hideLoading();
      }
    }
    var code = response.data.errcode === 0 ? '0' : response.data.errcode || '';
    if (code && code !== '0' && !response.config.ignoreCode) {
      // if (response.config.)
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
            title: '系统错误',
            content: `${response.data.message ||
              response.data.msg ||
              response.data.errorMsg ||
              '系统异常，请联系管理员。'}`,
            onOk() {}
          });
      }
      return Promise.reject(response);
    } else {
      if (
        response.data &&
        Object.prototype.toString.call(response.data) === '[object Object]'
      ) {
        // 补充协商字段message
        response.data = Object.assign(response.data, {
          message:
            response.data.message ||
            response.data.msg ||
            response.data.mgs ||
            '系统异常，请联系管理员'
        });
      }
      if (response.config.download) {
        createAndDownloadFile(response);
      }
      return response;
    }
  },
  function(error) {
    if (error.config && error.config.needLoading) {
      globalState.serverNum--;
      if (globalState.serverNum === 0) {
        LoadingUtil.hideLoading();
      }
    }
    var status = error.response && error.response.status;
    if (status !== 200) {
      if (status === 401) {
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
      } else if (status === 403) {
        Modal.warning({
          title: '您无权限',
          content: '您无权限访问该内容,请联系管理员分配权限',
          onOk() {}
        });
      } else {
        Modal.error({
          title: '系统错误',
          content: '尴尬了！系统发生异常，影响同学的工作，实在抱歉！！！',
          onOk() {
            console.log(JSON.stringify(error.response));
          }
        });
      }
    }
    return Promise.reject(error);
  }
);

export default instance;

function createAndDownloadFile(res) {
  let type = res.headers['content-type'];
  let contentDisposition = res.headers['content-disposition'];
  let filename = '';
  if (contentDisposition) {
    let reg = /filename\*=utf-8\'\'(.+)|filename\*=UTF-8\'\'(.+)|filename=(.+)/;
    let match = contentDisposition.match(reg);
    filename = decodeURIComponent(match[1] || match[2] || match[3]);
  }

  let blob = new window.Blob([res.data], { type: type + ';charset=utf-8' });
  if (typeof window.navigator.msSaveOrOpenBlob !== 'undefined') {
    window.navigator.msSaveOrOpenBlob(blob, filename);
  } else {
    let URL = window.URL || window.webkitURL;
    let downloadUrl = URL.createObjectURL(blob);
    if (filename) {
      let a = document.createElement('a');
      if (typeof a.download === 'undefined') {
        window.location.href = downloadUrl;
      } else {
        a.style.display = 'none';
        a.href = downloadUrl;
        a.download = filename;
        a.target = '_blank_' + new Date().valueOf();
        document.body.appendChild(a);
        a.click();
      }
      document.body.removeChild(a);
    } else {
      window.location = downloadUrl;
    }
    setTimeout(function() {
      URL.revokeObjectURL(downloadUrl);
    }, 100); // cleanup
  }
}
