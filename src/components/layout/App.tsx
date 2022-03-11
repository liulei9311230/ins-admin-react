/*
 * @Author: lei.liu
 * @Date: 2022-03-08 21:44:34
 * @LastEditTime: 2022-03-11 14:08:09
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/App.tsx
 */
import { Layout } from 'antd';
import MenuList from './MenuList';
import Header from './Header';
import Content from './Content';
import Breadcrumb from './Breadcrumb';

function APP() {
  return (
    <Layout>
      {
        <>
          <MenuList></MenuList>
          <Layout style={{ height: '100vh' }}>
            <Header></Header>
            <Breadcrumb></Breadcrumb>
            <Content></Content>
          </Layout>
        </>
      }
    </Layout>
  );
}
export default APP;
