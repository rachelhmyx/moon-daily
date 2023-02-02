import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import {
  Table,
  Form,
  Button,
  message,
  Input,
  Space,
  Popconfirm,
  Modal,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

function Categories() {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "40%",
      render: (text) => {
        return <strong style={{ color: "blue" }}>{text}</strong>;
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: "40%",
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
                //Delete data:
                const id = record._id;
                axiosClient
                  .delete("/categories/" + id)
                  .then((response) => {
                    message.success("Deleted Successful!");
                    setRefresh((f) => {
                      return f + 1;
                    });
                  })
                  .catch((err) => {
                    message.error("Deleted Failed");
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
                setIsVisibleEditForm(true);
                console.log("Selected Record", record);
                setSelectRecord(record);
                updateForm.setFieldsValue(record);
              }}
            ></Button>
          </Space>
        );
      },
    },
  ];

  //set usestate:
  const [categories, setCategories] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0);
  const [isVisibleEditForm, setIsVisibleEditForm] = React.useState(false);
  const [isVisibleAddNewForm, setIsVisibleAddNewForm] = React.useState(false);
  const [selectedRecord, setSelectRecord] = React.useState(null);

  //Set useEffect:
  React.useEffect(() => {
    axiosClient
      .get("/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((err) => {
        console.log("🧨", err);
      });
  }, [refresh]);

  const onFinish = (values) => {
    axiosClient
      .post("/categories", values)
      .then((response) => {
        setRefresh((f) => {
          return f + 1;
        });
        message.success("Add New Successful");
        createForm.resetFields();
      })
      .catch((err) => {
        console.log("🧨", err);
      });
  };
  const onFinishFailed = (errors) => {
    console.log("🧨", errors);
  };

  const onUpdateFinish = (values) => {
    axiosClient
      .patch("/categories/" + selectedRecord._id, values)
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
          Add new category
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

      <Table dataSource={categories} columns={columns} />

      <Modal
        centered
        title="Update Categories Info"
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
    </div>
  );
}

export default Categories;
