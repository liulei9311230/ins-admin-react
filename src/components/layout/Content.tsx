/*
 * @Author: lei.liu
 * @Date: 2022-03-10 22:17:40
 * @LastEditTime: 2022-03-11 16:49:28
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/Content.tsx
 */
// import { Suspense } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { Routes } from 'react-router-dom';
import { getComponent } from '@src/routes';

function MyContent() {
  console.log(getComponent(), ']]');
  return (
    <Content>
      <Routes>{/* <Suspense fallback={<></>}></Suspense> */}</Routes>
    </Content>
  );
}

export default MyContent;
