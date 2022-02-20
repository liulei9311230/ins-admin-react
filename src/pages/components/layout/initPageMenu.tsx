
import { Modal, Spin } from 'antd';
import {useEffect} from 'react'
import Config from '@src/config';
import store from '@src/store';
import Server from '@src/tools/Server';
import {getUserInfo} from '@src/store/createActions'
import { connect } from 'react-redux'


function InitPage<T>(props: T) {

  const {setUserInfo} = props
  const getUser = () => {
    Server({
      ignoreCode: true,
      url: `${Config.ssoHost}sso/verify`,
      params: {
        passport: ''
      }
    })
      .then(({ data }) => {
        let userInfo = (data && data.result && data.result.user) || {};
        if (userInfo.id) {
          // 存储用户信息
          setUserInfo(userInfo);
        } else {
          logout();
        }
      })
      .catch(() => {
        logout();
      });
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

const stateToprops = (state) => state

const dispatchToprops = (dispatch) => {
  return {
    setUserInfo (v) {
      store.dispatch(getUserInfo(v))
    }
  }
}
 
export default connect(stateToprops, dispatchToprops)(InitPage);