/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 14:43:19
 * @LastEditTime: 2019-12-16 17:05:54
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Select } from 'antd';
const { Option } = Select;
const Utils = {
  formatValueWithRule: (value, seq = ',') => {
    let str =
      value &&
      value.replace &&
      value
        .replace(/\n{2,}/g, '\n')
        .replace(/\n$/g, '')
        .replace(/\n/g, seq)
        .replace(/\s/g, '');
    return str || '';
  },
  validateProtocols: (rule, value, callback, source, options, seq = ',') => {
    let isLegal = true;
    if (value) {
      let attr = Utils.formatValueWithRule(value, seq).split(seq);
      isLegal = attr.every(function(item) {
        return /((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}/g.test(
          item
        );
      });
    }
    !isLegal ? callback(rule.message || '请输入合法的格式!') : callback();
  },
  validateInputChar: (rule, value, callback, source, options, limit = 50) => {
    let regex = /[\u4e00-\u9fa5]+/g; // 中文正则
    let total = (value && value.length) || 0;
    let arr = (value && value.match(regex)) || [];
    let cLen = arr.join('').length;
    if (
      total &&
      (total > limit || (total < limit && total - cLen + cLen * 2 > limit))
    ) {
      callback(`不能大于${limit}个字符`);
      return;
    }
    callback();
  },
  getStatusDesc: status => {
    let desc = '';
    switch (status) {
      case 'init':
        desc = '初始化';
        break;
      case 'queued':
        desc = '调度中';
        break;
      case 'running':
        desc = '进行中';
        break;
      case 'completed':
        desc = '成功';
        break;
      case 'failed':
        desc = '失败';
        break;
      case 'paused':
        desc = '中断';
        break;
      case 'resuming':
        desc = '重启中';
        break;
      case 'postfail':
        desc = '投递失败';
        break;
      default:
        desc = '';
    }
    return desc;
  },
  getStatusOptions: () => {
    return [
      <Option key="init" value="init">
        初始化
      </Option>,
      <Option key="queued" value="queued">
        调度中
      </Option>,
      <Option key="running" value="running">
        进行中
      </Option>,
      <Option key="completed" value="completed">
        成功
      </Option>,
      <Option key="failed" value="failed">
        失败
      </Option>,
      <Option key="paused" value="paused">
        中断
      </Option>,
      <Option key="resuming" value="resuming">
        重启中
      </Option>,
      <Option key="postfail" value="postfail">
        投递失败
      </Option>
    ];
  },
  getReviewTypeDesc: status => {
    let desc = '';
    switch (status) {
      case 'outer':
        desc = '第三方评审';
        break;
      case 'inner':
        desc = '内部评审';
        break;
    }
    return desc;
  },
  getTriggerTypeDesc: status => {
    let desc = '';
    switch (status) {
      case 'security':
        desc = '安全触发';
        break;
      case 'business':
        desc = '业务触发';
        break;
      case 'threshold':
        desc = '阈值触发';
        break;
      case 'system':
        desc = '系统触发';
        break;
      case 'purchase':
        desc = '采购触发';
        break;
    }
    return desc;
  },
  /**
   * 功能：解析URL参数
   * 参数：需要取得的参数ID
   */
  URL_Request: paras => {
    var url = window.location.hash;
    while (url.indexOf('%') > -1) {
      url = decodeURIComponent(url);
    }
    var paraString = url.substring(url.indexOf('?') + 1, url.length).split('&');
    var paraObj = {};
    for (var i = 0; i < paraString.length; i++) {
      var j = paraString[i];
      paraObj[j.substring(0, j.indexOf('=')).toLowerCase()] = j.substring(
        j.indexOf('=') + 1,
        j.length
      );
    }
    var returnValue = paraObj[paras.toLowerCase()];
    return returnValue;
  },
  /**
   * 减法
   * @param arg1
   * @param arg2
   */
  digitMinus: function(arg1, arg2) {
    var r1, r2, m, n;
    try {
      r1 = arg1.toString().split('.')[1].length;
    } catch (e) {
      r1 = 0;
    }
    try {
      r2 = arg2.toString().split('.')[1].length;
    } catch (e) {
      r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = r1 >= r2 ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
  },

  /**
   * 除法
   * @param arg1
   * @param arg2
   */
  digitDiv: function(arg1, arg2) {
    var t1 = 0,
      t2 = 0,
      r1,
      r2;
    try {
      t1 = arg1.toString().split('.')[1].length;
    } catch (e) {}
    try {
      t2 = arg2.toString().split('.')[1].length;
    } catch (e) {}

    r1 = Number(arg1.toString().replace('.', ''));
    r2 = Number(arg2.toString().replace('.', ''));
    return Utils.digitMul(r1 / r2, Math.pow(10, t2 - t1));
  },
  /**
   * 乘法
   * @param arg1
   * @param arg2
   */
  digitMul: function(arg1, arg2) {
    var m = 0,
      s1 = arg1.toString(),
      s2 = arg2.toString();
    try {
      m += s1.split('.')[1].length;
    } catch (e) {}
    try {
      m += s2.split('.')[1].length;
    } catch (e) {}
    return (
      (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
      Math.pow(10, m)
    );
  }
};
export default Utils;
