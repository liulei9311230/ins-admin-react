let BaseConfig = {
  // 开发模式配置
  hostTrack: '//192.168.199.24:8080/log-web/mlog', // 打点服务器配置
  host: '//dev-sec-xuanwu-comm.amh-group.com/', // 接口访问配置
  host2: '//dev-sec-xuanwu.amh-group.com/', // 接口访问配置, app审计，sql注入，xss, jar包检测
  host3: '//dev-sec-xuanwu-apis.amh-group.com', // 应用安全总览
  ssoHost: '//dev-sso.amh-group.com/', // sso登录地址
  pmHost: '//dev-pm.amh-group.com/', // sso登录地址
  mockhost: '//rap.amh-group.com/mockjs/87/',
  debug: true,
  develop: true
};
export default BaseConfig;
