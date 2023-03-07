import React, { useState } from "react";
import Head from "next/head";
import styles from "./Register.module.css";
import { useRouter } from "next/router";
import { message } from "antd";

export default function Register() {
  const router = useRouter();
  const initialState = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };
  const [userData, setUserData] = useState(initialState);
  const { name, email, password, confirm_password } = userData;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    //Lưu dữ liệu vào localStorage:
    localStorage.setItem("user", JSON.stringify(userData));
    message.success("Đăng ký thành công");
    //Chuyển sang trang home:
    //Cách 1:
    window.location.href = "/";
    //Cách 2:
    // router.push("/");
  };

  return (
    <>
      <Head>
        <title>REGISTER</title>
      </Head>
      <div className={styles.account_container}>
        <div className={styles.account_title}>
          <a className={styles.account_link} href="/">
            HOME
          </a>
          <a className={styles.account_link1} href="">
            REGISTER AN ACCOUNT
          </a>
        </div>
        <div className={styles.my_account}>
          <h1 className={styles.account_heading}>REGISTER</h1>
          <form className={styles.account_form} onSubmit={handleSubmit}>
            <h2 className={styles.account_name}>Register An Account</h2>
            <div className={styles.form}>
              <label
                htmlFor="name"
                className="form-label"
                style={{
                  color: "#3a3737",
                  fontSize: "18px",
                  paddingBottom: "4px",
                }}
              >
                Name
              </label>
              <input
                type="text"
                className={`form-control ${styles.mobile_form}`}
                id="name"
                name="name"
                value={name}
                onChange={handleChangeInput}
                style={{
                  height: "50px",
                  outline: "none",
                  border: "none",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  paddingLeft: "14px",
                  marginBottom: "20px",
                  width: "380px",
                }}
              />
            </div>
            <div className={styles.form}>
              <label
                htmlFor="exampleInputEmail1"
                className="form-label"
                style={{
                  color: "#3a3737",
                  fontSize: "18px",
                  paddingBottom: "4px",
                }}
              >
                Email Address
              </label>
              <input
                type="email"
                className={`form-control ${styles.mobile_form}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"
                name="email"
                value={email}
                onChange={handleChangeInput}
                style={{
                  height: "50px",
                  outline: "none",
                  border: "none",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  paddingLeft: "14px",
                  width: "380px",
                }}
              />
              <div
                id="emailHelp"
                className="form-text"
                style={{ padding: "8px 0 20px" }}
              >
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className={styles.form}>
              <label
                htmlFor="exampleInputPassword1"
                className="form-label"
                style={{
                  color: "#3a3737",
                  fontSize: "18px",
                  paddingBottom: "4px",
                }}
              >
                Password
              </label>
              <input
                type="password"
                className={`form-control ${styles.mobile_form}`}
                id="exampleInputPassword1"
                placeholder="Password..."
                name="password"
                value={password}
                onChange={handleChangeInput}
                style={{
                  height: "50px",
                  outline: "none",
                  border: "none",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  paddingLeft: "14px",
                  marginBottom: "25px",
                  width: "380px",
                }}
              />
            </div>
            <div className={styles.form}>
              <label
                htmlFor="exampleInputPassword2"
                className="form-label"
                style={{
                  color: "#3a3737",
                  fontSize: "18px",
                  paddingBottom: "4px",
                }}
              >
                Confirm Password
              </label>
              <input
                type="password"
                className={`form-control ${styles.mobile_form}`}
                id="exampleInputPassword2"
                placeholder="Password..."
                name="confirm_password"
                value={confirm_password}
                onChange={handleChangeInput}
                style={{
                  height: "50px",
                  outline: "none",
                  border: "none",
                  border: "1px solid #ccc",
                  fontSize: "16px",
                  paddingLeft: "14px",
                  width: "380px",
                }}
              />
            </div>
            <div className={styles.form_wrap}>
              <button
                type="submit"
                className={`btn btn-primary ${styles.mobile_form}`}
                style={{
                  height: "50px",
                  outline: "none",
                  border: "none",
                  border: "1px solid #ccc",
                  fontSize: "22px",
                  paddingLeft: "14px",
                  width: "380px",
                  cursor: "pointer",
                  backgroundColor: "#e9c61b",
                  marginTop: "26px",
                }}
              >
                Register
              </button>
              <span className={styles.account_desc}>
                You already have an account?
                <a className={styles.account_register} href="/login/Login">
                  Login Now
                </a>
              </span>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
