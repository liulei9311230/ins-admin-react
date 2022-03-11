/*
 * @Author: lei.liu
 * @Date: 2022-03-11 14:08:09
 * @LastEditTime: 2022-03-11 14:11:22
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/Breadcrumb.tsx
 */
import { Breadcrumb } from 'antd';

function MyBreadcrumb() {
  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>next</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default MyBreadcrumb;
