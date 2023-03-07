import React from "react";
import Head from "next/head";
import { API_URL } from "../../constants/URLS";
import { axiosClient } from "../../libraries/axiosClient";
import styles from "./Suppliers.module.css";
import numeral from "numeral";

export default function Suppliers({ subSuppliers }) {
  console.log("subSuppliers", subSuppliers);
  return (
    <>
      <Head>
        <title>SUPPLIERS</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <a className={styles.header_link} href="/">
              HOME
            </a>
            <a className={styles.header_link1} href="">
              SHOP SUPPLIERS
            </a>
          </div>
        </div>
      </div>
      <div className={styles.supplier_container}>
        {subSuppliers &&
          subSuppliers.map((supplier) => {
            return (
              <div key={supplier._id}>
                <div className={styles.supplier_list}>
                  <img
                    src={`${API_URL}${supplier.imageUrl}`}
                    alt=""
                    width={200}
                    height={100}
                    className={styles.mobile_img}
                  />
                  <h3 className={styles.supplier_heading}>{supplier.name}</h3>
                </div>
                <div className={`row ${styles.product_main}`}>
                  {supplier.products.map((product) => {
                    return (
                      <div
                        key={product._id}
                        className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12"
                        style={{
                          textAlign: "center",
                          border: "1px solid green",
                          marginTop: "50px",
                          paddingRight: "20px",
                        }}
                      >
                        <a
                          href={`/products/${product._id}`}
                          className={styles.product_content}
                        >
                          <img
                            src={`${API_URL}${product.imageUrl}`}
                            alt=""
                            style={{ marginTop: "20px" }}
                            width={200}
                            height={100}
                          />
                          <h3 className={styles.product_name}>
                            {product.name}
                          </h3>
                          <div className={styles.product_list}>
                            <p className={styles.product_price}>
                              {numeral(product.price).format("0,0$")}
                            </p>
                            <p className={styles.product_sold}>
                              Sold: {product.sold}
                            </p>
                          </div>
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const subSuppliers = await axiosClient.get("/suppliers/number-products");

  return {
    props: {
      subSuppliers,
    },

    // revalidate: 3600,
  };
}
