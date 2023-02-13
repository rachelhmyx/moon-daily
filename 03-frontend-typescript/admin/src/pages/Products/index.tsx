import React from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button } from "antd";
import { useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";
import numeral from "numeral";
import axios from "axios";

type productDataType = {
  id: number;
  name: string;
  stock: number;
  discount: number;
  createdDate: string;
};

function Product() {
  //set useState:
  const [products, setProducts] = React.useState([]);
  //   const [categories, setCategories] = React.useState([]);
  //   const [suppliers, setSuppliers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  // const [selectedRecord, setSelectedRecord] = React.useState<any>(null);
  // const [isVisibleEditForm, setIsVisibleEditForm] = React.useState(false);

  const columns: ProColumns<productDataType>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "Name",
      dataIndex: "name",
      copyable: true,
      ellipsis: true,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      sorter: (a: any, b: any) => a.stock - b.stock,
      width: "12%",
      ellipsis: true,
      render: (text: any) => {
        return <span>{numeral(text).format("0,0")}</span>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: "12%",
      sorter: (a: any, b: any) => a.discount - b.discount,
      ellipsis: true,
      render: (text: any) => {
        return (
          <strong style={{ color: "red" }}>
            {numeral(text).format("0,0")}%
          </strong>
        );
      },
    },
    {
      title: "Total Price",
      dataIndex: "total",
      key: "total",
      width: "12%",
      sorter: (a: any, b: any) => a.total - b.total,
      ellipsis: true,
      render: (text: any) => {
        return (
          <strong style={{ color: "green" }}>
            {numeral(text).format("0,0$")}
          </strong>
        );
      },
    },
    {
      title: "Created Date",
      key: "createdDate",
      dataIndex: "createdDate",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "Created Date",
      dataIndex: "createdDate",
      valueType: "dateRange",
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
  ];
  const actionRef = useRef<ActionType>();

  //set useEffect:
  React.useEffect(() => {
    axiosClient.get("/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, [refresh]);

  return (
    <div>
      <ProTable<productDataType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        // request={async (params = {}, sort, filter) => {
        //   console.log(sort, filter);
        //   return request<{
        //     data: productDataType[];
        //   }>("https://proapi.azurewebsites.net/github/issues", {
        //     params,
        //   });
        // }}
        dataSource={products}
        editable={{
          type: "multiple",
        }}
        columnsState={{
          persistenceKey: "pro-table-singe-demos",
          persistenceType: "localStorage",
          onChange(value) {
            console.log("value: ", value);
          },
        }}
        rowKey="id"
        search={{
          labelWidth: "auto",
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参与与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === "get") {
              return {
                ...values,
                createdDate: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="Product List"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
        ]}
      />
    </div>
  );
}

export default Product;
