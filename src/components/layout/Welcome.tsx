/*
 * @Author: lei.liu
 * @Date: 2022-03-08 18:35:30
 * @LastEditTime: 2022-03-10 15:03:12
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/Welcome.tsx
 */
import { useEffect } from 'react';
import { Spin } from 'antd';
import { connect } from 'react-redux';
import { setUserInfo } from '@src/store/actions/UserInfoAction';
import { setPowerControl } from '@src/store/actions/PowerControlAction';

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
  }
});
export default connect<{}, {}, InitPageMenu>(null, mapDispatchToProps)(Welcome);
