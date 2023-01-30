import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdDashboard } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { BsFillFolderFill } from "react-icons/bs";
import { HiBuildingOffice2 } from "react-icons/hi2";
import { RiShoppingCartFill } from "react-icons/ri";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaUserTie, FaClipboardList, FaCloudMoon } from "react-icons/fa";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <h2 className="text-white fs-10 text-center text-uppercase fw-bold py-3 mb-0">
            <span className="sm-logo">{<FaCloudMoon />}</span>
            <span className="lg-logo">Moon Daily</span>
          </h2>
        </div>

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
              icon: <MdDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "products",
              icon: <RiShoppingCartFill className="fs-4" />,
              label: "Products",
            },
            {
              key: "categories",
              icon: <BsFillFolderFill className="fs-4" />,
              label: "Category",
            },
            {
              key: "suppliers",
              icon: <HiBuildingOffice2 className="fs-4" />,
              label: "Supplier",
            },
            {
              key: "orders",
              icon: <FaClipboardList className="fs-4" />,
              label: "Order",
            },
            {
              key: "customers",
              icon: <HiUserGroup className="fs-4" />,
              label: "Customers",
            },
            {
              key: "employees",
              icon: <FaUserTie className="fs-4" />,
              label: "Employees",
            },
            {
              key: "settings",
              icon: <AiTwotoneSetting className="fs-4" />,
              label: "Settings",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background d-flex justify-content-between ps-1 pe-5"
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
          <div className="d-flex gap-3 align-items-center">
            <div></div>
            <div>
              <div>
                <img src="" alt="" />
              </div>
              <div>
                <p></p>
              </div>
            </div>
          </div>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
