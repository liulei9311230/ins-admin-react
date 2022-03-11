/*
 * @Author: your name
 * @Date: 2022-03-09 09:53:57
 * @LastEditTime: 2022-03-10 14:05:19
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/api/user.ts
 */

import Server from '@src/tools/Server';
import Config from '@src/config';

export const getVerify = () => {
  return Server({
    url: `${Config.ssoHost}sso/verify`,
    params: {
      passport: ''
    }
  });
};

export const hasPowerAxiosUrl = () => {
  return Server({
    url: `${Config.pmHost}perm/exportV2/queryMenuTree?category=ins&flag=0`,
    method: 'get'
  });
};

export const allPowerAxiosUrl = () => {
  return Server({
    url: `${Config.pmHost}perm/exportV2/queryMenuTree?category=ins&flag=1`,
    method: 'get'
  });
};
