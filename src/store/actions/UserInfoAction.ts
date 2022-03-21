/*
 * @Author: lei.liu
 * @Date: 2022-03-09 10:17:00
 * @LastEditTime: 2022-03-12 21:03:32
 * @Description:
 * @FilePath: /ins-admin-react/src/store/actions/UserInfoAction.ts
 */
import { UserInfoType } from '../types/UserInfoType';
import { Modal } from 'antd';
import { Dispatch } from 'redux';
import { getVerify } from '@src/api/user';
import Config from '@src/config';

export interface UserInfoAction {
  type: UserInfoType;
  data?: any;
}

export const setUserInfo = (dispatch: Dispatch) => {
  getVerify().then(({ data }) => {
    let userInfo = data?.result?.user || {};
    if (userInfo.id) {
      // 存储用户信息
      dispatch({ type: UserInfoType.SET, data: userInfo });
    } else {
      logout();
    }
  });
};

export const logout = () => {
  Modal.warning({
    title: '重新登录',
    content: '认证失败,重新登录',
    onOk() {
      // 重新登录
      window.location.replace(
        `${Config.ssoHost}?url=${encodeURIComponent(window.location.href)}`
      );
    }
  });
};
