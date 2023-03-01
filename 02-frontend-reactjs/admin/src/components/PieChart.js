import React from "react";
import { Pie } from "@ant-design/plots";

const PieChart = () => {
  const data = [
    {
      type: "Smart Phone & Accessory",
      value: 450,
    },
    {
      type: "Electronic Equipments",
      value: 270,
    },
    {
      type: "Laptop",
      value: 190,
    },
    {
      type: "Watch",
      value: 100,
    },
    {
      type: "Household Electrical Appliances",
      value: 650,
    },
    {
      type: "Sport & Travel",
      value: 600,
    },
    {
      type: "Mom & Babies",
      value: 580,
    },
    {
      type: "Home & Lifestyle",
      value: 500,
    },
    {
      type: "Beauty Products",
      value: 300,
    },
    {
      type: "Healthcare Products",
      value: 50,
    },
    {
      type: "Books",
      value: 250,
    },
    {
      type: "Balo & Bags",
      value: 200,
    },
    {
      type: "Pets Care Products",
      value: 80,
    },
    {
      type: "Accessories & Jewelry",
      value: 100,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} {value}",
    },
    interactions: [
      {
        type: "pie-legend-active",
      },
      {
        type: "element-active",
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart;
