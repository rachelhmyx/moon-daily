import React from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { Form, message, Input, Button, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

function Login() {
  const onFinish = (values) => {
    const { username, password } = values;
    axiosClient
      .post("/auth/login-jwt", { username, password })
      .then((response) => {
        //Login OK
        window.location.href = "/home";
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          message.error("Login Failed!");
        }
      });
  };

  return (
    <>
      <div className="form-block">
        <div className="my-5 w-25 bg-white rounded-3 mx-auto p-5">
          <h3 className="text-center fw-bold w-100">Login</h3>
          <p className="text-center fs-5">Login to your account to continue</p>

          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              username: "",
              password: "",
              remember: true,
            }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your email" },
                { type: "email", message: "Email is invalid" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <a className="login-form-forgot" href="/forgot-password">
                Forgot password
              </a>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Login
              </Button>
              Or <a href="/">register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
