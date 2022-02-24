/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-21 13:41:32
 * @LastEditTime : 2019-12-19 11:26:03
 * @LastEditors  : Please set LastEditors
 */
import { observable, action, runInAction } from 'mobx';
import Server from '../tools/Server';

class Store {
  @observable executePlans = [
    { name: '立即执行', value: 'Enable', disabled: false },
    { name: '按日执行', value: 'Daily', disabled: false },
    { name: '按周执行', value: 'Weekly', disabled: true },
    { name: '按月执行', value: 'Monthly', disabled: true }
  ];
  @observable execPlans = {
    Enable: '立即执行',
    Daily: '按日执行',
    Weekly: '按周执行',
    Monthly: '按月执行'
  };
  @observable levels = {
    Critical: ['严重', '#fc0d1b'],
    High: ['高危', '#fc673d'],
    Medium: ['中危', '#0b24fb'],
    Low: ['低危', '#0f7f12'],
    Info: ['信息', '#888']
  };
  @observable statuses = {
    checked: ['已确认', '#009901'],
    uncheck: ['未确认', '#FF0201'],
    ignore: ['已忽略', '#DEDEDE']
  };
  @observable scanStatuses = {
    init: '初始化',
    queued: '调度中',
    running: '进行中',
    completed: '成功',
    failed: '失败',
    paused: '中断',
    resuming: '重启中',
    postfail: '投递失败'
  };
  @observable scanTypes = {
    '0': '全扫描',
    '1': '高风险漏洞',
    '2': '跨站脚本漏洞',
    '3': 'sql注入漏洞',
    '4': '弱密码',
    '5': '爬虫抓取'
  };
  @observable detectStatuses = {
    pass: ['通过', '#009901'],
    failed: ['不通过', '#FF0201']
  };
  @observable detectResult = {
    manual_pass: ['复核通过', '#009901'],
    sqlmap_pass: ['通过', '#009901'],
    sqlmap_fail: ['不通过', '#FF0201'],
    unAccess: ['不可访问', '#0b24fb'],
    unknown: ['未检测', '#FF0201']
  };
  @observable examStatuses = {
    '1': ['通过', '#009901'],
    '0': ['未通过', '#ffd04b'],
    '-1': ['未参考', '#FF0201']
  };
  @observable reviewType = {
    inner: '内部评审',
    outer: '第三方评审'
  };
  @observable triggerType = {
    business: '业务触发',
    security: '安全触发',
    threshold: '阈值触发',
    system: '系统触发',
    purchase: '采购触发'
  };
  @observable reviewStatus = {
    created: '待发起',
    ready: '待领取',
    review: '评审中',
    check: '待验证',
    completed: '完成'
  };
  @observable sonarStatuses = {
    pass: ['通过', '#009901'],
    failed: ['不通过', '#FF0201'],
    ignore: ['忽略', '#DEDEDE'],
    misreport: ['误报', '#fc673d']
  };
  @observable redblackStatuses = {
    pass: ['通过', '#009901'],
    closed: ['审核关闭', '#fc673d'],
    unknown: ['未扫描', '#DEDEDE']
  };
  @observable questionListStatus = [
    '关闭',
    'New',
    '重新打开',
    '待开发',
    ' 开发中',
    '待上线',
    '已上线',
    '挂起',
    '已修复'
  ];
  @observable
  serviceTypes = [];
  @observable loadingServiceTypes = true;
  @action
  async getServiceTypes() {
    let { data } = await Server({
      hostType: 2,
      url: '/api/listServiceTypes',
      method: 'get'
    });
    runInAction(() => {
      this.serviceTypes = data.service_type || [];
      this.loadingServiceTypes = false;
    });
  }
  @observable serviceBuildTypes = [];
  @action
  async getServiceBuildTypes() {
    let { data } = await Server({
      hostType: 2,
      url: '/api/listServiceBuildTypes',
      method: 'get'
    });
    runInAction(() => {
      this.serviceBuildTypes = data.build_types || [];
      this.loadingServiceTypes = false;
    });
  }
}
const store = new Store();
export default store;
