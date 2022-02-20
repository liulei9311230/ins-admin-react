import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale-provider/zh_CN';
import {Provider} from 'react-redux'
import { HashRouter } from 'react-router-dom';
import store from './store';
import App from './App';

ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <HashRouter>
        <App />
      </HashRouter>
    </Provider>
  </ConfigProvider>,
  document.getElementById('app')
);

