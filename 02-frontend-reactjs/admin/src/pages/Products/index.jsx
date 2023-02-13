import React from "react";
import {
  Table,
  Form,
  Button,
  InputNumber,
  Input,
  message,
  Space,
  Popconfirm,
  Modal,
  Select,
  DatePicker
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { axiosClient } from "../../libraries/axiosClient";
import numeral from "numeral";
import moment from "moment";
import { API_URL } from "../../constants/URLS";


function Products() {
  //set useState:
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [selectedRecord, setSelectedRecord] = React.useState(null);
  const [isVisibleEditForm, setIsVisibleEditForm] = React.useState(false);
  const [isVisibleAddNewForm, setIsVisibleAddNewForm] = React.useState(false);
  

  const productColumns = [
    {
      title: "Product",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => {
        return <div>{text && <img src={`${API_URL}${text}`} style={{width:60}} alt=""/>}</div>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <span style={{"fontSize": "18px"}}>{text}</span>;
      },
    },
    {
      title: "Original Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return (
          <strong style={{"fontSize": "18px"}}>
            {numeral(text).format("0,0$")}
          </strong>
        );
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
      title: "Price After Discount",
      dataIndex: "total",
      key: "total",
      render: (text) => {
        return (
          <strong style={{ color: "green", fontSize: "18px" }}>
            {numeral(text).format("0,0$")}
          </strong>
        );
      },
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      render: (text) => {
        return <span>{numeral(text).format("0,0")}</span>;
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
      title: "Created Date",
      dataIndex: "createdDate",
      key: "createdDate",
      render: (text) => {
        return <span>{moment(text).format("DD/MM/yyyy")}</span>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (record) => {
        return (
          <Space>
            <Popconfirm
              title="Are you sure to delete this row?"
              onConfirm={() => {
                //Xóa data:
                const id = record._id;
                axiosClient
                  .delete("/products/" + id)
                  .then((response) => {
                    message.success("Deleted successfully!");
                    setRefresh((f) => {
                      return f + 1;
                    });
                  })
                  .catch((error) => {
                    message.error("Deleted failed!");
                    console.log("Error:", error);
                  });
                console.log("Delete:", record);
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
                setSelectedRecord(record);
                setIsVisibleEditForm(true);
                updateForm.setFieldsValue(record);
                console.log("Selected record:", record);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];

  //set useEffect:
  React.useEffect(() => {
    axiosClient.get("/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, [refresh]);

  React.useEffect(() => {
    axiosClient.get("/categories").then((response) => {
      setCategories(response.data);
    });
  }, []);
  React.useEffect(() => {
    axiosClient.get("/sub-categories").then((response) => {
      setSubCategories(response.data);
    });
  }, []);

  React.useEffect(() => {
    axiosClient.get("/suppliers").then((response) => {
      setSuppliers(response.data);
    });
  }, []);

  React.useEffect(() => {
    axiosClient.get("/employees").then((response) => {
      setEmployees(response.data)
    })
  }, [])

  //Thêm mới data:
  const onFinish = (values) => {
    axiosClient
    .post("/products", values)
    .then((response) => {
      setRefresh((f) => {
        return f + 1;
      });
      message.success("Add New Successful");
      createForm.resetFields();
    }).catch((error) => {
        message.error("Add New Failed!");
        console.log(error);
      });
  };
  const onFinishFailed = (err) => {
    console.log("Error:", err);
  };

  //Chỉnh sửa data:
  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/products/" + selectedRecord._id, values)
      .then((response) => {
        message.success("Updated successfully!");
        setRefresh((f) => {
          return f + 1;
        });
        updateForm.resetFields();
        setIsVisibleEditForm(false);
      })
      .catch((error) => {
        message.error("Updated failed!");
        console.log("Error:", error);
      });
  };
  const onUpdateFinishFailed = (err) => {
    console.log("Error:", err);
  };

  //Date Picker:
  const onChange = (date, dateString) => {
    console.log(date, dateString)
  }
  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  return (
    <div style={{ padding: "50px" }}>
      <div className="d-flex justify-content-end my-5">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsVisibleAddNewForm(true);
          }}
          size="large"
        >
          Add New Product
        </Button>
      </div>
      <Modal
        centered
        title="Add New Product"
        open={isVisibleAddNewForm}
        onOk={() => {
          createForm.submit();
          setIsVisibleAddNewForm(false);
        }}
        onCancel={() => {
          setIsVisibleAddNewForm(false);
        }}
        okText="Submit"
      >
        <Form
          form={createForm}
          name="create-form"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
        >
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[
              {
                required: true,
                message: "Please input category name!",
              },
            ]}
          >
            <Select
              options={
                categories &&
                categories.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Sub Category"
            name="subCategoryId"
            rules={[
              {
                required: true,
                message: "Please input sub-category name!",
              },
            ]}
          >
            <Select
              options={
                subCategories &&
                subCategories.map((c) => {
                  return {
                    value: c._id,
                    label: c.name,
                  };
                })
              }
            />
          </Form.Item>
          <Form.Item
            label="Supplier"
            name="supplierId"
            rules={[
              {
                required: true,
                message: "Please input supplier name!",
              },
            ]}
          >
            <Select
              options={
                suppliers &&
                suppliers.map((s) => {
                  return {
                    value: s._id,
                    label: s.name,
                  };
                })
              }
            />
          </Form.Item>

          <Form.Item
            label="Product Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input product stock!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>
          <Form.Item
            label="Sold"
            name="sold"
            rules={[
              {
                required: true,
                message: "Please input number of product has been sold!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>
          <Form.Item
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product price!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>
          <Form.Item label="Discount" name="discount">
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
          <Form.Item label="Created Date" name="createddate">
          <DatePicker onChange={onChange} />
          </Form.Item>

          

        </Form>
      </Modal>

      <Table rowKey="_id" dataSource={products} columns={productColumns} />

      <Modal
        centered
        title="Update Product Info"
        open={isVisibleEditForm}
        onOk={() => {
          updateForm.submit();
        }}
        onCancel={() => {
          setIsVisibleEditForm(false);
        }}
        okText="Save"
      >
        <Form
          form={updateForm}
          name="update-form"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onUpdateFinish}
          onFinishFailed={onUpdateFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input product name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Original Price"
            name="price"
            rules={[
              {
                required: true,
                message: "Please input product original price!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>

          <Form.Item
            label="Discount"
            name="discount"
            rules={[
              {
                required: true,
                message: "Please input product discount!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>

          <Form.Item
            label="Price After Discount"
            name="total"
            rules={[
              {
                required: true,
                message: "Please input product price after discount!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>

          <Form.Item
            label="Sold"
            name="sold"
            rules={[
              {
                required: true,
                message: "Please input number of product has been sold!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>

          <Form.Item
            label="Stock"
            name="stock"
            rules={[
              {
                required: true,
                message: "Please input product stock!",
              },
            ]}
          >
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>

          <Form.Item label="Updated Date" name="createddate">
          <DatePicker onChange={onChange} />
          </Form.Item>

          <Form.Item
            label="Updated By"
            name="employeeId"
            rules={[
              {
                required: true,
                message: "Please input employee name!",
              },
            ]}
          >
            <Select
              options={
                employees &&
                employees.map((e) => {
                  return {
                    value: e._id,
                    label: e.fullName,
                  };
                })
              }
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Products;
