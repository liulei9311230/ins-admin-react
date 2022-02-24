
import { Modal, Spin } from 'antd';
import {useEffect, useState} from 'react'
import Config from '@src/config';
import Server from '@src/tools/Server';
import { observer, inject } from 'mobx-react';
import routeMap from '@src/routes/routeMap';
import packageInfo from '../../../package.json';

function InitPage(props) {
  const arry: any[] = []
  const [state, setState] = useState({
    allPowerUrl: ['#/'],
    allPowerCode: arry,
    allSubMenu: {},
    allRootSubmenuKeys: arry
  })
  const getUser = () => {
    Server({
      // ignoreCode: true,
      url: `${Config.ssoHost}sso/verify`,
      params: {
        passport: ''
      }
    })
      .then(({ data }) => {
        let userInfo = (data && data.result && data.result.user) || {};
        if (userInfo.id) {
          // 存储用户信息
          props.userStore.setUserInfo(userInfo);
        } else {
          logout();
        }
      })
      .catch(() => {
        logout();
      });
      // 获取用户权限并处理
    getQueryMenuTree();
  }

  const getQueryMenuTree = () => {
    Server({
      url: `${Config.pmHost}perm/exportV2/queryMenuTree?category=${packageInfo.powerId}&flag=0`,
      method: 'get'
    }).then(res => {
      if (res.data && res.data.error) {
        if (res.data.error.code == 'LOGIN') {
          Modal.warning({
            title: '重新登录',
            content: '认证失败,重新登录',
            onOk() {
              // 重新登录
              window.location.replace(
                `${Config.ssoHost}?url=${encodeURIComponent(
                  window.location.href
                )}`
              );
            }
          });
          return;
        }
      }
      let data = (res.data && res.data.data) || [];
      // 缓存菜单树
      let cache = delIcons(data);
      props.userStore.setMenuData(cache);
      data.map(v => {
        let newState = state
        newState.allRootSubmenuKeys.push(v.id);
        setState(newState)
      });
      getPower(data);
      // 缓存所有可访问页面
      props.userStore.setAllPowerUrl(state.allPowerUrl);
      // 缓存所有权限
      props.userStore.setAllPowerCode(state.allPowerUrl);
      // 缓存所有的子菜单
      props.sliderStore.setAllRootSubmenuKeys(
        state.allRootSubmenuKeys
      );
      // 初始化完成
      props.loadend();
    });
    props.loadend()
  };

  const delIcons = data => {
    data.map(v => {
      for (let i = 0, len = routeMap.length; i < len; i++) {
        if (v.resName === routeMap[i].resName) {
          v.iconType = routeMap[i].iconType;
          return;
        }
      }
    });
    return data;
  }

  const getPower = data => {
    for (let i = 0, leng = data.length; i < leng; i++) {
      if (data[i].href) {
        let newState = state
        newState.allPowerUrl.push(data[i].href);
        setState(newState)
      }
      if (data[i].child) {
        getPower(data[i].child);
      }
      if (data[i].specialPerm) {
        let newState = state
        newState.allPowerCode.push(data[i].permissionCode);
        setState(newState)
        getPower(data[i].specialPerm);
      }
    }
  }
  useEffect(() => {
    getUser()
  }, [])

  const logout = () => {
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
  return (
    <div className="initpage">
      <div className="el-loading-demo">
        <Spin />
        <div className="desc">初始化中...</div>
      </div>
    </div>
  );
}
 
export default inject('userStore', 'appStore', 'sliderStore')(observer(InitPage));