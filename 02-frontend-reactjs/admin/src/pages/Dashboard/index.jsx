import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { BsArrowDownRight } from "react-icons/bs";
import { Column } from "@ant-design/plots";
import { Table } from "antd";
import moment from "moment";
// import numeral from "numeral";

function Dashboard() {
  //Chart
  const data = [
    {
      type: "Smart Phone & Accessory",
      sales: 4000,
    },
    {
      type: "Electronic Equipment",
      sales: 3500,
    },
    {
      type: "Laptop",
      sales: 350,
    },
    {
      type: "Watch",
      sales: 145,
    },
    {
      type: "Household Electrical Appliances",
      sales: 2500,
    },
    {
      type: "Sport & Travel",
      sales: 800,
    },
    {
      type: "Mom & Babies",
      sales: 900,
    },
    {
      type: "Home & Lifestyle",
      sales: 1500,
    },
    {
      type: "Beauty Products",
      sales: 900,
    },
    {
      type: "Healthcare Products",
      sales: 550,
    },
    {
      type: "Books",
      sales: 300,
    },
    {
      type: "Balo & Bags",
      sales: 400,
    },
    {
      type: "Pets Care Products",
      sales: 820,
    },
    {
      type: "Accessories & Jewelry",
      sales: 850,
    },
  ];

  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#7828C8";
    },
    label: {
      // 可手动配置 label 数据标签位置
      position: "middle",
      // 'top', 'bottom', 'middle',
      // 配置样式
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
    meta: {
      type: {
        alias: "Category",
      },
      sales: {
        alias: "Income",
      },
    },
  };
  //End of Chart

  //Recent Order Table:
  const [orders, setOrders] = React.useState([]);
  const columns = [
    {
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createDate",
      render: (text) => {
        return <span>{moment(text).format("DD/MM/yyyy")}</span>;
      },
    },
    {
      title: "Shipped Date",
      dataIndex: "shippedDate",
      key: "shippedDate",
      render: (text) => {
        return <span>{moment(text).format("DD/MM/yyyy")}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => {
        return <strong style={{ color: "red" }}>{text}</strong>;
      },
    },
  ];

  React.useEffect(() => {
    axiosClient.get("/orders").then((response) => {
      setOrders(response.data);
      console.log(response.data);
    });
  }, []);
  //End of Recent Order Table:

  return (
    <>
      <div>
        <h3 className="mb-4">Dashboard</h3>
        <div className="d-flex justify-content-between align-items-center gap-3">
          <div className="d-flex flex-grow-1 justify-content-between align-items-end shadow bg-body-tertiary p-3 rounded-3 ">
            <div>
              <p className="mb-0">Total</p>
              <h4>$1100</h4>
            </div>
            <div className="d-flex flex-column justify-content-end">
              <h6>
                {" "}
                <BsArrowDownRight />
                32%
              </h6>
              <p className="mb-0">Compare to April 2022</p>
            </div>
          </div>
          <div className="d-flex flex-grow-1 justify-content-between align-items-end shadow bg-body-tertiary p-3 rounded-3  ">
            <div>
              <p className="mb-0">Total</p>
              <h4>$1100</h4>
            </div>
            <div className="d-flex flex-column justify-content-end">
              <h6>32%</h6>
              <p className="mb-0">Compare to April 2022</p>
            </div>
          </div>
          <div className="d-flex flex-grow-1 justify-content-between align-items-end shadow bg-body-tertiary p-3 rounded-3  ">
            <div>
              <p className="mb-0">Total</p>
              <h4>$1100</h4>
            </div>
            <div className="d-flex flex-column justify-content-end">
              <h6>32%</h6>
              <p className="mb-0">Compare to April 2022</p>
            </div>
          </div>
        </div>

        <div className="mt-4 ">
          <h3 className="my-5">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>

        <div className="mt-4">
          <h3 className="my-5">Recent Orders</h3>
          <div>
            <Table columns={columns} dataSource={orders} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
