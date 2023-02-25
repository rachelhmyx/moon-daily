import React from "react";
import Head from "next/head";
import styles from "./Login.module.css";
// import { axiosClient } from "../../libraries/axiosClient";

export default function Login() {
  // const onFinish = (values) => {
  //   const { username, password } = values;
  //   axiosClient
  //     .post("/auth/login-jwt", { username, password })
  //     .then((response) => {
  //       //LOGIN OK
  //       window.location.href = "/";
  //       console.log(response.data);
  //     })
  //     .catch((err) => {
  //       if (err.response.status === 401) {
  //         message.error("Đăng nhập không thành công!");
  //       }
  //     });
  // };
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
          <form className={styles.account_form}>
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
                name="email"
                className="form-control"
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
                name="password"
                className="form-control"
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
              className="btn btn-primary"
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

// export async function getStaticProps(context) {
//   const auth = await axiosClient.post("/auth/login-jwt");

//   return {
//     props: {
//       auth,
//     },

//     revalidate: 3600,
//   };
// }
