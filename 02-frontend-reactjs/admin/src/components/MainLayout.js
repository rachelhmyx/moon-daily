import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdDashboard } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { GiPresent } from "react-icons/gi";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard />,
              label: "Dashboard",
            },
            {
              key: "customers",
              icon: <RiCustomerService2Fill />,
              label: "Customers",
            },
            {
              key: "products",
              icon: <GiPresent />,
              label: "Products",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
