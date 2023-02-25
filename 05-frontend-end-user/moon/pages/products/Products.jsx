import Head from "next/head";
import React, { useContext } from "react";
import numeral from "numeral";
import styles from "./Products.module.css";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";

export default function Products({ products }) {
  //---------Thêm sản phẩm vào giỏ hàng----------------
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  // console.log("cart", cart);

  // const userLink = (id) => {
  //   return (
  //     <>
  //       <a
  //         href={`/products/${id}`}
  //         className="btn btn-info"
  //         style={{ marginRight: "5px", flex: 1, color: "#fff" }}
  //       >
  //         View
  //       </a>

  //       <button
  //         key={product._id}
  //         className="btn btn-success"
  //         style={{ marginLeft: "5px", flex: 1 }}
  //         disabled={product.stock === 0 ? true : false}
  //         onClick={() => dispatch(addToCart(product, cart))}
  //       >
  //         Buy
  //       </button>
  //     </>
  //   );
  // };
  return (
    <>
      <Head>
        <title>PRODUCTS</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <a className={styles.header_link} href="/">
              HOME
            </a>
            <a className={styles.header_link1} href="">
              PRODUCTS
            </a>
          </div>
        </div>
        <div className={styles.product_container}>
          {products &&
            products.map((p) => {
              return (
                <div key={p._id} style={{ height: "650px" }}>
                  <div className="card" style={{ width: "21rem" }}>
                    <img
                      src={`${API_URL}/${p.imageUrl}`}
                      className="card-img-top"
                      alt=""
                    />
                    <div className="card-body">
                      <h3 className="card-title">{p.name}</h3>
                      <div className="d-flex justify-content-between mx-0">
                        <p className={styles.product_price}>
                          {numeral(p.price).format("0,0$")}
                        </p>
                        <div>
                          {p.stock > 0 ? (
                            <span className="text-danger">
                              Stock: {numeral(p.stock).format("0,0.0")}
                            </span>
                          ) : (
                            <span className="text-danger">OutStock</span>
                          )}
                        </div>
                      </div>
                      <p style={{ color: "#ed14ed" }}>Sold: {p.sold}</p>

                      <p className="card-text">{p.description}</p>
                      <div className="d-flex justify-content-between mx-0">
                        <a
                          href={`/products/${p._id}`}
                          className="btn btn-info"
                          style={{ marginRight: "5px", flex: 1, color: "#fff" }}
                        >
                          View
                        </a>

                        <button
                          key={p._id}
                          className="btn btn-success"
                          style={{ marginLeft: "5px", flex: 1 }}
                          //--------Nếu stock=0 thì vô hiệu hóa button Buy ở dưới--------
                          disabled={p.stock === 0 ? true : false}
                          //---------Thêm sản phẩm vào giỏ hàng--------------
                          onClick={() => dispatch(addToCart(p, cart))}
                        >
                          Buy
                        </button>
                        {/* {userLink(product._id)} */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const products = await axiosClient.get("/products");

  return {
    props: {
      products,
    },

    revalidate: 3600,
  };
}
