import React from "react";
import {
  Form,
  Button,
  InputNumber,
  Input,
  message,
  Space,
  Popconfirm,
  Modal,
  Select,
  Upload,
  Descriptions,
  Image,
  Tabs,
  Row,
  Col,
  Card,
  Rate,
  Tag,
  Table,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

import { axiosClient } from "../../libraries/axiosClient";
import numeral from "numeral";
import { API_URL } from "../../constants/URLS";
import axios from "axios";
import moment from "moment";
const { Meta } = Card;

function Products() {
  //set useState:
  const [products, setProducts] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [subCategories, setSubCategories] = React.useState([]);
  const [suppliers, setSuppliers] = React.useState([]);
  const [employees, setEmployees] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const [isVisibleEditForm, setIsVisibleEditForm] = React.useState(false);
  const [isVisibleAddNewForm, setIsVisibleAddNewForm] = React.useState(false);
  const [file, setFile] = React.useState(null);
  const [selectedProductDetails, setSelectedProductDetails] =
    React.useState(null);
  const [isPreview, setIsPreview] = React.useState(false);

  //set useEffect:
  //Products:
  React.useEffect(() => {
    axiosClient.get("/products").then((response) => {
      setProducts(response.data);
      console.log(response.data);
    });
  }, [refresh]);

  //Categories:
  React.useEffect(() => {
    axiosClient.get("/categories/number-products").then((response) => {
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
      setEmployees(response.data);
    });
  }, []);

  //Add new data:
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
      .catch((error) => {
        message.error("Add New Failed!");
        console.log(error);
      });
  };

  const onFinishFailed = (err) => {
    console.log("Error:", err);
  };

  //Update data:
  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/products/" + selectedProduct._id, values)
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

  const [createForm] = Form.useForm();
  const [updateForm] = Form.useForm();

  const columns = [
    {
      title: "",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (text) => {
        return (
          <div>
            {text && (
              <img src={`${API_URL}${text}`} style={{ width: 60 }} alt="" />
            )}
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => {
        return <strong style={{ color: "blue" }}>{text}</strong>;
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (text) => {
        return <strong>{numeral(text).format("0,0$")}</strong>;
      },
    },
    {
      title: "Sold",
      dataIndex: "sold",
      key: "sold",
      render: (text) => {
        return <strong>{numeral(text).format("0,0")}</strong>;
      },
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
      render: (text) => {
        return <strong>{numeral(text).format("0,0")}</strong>;
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

            {/* Edit */}
            <Button
              type="dashed"
              icon={<EditOutlined />}
              onClick={() => {
                setIsVisibleEditForm(true);
                console.log("Selected Product:", record);
                setSelectedProduct(record);
                updateForm.setFieldsValue(record);
              }}
            ></Button>
            {/* End of Edit */}

            {/* More Details */}
            <Button
              type="dashed"
              icon={<EllipsisOutlined />}
              onClick={() => {
                console.log("Selected Product:", record.name);
                setSelectedProductDetails(record);
              }}
            ></Button>

            {/* End of More Details */}
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      {/* Add new data */}
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
            label="Brand"
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
            label="Available Stock"
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
          <Form.Item label="Sold" name="sold">
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
        </Form>
      </Modal>
      {/* End of Add new Data */}

      {/* Show Product List */}
      <Tabs
        tabPosition="left"
        defaultActiveKey="1"
        items={[
          {
            label: `All Products`,
            key: "1",
            children: (
              <>
                <Table rowKey="_id" dataSource={products} columns={columns} />
              </>
            ),
          },
          {
            label: `Hot Items`,
            key: "2",
            children: (
              <>
              <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.hotItem === true) {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{
                                width: "320px",
                                marginBottom: "120px",
                              }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
            },
          {
            label: `New Arrival`,
            key: "3",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.newArrival === true) {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{
                                width: "320px",
                                marginBottom: "120px",
                              }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Smart Phone & Accessory`,
            key: "4",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63c54e640961dabce69b7c15") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Electronic Equipments`,
            key: "5",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde71d37b008a02e9d891a") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Laptop`,
            key: "6",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde7ab37b008a02e9d891e") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Watch`,
            key: "7",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde7d937b008a02e9d8920") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Household Electrical Appliances`,
            key: "8",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde83937b008a02e9d8924") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Sport & Travel`,
            key: "9",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde85d37b008a02e9d8926") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Mom & Babies`,
            key: "10",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde88a37b008a02e9d8928") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Home & Lifestyle`,
            key: "11",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde8a037b008a02e9d892a") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Beauty Products`,
            key: "12",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde8bc37b008a02e9d892c") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Healthcare Products`,
            key: "13",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde8cf37b008a02e9d892e") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Books`,
            key: "14",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde91337b008a02e9d8932") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Balo & Bags`,
            key: "15",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde92537b008a02e9d8934") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Pets Care Products`,
            key: "16",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde93837b008a02e9d8936") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
          {
            label: `Accessories & Jewelry`,
            key: "17",
            children: (
              <>
                <Row gutter={16}>
                  {products &&
                    products.map((p) => {
                      if (p.categoryId === "63dde94b37b008a02e9d8938") {
                        return (
                          <Col span={8} key={p._id}>
                            <Card
                              style={{ width: "320px", marginBottom: "120px" }}
                              bordered={true}
                              hoverable
                              cover={
                                <img
                                  alt=""
                                  src={`${API_URL}${p.imageUrl}`}
                                  style={{ width: "100%", height: "300px" }}
                                />
                              }
                              actions={[
                                <EditOutlined
                                  key="edit"
                                  title="Edit"
                                  onClick={() => {
                                    setIsVisibleEditForm(true);
                                    console.log("Selected Product:", p);
                                    setSelectedProduct(p);
                                    updateForm.setFieldsValue(p);
                                  }}
                                />,

                                <EllipsisOutlined
                                  key="ellipsis"
                                  title="More Details"
                                  onClick={() => {
                                    console.log("Selected Product:", p.name);
                                    setSelectedProductDetails(p);
                                  }}
                                />,

                                <Popconfirm
                                  title="Are you sure to delete this row?"
                                  onConfirm={() => {
                                    //Xóa data:
                                    const id = p._id;
                                    axiosClient
                                      .delete("/products/" + id)
                                      .then((response) => {
                                        message.success(
                                          "Deleted successfully!"
                                        );
                                        setRefresh((f) => {
                                          return f + 1;
                                        });
                                      })
                                      .catch((error) => {
                                        message.error("Deleted failed!");
                                        console.log("Error:", error);
                                      });
                                    console.log("Delete:", p);
                                  }}
                                  onCancel={() => {}}
                                  okText="Yes"
                                  cancelText="No"
                                >
                                  <DeleteOutlined />
                                </Popconfirm>,
                              ]}
                            >
                              <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                                <span>
                                  <Rate
                                    disabled
                                    allowHalf
                                    defaultValue={p.rating}
                                  />
                                </span>
                              </div>
                            </Card>
                          </Col>
                        );
                      }
                      return false;
                    })}
                </Row>
              </>
            ),
          },
        ]}
      />
      {/* End of Show Product List */}

      {/* Update Data */}
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
            label="Price"
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

          <Form.Item label="Sold" name="sold">
            <InputNumber style={{ minWidth: 200 }} />
          </Form.Item>

          <Form.Item
            label="Available Stock"
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
            label="Brand"
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

          <Form.Item label="Updated Date" name="updateddate">
            <Input />
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
      {/* End of Unpdate Data */}

      {/* See Product Details*/}
      <Modal
        title="Products In Details"
        centered
        open={selectedProductDetails}
        onCancel={() => {
          setSelectedProductDetails(null);
        }}
        onOk={() => {
          setSelectedProductDetails(null);
        }}
        width={"90%"}
      >
        {selectedProductDetails && (
          <div>
            <React.Fragment>
              <Image
                onClick={() => {
                  setIsPreview(true);
                }}
                preview={{
                  visible: false,
                }}
                width={400}
                height={400}
                src={`${API_URL}${selectedProductDetails?.imageUrl}`}
              />
              <div
                style={{
                  display: "none",
                }}
              >
                <Image.PreviewGroup
                  preview={{
                    visible: isPreview && selectedProductDetails._id,
                    onVisibleChange: (vis) => setIsPreview(vis),
                  }}
                >
                  <Image
                    src={`${API_URL}${selectedProductDetails?.imageUrl}`}
                  />
                  {selectedProductDetails &&
                    selectedProductDetails.images &&
                    selectedProductDetails.images.map((image) => {
                      return <Image key={image} src={`${API_URL}${image}`} />;
                    })}
                </Image.PreviewGroup>
              </div>
            </React.Fragment>

            <div
              style={{ fontSize: "20px", fontWeight: "bold", margin: "15px" }}
            >
              {selectedProductDetails?.name}
            </div>
            <div style={{ marginBottom: "15px" }}>
              Rating:
              <span style={{ margin: "8px" }}>
                <Rate
                  disabled
                  allowHalf
                  defaultValue={selectedProductDetails?.rating}
                />
              </span>
              ( 5.50k Customer Review )
            </div>

            <Descriptions>
              <Descriptions.Item label="Brand">
                {selectedProductDetails?.supplier?.name}
              </Descriptions.Item>

              <Descriptions.Item label="Published Date">
                {moment(selectedProductDetails?.createdDate).format(
                  "DD/MM/yyyy"
                )}
              </Descriptions.Item>

              <Descriptions.Item label="Price">
                {numeral(selectedProductDetails?.price).format("0,0$")}
              </Descriptions.Item>
              <Descriptions.Item label="Discount">
                {numeral(selectedProductDetails?.discount).format("0,0")}
              </Descriptions.Item>
              <Descriptions.Item label="Price After Discount">
                {numeral(selectedProductDetails?.total).format("0,0$")}
              </Descriptions.Item>
              <Descriptions.Item label="Sold">
                {numeral(selectedProductDetails?.sold).format("0,0")}
              </Descriptions.Item>
              <Descriptions.Item label="Available Stock">
                {numeral(selectedProductDetails?.stock).format("0,0")}
              </Descriptions.Item>
              <Descriptions.Item label="Total Revenue">
                {numeral(selectedProductDetails?.totalRevenue).format("0,0$")}
              </Descriptions.Item>
              <Descriptions.Item label="Color">
                <Space>
                  {selectedProductDetails?.color.map((color) => {
                    if (color) {
                      return <Tag color={color}>{color}</Tag>;
                    }
                    return false;
                  })}
                </Space>
              </Descriptions.Item>

              <Descriptions.Item label="Updated Date">
                {moment(selectedProductDetails?.updatedDate).format(
                  "DD/MM/yyyy"
                )}
              </Descriptions.Item>
              <Descriptions.Item label="Updated By">
                {selectedProductDetails?.updatedBy?.fullName}
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
      {/* End of Product Details */}
    </div>
  );
}

export default Products;
