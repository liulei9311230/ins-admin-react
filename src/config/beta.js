let BaseConfig = {
  // 开发模式配置
  host: '//qa-sec-xuanwu-comm.amh-group.com/',
  host2: '//qa-sec-xuanwu.amh-group.com/', // 接口访问配置, app审计，sql注入，xss, jar包检测
  host3: '//qa-sec-xuanwu-apis.amh-group.com', // 应用安全总览
  ssoHost: '//qa-sso.amh-group.com/',
  pmHost: '//qa-pm.amh-group.com/', // sso登录地址
  debug: true,
  develop: false
};
export default BaseConfig;
