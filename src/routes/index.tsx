/*
 * @Author: lei.liu
 * @Date: 2022-03-11 15:32:02
 * @LastEditTime: 2022-03-11 18:23:48
 * @Description:
 * @FilePath: /ins-admin-react/src/routes/index.tsx
 */
import { lazy } from 'react';
import store from '../store';

export const getComponent = () => {
  const {
    PowerControl: { allPowerUrl }
  } = store.getState();
  // const allPowerUrl = ['noPowerPage'];
  return allPowerUrl.map(url => {
    let href = url.replace(/^#\//, '');
    const Component = lazy(() => import(`@src/pages/${href}`));
    return {
      path: `/${href}`,
      component: <Component />
    };
  });
};
