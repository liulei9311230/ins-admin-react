/*
 * @Author: lei.liu
 * @Date: 2022-03-11 15:32:02
 * @LastEditTime: 2022-03-11 16:59:21
 * @Description:
 * @FilePath: /ins-admin-react/src/routes/index.tsx
 */
import { lazy } from 'react';
import store from '../store';

export const getComponent = () => {
  const {
    PowerControl: { allPowerUrl }
  } = store.getState();
  return allPowerUrl.map(url => {
    let href = url.replace(/^#\//, '');
    return {
      path: `/${href}`,
      component: lazy(() => import(`@src/pages/${href}`))
    };
  });
};
