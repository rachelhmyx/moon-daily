import React, { useContext } from "react";
import Head from "next/head";
import styles from "./Whishlist.module.css";
import { DataContext } from "../../store/GlobalState";
import { API_URL } from "../../constants/URLS";
import numeral from "numeral";

export default function Whishlist() {
  const { state, dispatch } = useContext(DataContext);
  const { favourite } = state;

  return (
    <>
      <Head>
        <title>WHISHLIST</title>
      </Head>
      <div className={styles.whishlist_container}>
        <div className={styles.whishlist_header}>
          <div className={styles.whishlist_title}>
            <a className={styles.whishlist_link} href="/">
              HOME
            </a>
            <a className={styles.whishlist_link1} href="">
              Whishlist
            </a>
          </div>
        </div>
        <h1 className={styles.whishlist_heading}>WHISHLIST</h1>
        {favourite.length === 0 ? (
          <div className={styles.whishlist_name}>Wishlist is empty!</div>
        ) : (
          <table
            className={`table ps-table--shopping-cart ps-table--responsive ${styles.mobile_table}`}
            style={{
              maxWidth: "1130px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "60px",
            }}
          >
            <thead
              style={{
                backgroundColor: "#e4f36a",
                color: "#e35602",
                border: "1px solid #b9afaf",
                fontSize: "21px",
              }}
            >
              <tr>
                <th
                  className={styles.product_title}
                  style={{ width: "400px", paddingLeft: "34px" }}
                >
                  PRODUCT NAME
                </th>
                <th className={`styles.product_title} ${styles.mobile_title}`}>
                  PRICE
                </th>
                <th className={`styles.product_title} ${styles.mobile_title}`}>
                  DISCOUNT
                </th>
                <th className={`styles.product_title} ${styles.mobile_title}`}>
                  TOTAL
                </th>
                <th className={styles.product_title}>ACTION</th>
              </tr>
            </thead>
            <tbody>
              {favourite.map((item) => {
                // console.log("item", item);
                return (
                  <tr key={item._id} style={{ marginTop: "30px" }}>
                    <td
                      style={{
                        width: "330px",
                        overflow: "hidden",
                        verticalAlign: "middle",
                      }}
                    >
                      <div className={styles.whishlist_cart}>
                        <a
                          href={`/products/${item._id}`}
                          className={styles.whishlist_thumbnail}
                        >
                          <img
                            className="img-thumbnail"
                            src={`${API_URL}/${item.imageUrl}`}
                            alt=""
                            style={{ width: "120px", height: "120px" }}
                          />
                        </a>
                        <div className={styles.whishlist_content}>
                          <a href={`/products/${item._id}`}>{item.name}</a>
                        </div>
                      </div>
                    </td>
                    <td
                      data-label="price"
                      style={{
                        verticalAlign: "middle",
                        fontSize: "20px",
                      }}
                      className={styles.mobile_list}
                    >
                      {numeral(item.price).format("0,0$")}
                    </td>
                    <td
                      data-label="discount"
                      style={{
                        verticalAlign: "middle",
                        fontSize: "20px",
                      }}
                      className={styles.mobile_list}
                    >
                      {numeral(item.discount).format("0,0")}%
                    </td>

                    <td
                      data-label="total"
                      style={{
                        verticalAlign: "middle",
                        color: "#ed6a0b",
                        fontSize: "20px",
                      }}
                      className={styles.mobile_list}
                    >
                      {/* Tổng tiền theo số lượng của sản phẩm= tổng tiền 1sp( giá bán *(100- giảm giá)/100) * số lượng đặt hàng */}
                      {numeral(item.total * item.quantity).format("0,0$")}
                    </td>
                    <td
                      style={{
                        verticalAlign: "middle",
                        cursor: "pointer",
                        fontSize: "20px",
                        paddingLeft: "30px",
                      }}
                    >
                      <i
                        className="fa-solid fa-trash text-danger"
                        aria-hidden="true"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                        // Khi bấm chuột vào icon xóa thì sẽ hiện ra model để xóa sản phẩm
                        onClick={() => {
                          dispatch({
                            type: "ADD_MODAL",
                            payload: {
                              data: favourite,
                              id: item._id,
                              type: "ADD_FAVOURITE",
                            },
                          });
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
