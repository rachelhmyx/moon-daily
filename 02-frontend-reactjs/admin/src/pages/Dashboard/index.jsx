import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { Tabs, Col, Row, Table, Tag } from "antd";
import PieChart from "../../components/PieChart";
import ColumnChart from "../../components/ColumnChart";
import ViewChart from "../../components/ViewChart";
import ProductBar from "../../components/ProductBar";

import moment from "moment";
import numeral from "numeral";

function Dashboard() {
  const onChange = (key) => {
    console.log(key);
  };

  const ordersColumn = [
    {
      title: "ORDER ID",
      dataIndex: "orderID",
      key: "orderID",
      render: (text) => {
        return (
          <span style={{ color: "blue", fontWeight: "bold" }}>{text}</span>
        );
      },
    },
    {
      title: "CUSTOMER",
      dataIndex: "customerName",
      key: "customerName",
      render: (text) => {
        return <span>{text}</span>;
      },
    },
    {
      title: "ORDER DATE",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text) => {
        return <span>{moment(text).format("DD/MM/yyyy")}</span>;
      },
    },
    {
      title: "AMOUNT",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (record) => {
        return (
          <div
            style={{ textAlign: "right", color: "green", fontWeight: "bold" }}
          >
            {numeral(record?.orderDetails?.totalAmount).format("0,0$")}
          </div>
        );
      },
    },
    {
      title: "DELIVERY STATUS",
      key: "deliveryStatus",
      dataIndex: "deliveryStatus",
      render: (text) => {
        if (text === "Cancelled") {
          return (
            <Tag color="red" key={text}>
              {text.toUpperCase()}
            </Tag>
          );
        } else if (text === "Delivered") {
          return (
            <Tag color="green" key={text}>
              {text.toUpperCase()}
            </Tag>
          );
        } else if (text === "Pending") {
          return (
            <Tag color="yellow" key={text}>
              {text.toUpperCase()}
            </Tag>
          );
        } else if (text === "Inprogress") {
          return (
            <Tag color="blue" key={text}>
              {text.toUpperCase()}
            </Tag>
          );
        }
        return (
          <Tag color="purple" key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];

  const [orders, setOrders] = React.useState([]);
  React.useEffect(() => {
    axiosClient
      .get("/orders")
      .then((response) => {
        setOrders(response.data);
      })
      .catch((err) => {
        console.log("🧨", err);
      });
  }, []);

  return (
    <div style={{ padding: "50px" }}>
      <div>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `ORDERS BY MONTH`,
              key: "1",
              children: <ColumnChart />,
            },
            {
              label: `VIEWS`,
              key: "2",
              children: <ViewChart />,
            },
          ]}
        />
      </div>

      <div style={{ marginTop: "50px" }}>
        <p style={{ fontWeight: "bold", fontSize: "19px" }}>SALES STATUS</p>
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `ORDERS BY CATEGORY`,
              key: "1",
              children: (
                <Row gutter={16}>
                  <Col span={13}>
                    <PieChart />
                  </Col>
                  <Col span={8}>
                    <div>
                      <p style={{ fontSize: "19px", fontWeight: "bold" }}>
                        RECENT ORDERS
                      </p>
                      <Table
                        rowKey="_id"
                        dataSource={orders}
                        columns={ordersColumn}
                      />
                    </div>
                  </Col>
                </Row>
              ),
            },
          ]}
        />
      </div>

      <div style={{ marginTop: "50px" }}>
        <p style={{ fontWeight: "bold", fontSize: "19px" }}>PRODUCTS</p>
          <p>Hot Items</p>
          <ProductBar />
      </div>
    </div>
  );
}

export default Dashboard;
