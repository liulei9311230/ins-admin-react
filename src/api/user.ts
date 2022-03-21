/*
 * @Author: your name
 * @Date: 2022-03-09 09:53:57
 * @LastEditTime: 2022-03-12 21:30:52
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/api/user.ts
 */

import Server, { simpleServer } from '@src/tools/Server';
import Config from '@src/config';

export const getVerify = () => {
  return simpleServer(`${Config.ssoHost}sso/verify?passport=`);
};

export const hasPowerAxiosUrl = () => {
  return simpleServer(
    `${Config.pmHost}perm/exportV2/queryMenuTree?category=ins&flag=0`
  );
};

export const allPowerAxiosUrl = () => {
  return simpleServer(
    `${Config.pmHost}perm/exportV2/queryMenuTree?category=ins&flag=1`
  );
};

export const getProduct = () => {
  return Server({
    url: `${Config.host}insure-admin/insurance/product/hostmenu`,
    method: 'POST'
  });
};
