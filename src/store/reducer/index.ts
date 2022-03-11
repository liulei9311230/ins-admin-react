/*
 * @Author: your name
 * @Date: 2022-03-08 22:49:44
 * @LastEditTime: 2022-03-09 15:55:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/store/reducer/index.ts
 */
import { combineReducers } from 'redux';
import PowerControl from './PowerControl';
import UserInfo from './UserInfo';

export default combineReducers({ PowerControl, UserInfo });
