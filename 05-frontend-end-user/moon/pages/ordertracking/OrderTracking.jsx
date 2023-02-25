import React from "react";
import Head from "next/head";
import styles from "./OrderTracking.module.css";

export default function OrderTracking() {
  return (
    <>
      <Head>
        <title>ORDER TRACKING</title>
      </Head>
      <div className={styles.order_container}>
        <div className={styles.order_header}>
          <div className={styles.order_title}>
            <a className={styles.order_link} href="/">
              HOME
            </a>
            <a className={styles.order_link1} href="">
              Order Tracking
            </a>
          </div>
        </div>
        <h1 className={styles.order_heading}>ORDER TRACKING</h1>
        <div className={styles.order_content}>
          <div className={styles.order_name}>
            <span className={styles.order_desc}>
              To track your order please enter your Order ID in the box below
              and press the "Track" button. This was given to you on your
              receipt and in the confirmation email you should have received.
            </span>
          </div>
        </div>
        <div className={styles.order_form}>
          <form action="/" method="get" className={styles.form_list}>
            <div className={styles.form_group}>
              <label className={styles.form_label}>Order ID</label>
              <input
                className="form-control"
                type="text"
                placeholder="Found in your order confirmation email"
                style={{
                  outline: "none",
                  fontSize: "16px",
                  padding: "17px 10px",
                  margin: "12px 0 25px",
                  border: "none",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div className={styles.form_group}>
              <label className={styles.form_label}>Billing Email</label>
              <input
                className="form-control"
                type="text"
                placeholder=""
                style={{
                  outline: "none",
                  fontSize: "16px",
                  padding: "17px 10px",
                  margin: "12px 0 25px",
                  border: "none",
                  border: "1px solid #ccc",
                }}
              />
            </div>
            <div className={styles.form_group}>
              <button className={styles.form_button}>Tract Your Order</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
