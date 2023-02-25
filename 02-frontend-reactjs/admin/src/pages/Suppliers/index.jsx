import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import {
  //   Tabs,
  Form,
  Button,
  message,
  Input,
  Modal,
  Card,
  Col,
  Row,
  Upload,
  Avatar,
} from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { API_URL } from "../../constants/URLS";
import axios from "axios";
const { Meta } = Card;
function Suppliers() {
  //set useState:
  const [suppliers, setSuppliers] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [isVisibleEditForm, setIsVisibleEditForm] = React.useState(false);
  const [isVisibleAddNewForm, setIsVisibleAddNewForm] = React.useState(false);
  //   const [isVisibleProductList, setIsVisibleProductList] = React.useState(false);
  const [selectedSupplier, setSelectedSupplier] = React.useState(null);
  const [file, setFile] = React.useState(null);

  //set useEffect:
  React.useEffect(() => {
    axiosClient
      .get("/suppliers")
      .then((response) => {
        setSuppliers(response.data);
      })
      .catch((err) => {
        console.log("🧨", err);
      });
  }, [refresh]);

  //Add new Data:
  const onFinish = (values) => {
    axiosClient
      .post("/suppliers", values)
      .then((response) => {
        // UPLOAD FILE
        const { _id } = response.data;

        const formData = new FormData();
        formData.append("file", file);

        axios
          .post(API_URL + "/upload/suppliers/" + _id, formData)
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
      .patch("/suppliers/" + setSelectedSupplier._id, values)
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
          Add New Brand
        </Button>
      </div>

      <Modal
        centered
        title="Add New Brand"
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
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Please input brand name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Contact No." name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="address">
            <Input />
          </Form.Item>

          <Form.Item label="Brand Image" name="file">
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

      {/* Edit data */}
      <Modal
        centered
        title="Update Brand Info"
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
            label="Brand Name"
            name="name"
            rules={[{ required: true, message: "Please input category name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
          <Form.Item label="Contact No." name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="Location" name="address">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      {/* End of Edit Data Form */}

      {/* Show Supplier List */}
      <Row gutter={16}>
        {suppliers &&
          suppliers.map((s) => {
            return (
              <Col
                span={8}
                style={{
                  marginBottom: "100px",
                  width: "250px",
                  height: "380px",
                }}
                key={s._id}
              >
                <Card
                  bordered={true}
                  hoverable
                  actions={[
                    <EditOutlined
                      key="edit"
                      title="Edit"
                      onClick={() => {
                        setIsVisibleEditForm(true);
                        console.log("Selected Supplier:", s);
                        setSelectedSupplier(s);
                        updateForm.setFieldsValue(s);
                      }}
                    />,

                    <EllipsisOutlined
                      key="ellipsis"
                      title="More Details"
                      onClick={() => {
                        // setIsVisibleProductList(true);
                        console.log("Selected Supplier:", s.name);
                        setSelectedSupplier(s);
                      }}
                    />,
                  ]}
                >
                  <Meta
                    title={s.name}
                    avatar={
                      <Avatar src={`${API_URL}${s.imageUrl}`} size={120} />
                    }
                  />
                </Card>
              </Col>
            );
          })}
      </Row>
      {/* End of Supplier List */}
    </div>
  );
}

export default Suppliers;
