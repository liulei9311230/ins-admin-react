/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-03 14:43:19
 * @LastEditTime: 2022-03-12 20:50:06
 * @LastEditors: Please set LastEditors
 */
import Cookies from 'js-cookie';

export function getEnv() {
  if (process.env.CODE_ENV === 'dev' || process.env.CODE_ENV === 'local') {
    return 'dev';
  }
  if (process.env.CODE_ENV === 'beta') {
    return 'qa';
  }
  return 'prod';
}

export const getPassport = () => {
  const cookieName = `passport_${getEnv()}`;
  return {
    Passport: Cookies.get(cookieName)
  };
};
