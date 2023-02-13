import React from "react";
import { HiUserGroup, HiShoppingBag } from "react-icons/hi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { IoStorefront } from "react-icons/io5";
import { RiShoppingCartFill } from "react-icons/ri";
import { AiTwotoneSetting } from "react-icons/ai";
import { FaUserTie, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

function SideMenuBar() {
  const navigate = useNavigate();
  return (
    <>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["home"]}
        onClick={({ key }) => {
          navigate("/" + key);
        }}
        items={[
          {
            key: "home",
            icon: <FaHome className="fs-4" />,
            label: "Dashboard",
          },
          {
            key: "products",
            icon: <RiShoppingCartFill className="fs-4" />,
            label: "Products",
          },
          {
            key: "product/details",
            icon: <RiShoppingCartFill className="fs-4" />,
            label: "Product Details",
          },
          {
            key: "categories",
            icon: <HiClipboardDocumentList className="fs-4" />,
            label: "Category",
          },
          {
            key: "suppliers",
            icon: <IoStorefront className="fs-4" />,
            label: "Supplier",
          },
          {
            key: "orders",
            icon: <HiShoppingBag className="fs-4" />,
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
    </>
  );
}

export default SideMenuBar;
