import React, {useState} from "react";
import {Layout} from "antd";
import AppMenu from "./Menu";
import UserAvatar from "./UserAvatar";
import style from "./Layout.module.css";

const { Header, Content, Footer, Sider } = Layout;

export default function AppLayout({children}) {
  const [collapsed, setCollapsed] = useState(false);

  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={onCollapse}
        width={300}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'sticky',
          top: 0,
          left: 0,
        }}
      >
        <AppMenu collapsed={collapsed} />
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} >
          <div className={style.Profile}>
            <UserAvatar displayUsername={true} />
          </div>
        </Header>
        <Content style={{ margin: '0 16px' }}>
          {children}
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  )
}
