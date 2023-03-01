import React from "react";
import { Column } from "@ant-design/plots";

const ColumnChart = () => {
  const data = [
    {
      month: "Jan",
      orders: 4000,
    },
    {
      month: "Feb",
      orders: 6000,
    },
    {
      month: "Mar",
      orders: 3500,
    },
    {
      month: "Apr",
      orders: 5400,
    },
    {
      month: "May",
      orders: 5300,
    },
    {
      month: "Jun",
      orders: 4900,
    },
    {
      month: "Jul",
      orders: 6100,
    },
    {
      month: "Aug",
      orders: 5700,
    },
    {
      month: "Sep",
      orders: 4000,
    },
    {
      month: "Oct",
      orders: 4900,
    },
    {
      month: "Nov",
      orders: 4600,
    },
    {
      month: "Dec",
      orders: 6600,
    },
  ];
  const config = {
    data,
    xField: "month",
    yField: "orders",
    // color: ({ type }) => {
    //   return "#7828C8";
    // },
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
  };
  return <Column {...config} />;
};

export default ColumnChart;
