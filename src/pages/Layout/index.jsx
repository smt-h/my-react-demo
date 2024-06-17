import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import { Layout, Menu, theme, Popconfirm } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import items from '../../config/index'
import './index.scss'
import useStore from '../../store'
import { observer } from 'mobx-react-lite'

const { Header, Sider, Content, Footer } = Layout;
const LayOut = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation()
  const { UserStore, LoginStore } = useStore()
  const navigate = useNavigate()
  useEffect(() => {
    UserStore.getUserInfo()
  },[UserStore])
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  // 退出登录的实现
  const onConfirm = () => {
    // 删除token返回登录
    LoginStore.loginOut()
    navigate('/login', {replace:true})
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} className='sider'>
        <div className='logo'>
          <Menu
            theme='dark'
            mode='inline'
            defaultSelectedKeys={[pathname]}
            selectedKeys={[pathname]}
            items={items}
          />
        </div>
      </Sider>
      <Layout className='site-layout'>
        <Header style={{ padding:0,background: colorBgContainer }}>
          { React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span className='user-name'>{UserStore.userInfo.name}</span>
          <span className='user-logout'>
            <Popconfirm
              onConfirm={onConfirm}
              title='是否确认退出'
              okText='退出'
              cancelText='取消'
            >
              <LogoutOutlined />退出
            </Popconfirm>
          </span>
        </Header>
        <Content
          style={{
            margin: '24px 16px 0px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            overflowY: 'auto'
          }}
        >
          <Outlet />
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          test @2024 Created by little sun
        </Footer>
      </Layout>
    </Layout>
  )
}
export default observer(LayOut);