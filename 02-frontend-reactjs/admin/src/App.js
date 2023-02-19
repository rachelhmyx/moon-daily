import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaCloudMoon } from "react-icons/fa";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import Categories from "./pages/Categories";
import SearchBar from "./components/SearchBar";
import { Layout } from "antd";
import SideMenuBar from "./components/SideMenuBar";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import numeral from "numeral";
import "numeral/locales/vi";
import Products from "./pages/Products/index";
import Suppliers from "./pages/Suppliers/index";
import NotFoundPage from "./pages/404/index";

numeral.locale("vi");

const { Header, Sider, Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed} theme="dark">
            <div className="logo">
              <h2 className="text-white fs-10 text-center text-uppercase fw-bold py-3 mb-0">
                <span className="sm-logo">{<FaCloudMoon />}</span>
                <span className="lg-logo">Moon</span>
              </h2>
            </div>
            <SideMenuBar />
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
              <SearchBar />
            </Header>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Routes>
                <Route index path="/home" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/products" element={<Products />} />
                <Route path="/suppliers" element={<Suppliers />} />

                {/* NO MATCH ROUTE */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </BrowserRouter>
    </div>
  );
}

export default App;
