/*
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-28 14:30:36
 * @LastEditTime: 2019-08-28 16:31:08
 * @LastEditors: Please set LastEditors
 */
import React from 'react';
import { Route } from 'react-router-dom';
import noPowerPage from '@src/components/layout/noPowerPage';
/****
 * 匹配路由，如果没有匹配的话则处理返回
 */
const RouteWithSubRouters = route => {
  if (route.nomatch) {
    // 404页面
    return (
      <Route
        render={props => <route.component {...props} routes={route.routes} />}
      />
    );
  } else {
    // 比较权限
    const href = '#' + route.location.pathname; // 当前url
    const allPowerUrl = route.allPowerUrl; // 所有可访问的页面url
    return (
      <Route
        exact={!!route.exact}
        path={route.path}
        render={props =>
          allPowerUrl.indexOf(href) == -1 ? (
            noPowerPage()
          ) : (
            <route.component {...props} routes={route.routes} />
          )
        }
      />
    );
  }
};
export default RouteWithSubRouters;
