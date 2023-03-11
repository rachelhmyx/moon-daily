import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FaCloudMoon } from "react-icons/fa";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword/index";
import ForgotPassword from "./pages/ForgotPassword/index";
import Dashboard from "./pages/Dashboard/index";
import Categories from "./pages/Categories/index";
import { Layout } from "antd";
import SideMenuBar from "./components/SideMenuBar";
import numeral from "numeral";
import Products from "./pages/Products/index";
import Suppliers from "./pages/Suppliers/index";
import OrderManagement from "./pages/Orders/index";
import NotFoundPage from "./pages/404/index";
import Register from "./pages/Resgister/index";
import "numeral/locales/vi";
numeral.locale("vi");

const { Header, Sider, Content, Footer } = Layout;

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <Layout>
          <Layout>
            <Sider width={250} className="site-layout-background">
              <div className="logo">
                <FaCloudMoon />
                MOON
              </div>
              <SideMenuBar />
            </Sider>
            <Layout className="site-layout">
              <Header
                className="site-layout-background"
                style={{
                  padding: 0,
                }}
              />

              <Content
                className="site-layout-background"
                style={{
                  margin: "24px 24px",
                }}
              >
                {/* <Breadcrumb
                  style={{
                    margin: "16px 16px",
                  }}
                >
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>Management</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
                <Routes>
                  <Route index path="/home" element={<Dashboard />} />
                  <Route
                    path="management/categories"
                    element={<Categories />}
                  />
                  <Route path="management/products" element={<Products />} />
                  <Route path="management/suppliers" element={<Suppliers />} />
                  <Route path="/orders" element={<OrderManagement />} />

                  {/* NO MATCH ROUTE */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Content>
              <Footer
                style={{
                  textAlign: "center",
                }}
              >
                MOON ©2023 Created by AntDesign
              </Footer>
            </Layout>
          </Layout>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
