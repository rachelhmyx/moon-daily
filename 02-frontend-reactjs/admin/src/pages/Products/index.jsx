import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";
import  { ProColumns } from '@ant-design/pro-components';
import {
  Table,
  Button,
  Form,
  Input,
  message,
  Popconfirm,
  Modal,
  Space,
  InputNumber,
  Upload,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import numeral from "numeral";
import axios from "axios";

function Products() {
  //Set State:
  const [products, setProducts] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [editFormVisible, setEditFormVisible] = React.useState(false);
  const [selectedRecord, setSelectedRecord] = React.useState(null);

  //Khai báo column:

  const productsColumns: ProColumns[] = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      copyable: true,
      ellipsis: true,
      render: (text) => {
        return <strong>{text}</strong>;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text) => {
        return <span>{numeral(text).format("0,0")}</span>;
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (text) => {
        return (
          <strong style={{ color: "red" }}>
            {numeral(text).format("0,0")}%
          </strong>
        );
      },
    },
    {
      title: "Total Price",
      key: "total",
      dataIndex: "total",
      render: (text) => {
        return (
          <strong style={{ color: "green" }}>
            {numeral(text).format("0,0$")}
          </strong>
        );
      },
    },
    {
      title: "创建时间",
      key: "createdDate",
      dataIndex: "createdDate",
      valueType: "date",
      sorter: true,
      hideInSearch: true,
    },
    {
      title: "创建时间",
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
    {
      title: "",
      key: "actions",
      width: "5%",
      render: (text, record) => {
        return (
          <Space>
            <Popconfirm
              title="Are you sure to delete this row?"
              onConfirm={() => {
                //Delete:
                const id = record._id;
                axiosClient
                  .delete("/products/" + id)
                  .then((response) => {
                    message.success("Delete Successful!");
                    setRefresh((f) => {
                      return f + 1;
                    });
                  })
                  .catch((err) => {
                    message.error("Delete Failed!");
                  });
                console.log("Delete", record);
              }}
              onCancel={() => {}}
              okText="Yes"
              cancelText="No"
            >
              <Button type="dashed" danger icon={<DeleteOutlined />}></Button>
            </Popconfirm>

            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => {
                setEditFormVisible(true);
                console.log("Selected Record", record);
                setSelectedRecord(record);
                updateForm.setFieldsValue(record);
              }}
            ></Button>

            <Upload
              showUploadList={false}
              name="file"
              action={API_URL + "/upload/products/" + record._id}
              headers={{ authorization: "authorization-text" }}
              onChange={(info) => {
                if (info.file.status !== "uploading") {
                  console.log(info.file, info.fileList);
                }

                if (info.file.status === "done") {
                  message.success(
                    `${info.file.name} file uploaded successfully`
                  );
                  setRefresh((f) => f + 1);
                } else if (info.file.status === "error") {
                  message.error(`${info.file.name} file upload failed.`);
                }
              }}
            >
              <Button icon={<UploadOutlined />} />
            </Upload>
          </Space>
        );
      },
    },
  ];
  React.useEffect(() => {
    axiosClient.get("/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, [refresh]); //useEffect(mounting) kiểu dependencies có value: sẽ chạy lại khi refresh thay đổi, gắn thêm component con vào component cha, thêm mới data vào bảng mà ko cần phải load lại trang. Sẽ thực hiện GET lại data.
  const onFinish = (values) => {
    axiosClient
      .post("/products", values)
      .then((response) => {
        // UPLOAD FILE
        const { _id } = response.data;

        const formData = new FormData();
        formData.append("file", file);

        axios
          .post(API_URL + "/upload/products/" + _id, formData)
          .then((response) => {
            message.success("Add new successfully!");
            createForm.resetFields();
            setRefresh((f) => f + 1);
          })
          .catch((err) => {
            message.error("Uploaded failed!");
          });
      })
      .catch((err) => {
        message.error("Add New Failed!");
        console.log(err);
      });
  };

  const onFinishFailed = (errors) => {
    console.log("🧨", errors);
  };

  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/products/" + selectedRecord._id, values)
      .then((response) => {
        message.success("Updated Successful!");
        updateForm.resetFields();
        setRefresh((f) => f + 1);
        setEditFormVisible(false);
      })
      .catch((err) => {
        message.error("Updated Failed!");
        console.log("🧨", err);
      });
  };
  const onUpdateFinishFailed = (errors) => {
    console.log("🧨", errors);
  };

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <div>
      <Form
        form={createForm}
        name="create-new-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish} //Khi submit đc form thành công
        onFinishFailed={onFinishFailed} //Khi validate bị lỗi, ko submit đc
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <InputNumber
            style={{ minWidth: 200 }}
            // formatter={(value) => {
            //   return numeral(value).format("0,0$");
            // }} thầy sẽ nói lại sau
          />
        </Form.Item>

        <Form.Item label="Discount" name="discount">
          <InputNumber style={{ minWidth: 200 }} />
        </Form.Item>

        <Form.Item label="Stock" name="stock">
          <InputNumber style={{ minWidth: 200 }} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input />
        </Form.Item>

        <Form.Item label="Product Image" name="file">
          <Upload
            showUploadList={true}
            beforeUpload={(file) => {
              setFile(file);
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Choose Images</Button>
          </Upload>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table rowKey="_id" dataSource={products} columns={productsColumns} />

      <Modal
        centered
        open={editFormVisible}
        title="Update Data"
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setEditFormVisible(false);
        }}
        okText="Save"
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input product name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber />
          </Form.Item>

          <Form.Item label="Discount" name="discount">
            <InputNumber />
          </Form.Item>

          <Form.Item label="Stock" name="stock">
            <InputNumber />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Products;
