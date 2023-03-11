import React, { useState } from "react";
import Head from "next/head";
import styles from "./Login.module.css";
import { signIn } from "next-auth/react";
import { message } from "antd";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const initialState = {
    email: "",
    password: "",
  };
  const [memberData, setMemberData] = useState(initialState);
  const { email, password } = memberData;

  const handleChangeInput = (e) => {
    switch (e.target.name) {
      case "email":
        setMemberData({ ...memberData, email: e.target.value });
        break;
      case "password":
        setMemberData({ ...memberData, password: e.target.value });
        break;

      default:
        break;
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.setItem("member", JSON.stringify(memberData));
    message.success("Đăng nhập thành công!");
    signIn("credentials", {
      email,
      password,
      callbackUrl: "http://localhost:3000/",
      redirect: false,
    }).then(function (result) {
      if (result.error !== null) {
        if (result.status === 401) {
          console.log(
            "Your username/password combination was incorrect. Please try again"
          );
        } else {
          console.log(result.error);
        }
      } else {
        router.push(result.url);
      }
    });
  };

  return (
    <>
      <Head>
        <title>LOGIN</title>
      </Head>
      <div className={styles.account_container}>
        <div className={styles.account_header}>
          <div className={styles.account_title}>
            <a className={styles.account_link} href="/">
              HOME
            </a>
            <a className={styles.account_link1} href="">
              LOGIN
            </a>
          </div>
        </div>
        <div className={styles.my_account}>
          <h1 className={styles.account_heading}>LOGIN</h1>
          <form className={styles.account_form} onSubmit={handleLogin}>
            <h2 className={styles.account_name}>Log In Your Account</h2>
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
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={handleChangeInput}
                name="email"
                className={`form-control ${styles.mobile_input}`}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Email Address"
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
                value={password}
                onChange={handleChangeInput}
                name="password"
                className={`form-control ${styles.mobile_input}`}
                id="exampleInputPassword1"
                placeholder="Password..."
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
            <div
              className="mb-3 form-check"
              style={{ padding: "20px 0 4px", display: "flex" }}
            >
              <input
                type="checkbox"
                className="form-check-input form-control"
                id="exampleCheck1"
                style={{ width: "26px", height: "24px", margin: "0" }}
              />
              <label
                className="form-check-label"
                htmlFor="exampleCheck1"
                style={{
                  color: "#3a3737",
                  fontSize: "18px",
                  paddingLeft: "10px",
                }}
              >
                Remember me
              </label>
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${styles.mobile_input}`}
              style={{
                height: "50px",
                outline: "none",
                border: "none",
                border: "1px solid #ccc",
                fontSize: "22px",
                paddingLeft: "14px",
                width: "380px",
                backgroundColor: "#e9c61b",
                cursor: "pointer",
              }}
            >
              Login
            </button>
            <span className={styles.account_desc}>
              You don't have an account?
              <a className={styles.account_register} href="/register/Register">
                Register Now
              </a>
            </span>
          </form>
        </div>
      </div>
    </>
  );
}
