/*
 * @Author: lei.liu
 * @Date: 2022-03-08 18:35:30
 * @LastEditTime: 2022-03-13 12:25:31
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/Welcome.tsx
 */
import { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@src/store/actions/UserInfoAction';
import { setPowerControl } from '@src/store/actions/PowerControlAction';
import { getProductAll } from '@src/store/actions/ProductAction';

interface InitPageMenu {
  loadend: () => void;
  [propName: string]: any;
}
// interface TypeOfDispatch {
// 	setUserInfo: () => void;
// }

function Welcome(props: InitPageMenu) {
  useEffect(() => {
    props.setUserInfo();
    props.setPowerControl();
    props.getProdct();
  }, []);
  return (
    <>
      <Spin />
      <div>初始化中...</div>
    </>
  );
}

const mapDispatchToProps = (dispatch, { loadend }) => ({
  setUserInfo: () => {
    setUserInfo(dispatch);
  },
  setPowerControl: () => {
    setPowerControl(dispatch, loadend);
  },
  getProdct: () => {
    getProductAll(dispatch);
  }
});
export default connect<{}, {}, InitPageMenu>(null, mapDispatchToProps)(Welcome);
