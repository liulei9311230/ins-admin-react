/*
 * @Author: lei.liu
 * @Date: 2022-03-09 17:44:02
 * @LastEditTime: 2022-03-10 19:49:49
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/MenuList.tsx
 */
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
const { SubMenu } = Menu;

const MenuList = props => {
  console.log('-=-=-', props);
  const { hasPowerDataResult: menuList } = props;

  const menuTag = list => {
    if (list && list.length > 0) {
      return list.map(item => {
        if (item.child && item.child.length > 0) {
          return (
            <SubMenu key={item.id} title={item.resName}>
              {menuTag(item.child)}
            </SubMenu>
          );
        }
        return (
          <Menu.Item key={item.id}>
            <a href={item.href}>{item.resName}</a>
          </Menu.Item>
        );
      });
    }
  };
  return (
    <Sider className="main-sider" collapsible trigger={null}>
      <div className="ant-pro-sider-menu-logo">
        <a href="#/">
          <h1>保险系统</h1>
        </a>
      </div>
      <Menu theme="dark" mode="inline">
        {menuTag(menuList)}
      </Menu>
    </Sider>
  );
};

const mapStateToProps = state => {
  return { ...state.PowerControl };
};
export default connect(mapStateToProps, null)(MenuList);
