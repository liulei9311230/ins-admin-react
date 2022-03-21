/**
 * Created with WebStorm.
 * User: stoneship
 * Email:258137678@qq.com
 * Date: 16/5/7
 * Time: 下午3:13
 * To change this template use File | Settings | File Templates.
 */
let BaseConfig = {
  // 开发模式配置
  hostTrack: '//192.168.199.24:8080/log-web/mlog', // 打点服务器配置
  host: '//qa-boss.LL.com.cn/', // 接口访问配置
  // host: '//192.168.206.157:8888/',
  ssoHost: '//qa-sso.LL.com.cn/', // sso登录地址
  pmHost: '//qa-pm.ll.com/', // sso登录地址
  homeHost: '//qa-home.ll.com/', // 满满家接口
  LL: '//dev.LL.com/', // LL
  caseHost: '//dev-case.ll.com/',
  customerHost: '//qa-boss.ll.com/',
  pscHost: '//dev-psc.ll.com/',
  mockhost: '//rap.ymmoa.com/mockjs/87/',
  thaadhost: '//dev-thaad.ll.com/',
  debug: true,
  develop: true
};
export default BaseConfig;
