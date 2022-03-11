/*
 * @Author: lei.liu
 * @Date: 2022-03-10 15:05:49
 * @LastEditTime: 2022-03-10 20:22:47
 * @Description:
 * @FilePath: /ins-admin-react/src/components/layout/Header.tsx
 */
import { useState } from 'react';
import { Layout, Space, Dropdown, Menu, Modal, message } from 'antd';
const { confirm } = Modal;
import { connect } from 'react-redux';
import Config from '@src/config';
const { Header } = Layout;
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
const handleLoginOut = e => {
  e.preventDefault();
  confirm({
    title: '退出登录',
    content: '你确定要退出登录吗？',
    okText: '确定',
    okType: 'danger',
    cancelText: '取消',
    onOk() {
      window.location.replace(
        `${Config.ssoHost}?action=logout&url=${encodeURIComponent(
          window.location.href
        )}`
      );
    },
    onCancel() {
      message.success('已取消退出登录');
    }
  });
};
const MyHeader = props => {
  const [collapsed, setCollapsed] = useState(false);
  const menu = (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={`${Config.ssoHost}#/password/`}
        >
          修改密码
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="javascript: void(0);"
          onClick={handleLoginOut}
        >
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );
  console.log(props, '][====');
  const { name, jobNumber } = props;
  return (
    <Header className="main-header" style={{ background: '#fff', padding: 0 }}>
      <Space onClick={() => setCollapsed(!collapsed)} className="trigger">
        {collapsed ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
        <div className="user-info">
          <Dropdown overlay={menu} placement="bottomCenter">
            <span className="name">
              &nbsp;&nbsp;{name}({jobNumber})
            </span>
          </Dropdown>
        </div>
      </Space>
    </Header>
  );
};
const mapStateToProps = state => {
  return { ...state.UserInfo };
};

export default connect(mapStateToProps)(MyHeader);
