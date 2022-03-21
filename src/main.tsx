/*
 * @Author: your name
 * @Date: 2022-02-20 16:20:44
 * @LastEditTime: 2022-03-12 18:36:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/main.tsx
 */
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={zhCN}>
      <HashRouter>
        <App />
      </HashRouter>
    </ConfigProvider>
  </Provider>,
  document.getElementById('app')
);
