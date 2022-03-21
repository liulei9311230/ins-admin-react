/*
 * @Author: your name
 * @Date: 2022-03-08 23:08:30
 * @LastEditTime: 2022-03-12 22:15:20
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/store/reducer/PowerControl.ts
 */
import { PowerControlType } from '../types/PowerControlType';
import { PowerControlAction } from '../actions/PowerControlAction';
const powerControl = {
  powerList: [],
  powerUrl: [],
  allPowerUrl: [],
  powerListFlat: [],
  initMenuData: []
};

export default (state = powerControl, action: PowerControlAction) => {
  switch (action.type) {
    case PowerControlType.SET:
      return { ...state, ...action.data };
    default:
      return state;
  }
};
