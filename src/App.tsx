import './assets/styles/base.less';
import { useState } from 'react'
import { Layout } from 'antd';
import InitPage from '@src/components/layout/InitPageMenu';

function App() {
  const [initStatus, setInitStatus] = useState<boolean>(false)
  const handleLoadEnd = () => {
    setInitStatus(true)
  }
  return (
    <Layout>
      {!initStatus ? (<InitPage loadend={handleLoadEnd}></InitPage>) : ('')}
    </Layout>
  );
}

export default App;
