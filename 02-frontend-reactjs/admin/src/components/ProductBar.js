import React from "react";
import { Bar } from "@ant-design/plots";

const ProductBar = () => {
  const data = [
    {
      name: "Apple iPhone 14 Pro Max 128GB",
      stock: 30,
    },
    {
      name: "Điện Thoại Samsung Galaxy Z Flip4 5G 128GB",
      stock: 10,
    },
    {
      name: "Tai nghe Samsung Galaxy Buds2 Pro Bluetooth",
      stock: 10,
    },
    {
      name: "Điện thoại OPPO A16 4GB",
      stock: 10,
    },
    {
      name: "Đồng hồ nữ dây kim loại chính hãng Casio",
      stock: 2,
    },
    {
      name: "Adidas TENNIS Breaknet Court Lifestyle Shoes GZ4960",
      stock: 10,
    },
    {
      name: "Adidas RUNNING Giày Lite Racer RBN 2.0 FW3246",
      stock: 5,
    },
    {
      name: "Innisfree Volcanic Pore Mattifying Cream 50 mL",
      stock: 100,
    },
  ];
  const config = {
    data,
    xField: "stock",
    yField: "name",
    seriesField: "year",
    legend: {
      position: "top-left",
    },
    color: ({ name }) => {
      return "#6395F9";
    },
  };
  return <Bar {...config} />;
};

export default ProductBar;
