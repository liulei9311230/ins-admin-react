/**
 * Created By dagan
 * DateTime 2019/05/17 13:36
 * Describe 异步组件创建
 */

import React, { Component } from 'react';
import Server from '@src/tools/Server';
import noPowerPage from '@src/components/layout/noPowerPage';
import Config from '@src/config';
import { Modal } from 'antd';
export default function asyncComponent(importComponent) {
  class AsyncComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        component: null
      };
    }
    /***
     * 鉴权
     */
    authentication = () => {
      const cururl = window.location.href;
      return new Promise((resolve, rej) => {
        Server({
          hostType: '2',
          url: '/management/sso_login/',
          method: 'get',
          params: {
            cururl: cururl
          }
        }).then(res => {
          resolve(res.data);
        });
      });
    };
    async componentDidMount() {
      const { default: component } = await importComponent();
      const code = await this.authentication();
      if (!code) {
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
      } else {
        this.setState({
          component: code !== 'permissionDenied' ? component : noPowerPage
        });
      }
    }

    render() {
      const C = this.state.component;

      return C ? <C {...this.props} /> : null;
    }
  }

  return AsyncComponent;
}
