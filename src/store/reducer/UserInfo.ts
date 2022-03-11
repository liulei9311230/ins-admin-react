/*
 * @Author: your name
 * @Date: 2022-03-08 23:08:06
 * @LastEditTime: 2022-03-09 10:35:46
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/store/reducer/userInfo.ts
 */
import { UserInfoType } from '../types/UserInfoType';
import { UserInfoAction } from '../actions/UserInfoAction';

const userInfo = {
  id: 0,
  name: '',
  gender: 1,
  avatarUrl: '',
  jobNumber: ''
};

export default (state = userInfo, action: UserInfoAction) => {
  switch (action.type) {
    case UserInfoType.GET:
      return { ...state };
    case UserInfoType.SET:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
