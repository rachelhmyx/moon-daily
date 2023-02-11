import React from "react";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Button, Dropdown } from "antd";
import { useRef } from "react";
import request from "umi-request";
import { EllipsisOutlined, PlusOutlined } from "@ant-design/icons";

type productDataType = {
  id: number;
  number: number;
  name: string;
  createdDate: string;
};

function Product() {
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
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   key: 'option',
    //   render: (text, record, _, action) => [
    //     <a
    //       key="editable"
    //       onClick={() => {
    //         action?.startEditable?.(record.id);
    //       }}
    //     >
    //       编辑
    //     </a>,
    //     <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
    //       查看
    //     </a>,
    //     <TableDropdown
    //       key="actionGroup"
    //       onSelect={() => action?.reload()}
    //       menus={[
    //         { key: 'copy', name: '复制' },
    //         { key: 'delete', name: '删除' },
    //       ]}
    //     />,
    //   ],
    // },
  ];
  const actionRef = useRef<ActionType>();

  return (
    <div>
      <ProTable<productDataType>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params = {}, sort, filter) => {
          console.log(sort, filter);
          return request<{
            data: productDataType[];
          }>("https://proapi.azurewebsites.net/github/issues", {
            params,
          });
        }}
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
                created_at: [values.startTime, values.endTime],
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
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button key="button" icon={<PlusOutlined />} type="primary">
            新建
          </Button>,
          <Dropdown
            key="menu"
            menu={{
              items: [
                {
                  label: "1st item",
                  key: "1",
                },
                {
                  label: "2nd item",
                  key: "1",
                },
                {
                  label: "3rd item",
                  key: "1",
                },
              ],
            }}
          >
            <Button>
              <EllipsisOutlined />
            </Button>
          </Dropdown>,
        ]}
      />
    </div>
  );
}

export default Product;
