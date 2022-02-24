import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import {Provider} from 'mobx-react'
import { HashRouter } from 'react-router-dom';
import store from './store/index';
import App from './App';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider {...store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('app')
);

