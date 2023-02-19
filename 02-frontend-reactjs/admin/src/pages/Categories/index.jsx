import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import {
  Tabs,
  Form,
  Button,
  message,
  Input,
  Modal,
  Card,
  Col,
  Row,
  Upload,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { API_URL } from "../../constants/URLS";
import numeral from "numeral";
import axios from "axios";
const { Meta } = Card;

function Categories() {
  //set usestate:
  const [categories, setCategories] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [isVisibleEditForm, setIsVisibleEditForm] = React.useState(false);
  const [isVisibleAddNewForm, setIsVisibleAddNewForm] = React.useState(false);
  const [isVisibleProductList, setIsVisibleProductList] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [file, setFile] = React.useState(null);

  //Set useEffect:

  //Category:
  React.useEffect(() => {
    axiosClient
      .get("/categories/number-products")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log("🧨", err);
      });
  }, [refresh]);

  //Add new Data:
  const onFinish = (values) => {
    axiosClient
      .post("/categories", values)
      .then((response) => {
        // UPLOAD FILE
        const { _id } = response.data;

        const formData = new FormData();
        formData.append("file", file);

        axios
          .post(API_URL + "/upload/categories/" + _id, formData)
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

  const onFinishFailed = (errors) => {
    console.log("🧨", errors);
  };

  //Update Data:
  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/categories/" + selectedCategory._id, values)
      .then((response) => {
        message.success("Updated Successful");
        updateForm.resetFields();
        setRefresh((f) => {
          return f + 1;
        });
        setIsVisibleEditForm(false);
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
    <div style={{ padding: "10px" }}>
      {/* Add new Data */}
      <div className="d-flex justify-content-end my-5">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            setIsVisibleAddNewForm(true);
          }}
          size="large"
        >
          Add New Category
        </Button>
      </div>

      <Modal
        centered
        title="Add New Category"
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
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Category Image" name="file">
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

      {/* Show Category List */}
      <Row gutter={16}>
        {categories &&
          categories.map((c) => {
            return (
              <Col
                span={8}
                style={{
                  marginBottom: "100px",
                  width: "250px",
                  height: "380px",
                }}
                key={c._id}
              >
                <Card
                  bordered={true}
                  hoverable
                  cover={
                    <img
                      alt=""
                      src={`${API_URL}${c.imageUrl}`}
                      style={{ width: "100%", height: "300px" }}
                    />
                  }
                  actions={[
                    <EditOutlined
                      key="edit"
                      title="Edit"
                      onClick={() => {
                        setIsVisibleEditForm(true);
                        console.log("Selected Category:", c);
                        setSelectedCategory(c);
                        updateForm.setFieldsValue(c);
                      }}
                    />,

                    <EllipsisOutlined
                      key="ellipsis"
                      title="More Details"
                      onClick={() => {
                        setIsVisibleProductList(true);
                        console.log("Selected Category:", c.name);
                        setSelectedCategory(c);
                      }}
                    />,
                  ]}
                >
                  <Meta
                    title={c.name}
                    description={`${c.numberOfProducts} products`}
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
      {/* End of Show Category List */}

      {/* Edit data */}
      <Modal
        centered
        title="Update Categories Info"
        open={isVisibleEditForm}
        onOk={() => {
          updateForm.submit();
          setIsVisibleEditForm(false);
        }}
        onCancel={() => {
          setIsVisibleEditForm(false);
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
          autoComplete="on"
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* End of Edit Data Form */}

      {/* View Product List Modal*/}
      <Modal
        title="Product List"
        centered
        open={isVisibleProductList}
        onOk={() => {
          setIsVisibleProductList(false);
        }}
        onCancel={() => {
          setIsVisibleProductList(false);
        }}
        width={"90%"}
      >
        <Tabs
          defaultActiveKey="1"
          items={[
            {
              label: `All Products`,
              key: "1",
              children: (
                <>
                  <div style={{ padding: "50px" }}>
                    <Row gutter={16}>
                      {selectedCategory &&
                        selectedCategory?.products.map((p) => {
                          return (
                            <Col span={8} key={p._id}>
                              <Card
                                style={{ width: "300px", marginBottom: "50px" }}
                                bordered={true}
                                hoverable
                                cover={
                                  <img
                                    alt=""
                                    src={`${API_URL}${p.imageUrl}`}
                                    style={{ width: "100%", height: "280px" }}
                                  />
                                }
                              >
                                <Meta
                                title={p.name}
                                style={{ marginBottom: "15px" }}
                              />
                              <div></div>
                                <p>{`Price : ${numeral(p.price).format(
                                  "0,0$"
                                )}`}</p>
                                <p>{`Sold: ${numeral(p.sold).format(
                                  "0,0"
                                )}`}</p>
                                <p>{`Avalable Stock: ${numeral(p.stock).format(
                                  "0,0"
                                )}`}</p>
                              </Card>
                            </Col>
                          );
                        })}
                    </Row>
                  </div>
                </>
              ),
            },

          ]}
        />
      </Modal>
      {/* End of Product list Modal */}
    </div>
  );
}

export default Categories;
