/*
 * @Author: lei.liu
 * @Date: 2022-03-10 22:17:40
 */
import { Suspense } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { Routes, Route } from 'react-router-dom';
import { getComponent } from '@src/routes';

function MyContent() {
  const authRoutes = getComponent();
  return (
    <Content>
      <Routes>
        <Suspense fallback={<></>}>
          {authRoutes.map(item => {
            return (
              <Route
                path={item.path}
                element={item.component}
                key={item.path}
              ></Route>
            );
          })}
        </Suspense>
      </Routes>
    </Content>
  );
}

export default MyContent;
