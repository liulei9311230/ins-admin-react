/*
 * @Author: lei.liu
 * @Date: 2022-03-09 15:27:24
 * @LastEditTime: 2022-03-13 20:43:00
 * @Description:
 * @FilePath: /ins-admin-react/src/store/actions/powerControlAction.ts
 */

import { Dispatch } from 'redux';
import { hasPowerAxiosUrl, allPowerAxiosUrl } from '@src/api/user';
import { logout } from './UserInfoAction';
import { PowerControlType } from '../types/PowerControlType';

export interface PowerControlAction {
  type: PowerControlType;
  data?: any;
}

export const setPowerControl = (dispatch: Dispatch, initFun: () => void) => {
  Promise.all([hasPowerAxiosUrl(), allPowerAxiosUrl()]).then(
    ([hasPower, allPower]) => {
      const hasPowerData = hasPower.data;
      const allPowerData = allPower.data;
      const { data: hasPowerDataResult } = hasPowerData;
      const { data: allPowerDataResult } = hasPowerData;
      if (hasPowerData.error || allPowerData.error) {
        logout();
      } else {
        // 获取已有权限的所有权限码
        const powerList = getPowerList(hasPowerDataResult);
        // 获取当前用户已有权限的href地址集合
        const powerUrl = getPowerUrl(hasPowerDataResult);
        // 获取当用工程所配置的所有href地址集合
        const allPowerUrl = getPowerUrl(allPowerDataResult);
        // 权限code
        const powerListFlat = (powerList || []).map(
          v => (v && v.permissionCode) || v
        );
        // 初始化左侧菜单路存存到redux中
        dispatch({
          type: PowerControlType.SET,
          data: {
            powerList,
            powerUrl,
            allPowerUrl,
            powerListFlat,
            hasPowerDataResult
          }
        });
      }
      initFun();
    }
  );
};

// 获取菜单的权限码和按钮权限码。菜单权限码permissionCode, 按钮权限码specialPerm
const getPowerList = data => {
  return (function getList(dataPar) {
    return dataPar.reduce((list, item) => {
      const { permissionCode, specialPerm, child } = item;
      if (permissionCode) {
        list.push(permissionCode);
      }
      if (specialPerm && specialPerm.length > 0) {
        list = list.concat(specialPerm);
      }
      if (child && child.length > 0) {
        list = list.concat(getList(child));
      }
      return list;
    }, []);
  })(data);
};

// 获取菜单的权限url地址
const getPowerUrl = data => {
  const result = (function getList(dataPar) {
    return dataPar.reduce((list, item) => {
      let { href, child } = item;
      href = href && href.split('#')[1];
      href = href && href.substring(1, href.length);
      if (href) {
        list.push(href);
      }
      if (child && child.length > 0) {
        list = list.concat(getList(child));
      }
      return list;
    }, []);
  })(data);
  return result.concat(['home', 'noPage', 'noPowerPage']);
};
