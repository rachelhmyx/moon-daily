import React from "react";
import { HiUserGroup, HiShoppingBag } from "react-icons/hi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoStorefront } from "react-icons/io5";
import { RiShoppingCartFill } from "react-icons/ri";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaHome, FaUserCircle, FaUserTie } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Menu, Avatar, Badge } from "antd";
import { DatabaseOutlined, FolderOutlined } from "@ant-design/icons";

function SideMenuBar() {
  const navigate = useNavigate();
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["home"]}
        defaultOpenKeys={["management", "sales"]}
        onClick={({ key }) => {
          navigate("/" + key);
        }}
        style={{
          height: "100vh",
          borderRight: 0,
        }}
        items={[
          {
            key: "home",
            icon: <FaHome className="fs-4" />,
            label: "Dashboard",
          },
          {
            label: "Management",
            key: "management",
            icon: <DatabaseOutlined />,
            children: [
              {
                label: "Category",
                key: "management/categories",
                icon: <HiClipboardDocumentList className="fs-4" />,
              },
              {
                label: "Products",
                key: "management/products",
                icon: <RiShoppingCartFill className="fs-4" />,
              },
              {
                label: "Suppliers",
                key: "management/suppliers",
                icon: <IoStorefront className="fs-4" />,
              },
              {
                label: "Customers",
                key: "management/customers",
                icon: <HiUserGroup className="fs-4" />,
              },
              {
                label: "Employees",
                key: "management/employees",
                icon: <FaUserTie className="fs-4" />,
              },
            ],
          },
          {
            label: "Sales Management",
            key: "sales",
            icon: <FolderOutlined />,
            children: [
              {
                label: "Orders",
                key: "orders",
                icon: <HiShoppingBag className="fs-4" />,
              },
            ],
          },
          {
            key: "account",
            icon: (
              <Badge count={1} size="small">
                <Avatar
                  shape="circle"
                  icon={<FaUserCircle className="fs-4" />}
                  size="small"
                />
              </Badge>
            ),
            label: "Account",
          },
          {
            key: "logout",
            icon: <FiLogOut className="fs-4" />,
            label: "LogOut",
          },
          {
            key: "settings",
            icon: <AiTwotoneSetting className="fs-4" />,
            label: "Settings",
          },
        ]}
      />
    </>
  );
}

export default SideMenuBar;
