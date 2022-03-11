/*
 * @Author: your name
 * @Date: 2022-02-20 16:20:44
 * @LastEditTime: 2022-03-09 23:18:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /ins-admin-react/src/App.tsx
 */
import { useState } from 'react';
import './assets/styles/app.css';
import './assets/styles/base.less';
import { Layout } from 'antd';
import InitApp from '@src/components/layout/App';
import Welcome from '@src/components/layout/Welcome';

function App() {
	const [initStatus, setInitStatus] = useState(true);
	const handleLoadEnd = () => {
		setInitStatus(false);
	};
	return (
		<Layout>
			{initStatus ? <Welcome loadend={handleLoadEnd} /> : <InitApp />}
		</Layout>
	);
}

export default App;
