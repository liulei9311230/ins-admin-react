/*
 * @Author: lei.liu
 * @Date: 2022-03-12 20:25:32
 */
let BaseConfig = {
  // 开发模式配置
  hostTrack: '//192.168.199.24:8080/log-web/mlog', // 打点服务器配置
  host: '//dev-boss.mbib.com.cn/', // 接口访问配置
  // host: '//192.168.206.157:8888/',
  ssoHost: '//dev-sso.mbib.com.cn/', // sso登录地址
  pmHost: '//dev-pm.ll.com/', // sso登录地址
  homeHost: '//dev-home.ll.com/', // 满满家接口
  ymm56: '//dev.ymm56.com/', // ymm56
  caseHost: '//dev-case.ll.com/',
  customerHost: '//dev-boss.ll.com/',
  pscHost: '//dev-psc.ll.com/',
  mockhost: '//rap.ymmoa.com/mockjs/87/',
  thaadhost: '//dev-thaad.ll.com/',
  debug: true,
  develop: false
};
export default BaseConfig;
