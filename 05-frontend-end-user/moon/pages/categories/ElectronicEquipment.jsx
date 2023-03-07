import React, { useState } from "react";
import { axiosClient } from "../../libraries/axiosClient";
import styles from "./CategoryId.module.css";
import Head from "next/head";
import { API_URL } from "../../constants/URLS";
import numeral from "numeral";
import { Rate } from "antd";

export default function ElectronicEquipment({ subCategories }) {
  const [value, setValue] = useState(4);

  return (
    <>
      <Head>
        <title>ELECTRONIC EQUIPMENT</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.shop_header}>
          <div className={styles.header_title}>
            <a className={styles.header_link} href="/">
              HOME
            </a>

            <a className={styles.header_link1} href="/shop/ShopDefault">
              SHOP DEFAULT
            </a>
            <div className={styles.header_link2}>ELECTRONIC EQUIPMENT</div>
          </div>
        </div>
        <div>
          {subCategories.map((c, id) => {
            if (id === 1) {
              return (
                <div key={c._id} className={styles.shop_container}>
                  <h3 className={styles.shop_heading}> {c.name}</h3>
                  <div className={styles.shop_label}>5 Products Found</div>

                  <div className={styles.shop_product}>
                    {c.products.map((p) => {
                      console.log("p", p);
                      return (
                        <div key={p._id} className={styles.product_item}>
                          <div
                            className="card"
                            style={{
                              width: "18rem",
                              border: "none",
                              height: "90%",
                              margin: 0,
                            }}
                          >
                            <div className={styles.layout_thumbnail}>
                              <a href={`/products/${p._id}`}>
                                <img
                                  src={`${API_URL}/${p.imageUrl}`}
                                  className="card-img-top"
                                  alt=""
                                  style={{
                                    width: "200px",
                                    height: "200px",
                                    marginLeft: "35px",
                                  }}
                                />
                              </a>
                              <div className={styles.layout_discount}>
                                - {p.discount} %
                              </div>
                            </div>
                            <div
                              className="card-body"
                              style={{ backgroundColor: "#fff" }}
                            >
                              <a
                                href="/shop/ShopDefault"
                                className={styles.layout_name}
                              >
                                YOUNG SHOP
                              </a>
                              <div className={styles.layout_list}>
                                <div className={styles.layout_item2}>
                                  {numeral(p.price).format("0,0$")}
                                </div>
                              </div>
                              <a
                                href={`/products/${p._id}`}
                                className="card-title"
                                style={{ fontSize: "22px", display: "block" }}
                              >
                                {p.name}
                              </a>
                              <Rate
                                onChange={setValue}
                                value={value}
                                className={styles.rate}
                              />
                              <p className={styles.layout_sold}>
                                Sold: {p.sold}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const subCategories = await axiosClient("/categories/number-products");

  return { props: { subCategories } };
}
