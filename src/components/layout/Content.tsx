/*
 * @Author: lei.liu
 * @Date: 2022-03-10 22:17:40
 */
import { Suspense } from 'react';
import { Layout } from 'antd';
const { Content } = Layout;
import { Routes, Route } from 'react-router-dom';
import { getComponent } from '@src/routes';
import Home from '@src/pages/home';
// import NoPowerPage from '@src/pages/noPowerPage';

// const NoPowerPage = lazy(() => import('@src/pages/noPowerPage'));

function MyContent() {
  const authRoutes = getComponent();
  return (
    <Content className="content">
      <Suspense fallback={<Home />}>
        <Routes>
          {/* <Route path="/noPowerPage" element={<NoPowerPage />}></Route>
          <Route path="/noPowerPage" element={<NoPowerPage />}></Route> */}
          {authRoutes.map(item => {
            return (
              <Route
                path={item.path}
                element={item.component}
                key={item.path}
              ></Route>
            );
          })}
        </Routes>
      </Suspense>
    </Content>
  );
}

export default MyContent;
