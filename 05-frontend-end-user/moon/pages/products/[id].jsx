import React, { useState, useContext } from "react";
import Head from "next/head";
import numeral from "numeral";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";
import { Rate } from "antd";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { addToFavourite } from "../../store/Actions";
import styles from "./Products.module.css";

export default function ProductDetails({ product }) {
  //-----------Set cho ảnh con-------------------------
  const [tab, setTab] = useState(0);
  //------------Set rate mặc định là 4 sao---------------
  const [value, setValue] = useState(4);
  // -----------Thêm vào giỏ hàng-------------------
  const { state, dispatch } = useContext(DataContext);
  const { favourite } = state;
  const { cart } = state;
  console.log(cart);
  console.log(product);
  //-------------------------------------------------
  // console.log("product", product);
  return (
    <>
      <div
        className={`d-flex justify-content-around align-items-center ${styles.product_containers}`}
        style={{ marginRight: "auto", marginLeft: "auto" }}
      >
        <Head>
          <title>ProductDetails</title>
        </Head>
        <div
          className={`row ${styles.product_row}`}
          style={{
            width: "1020px",
            // height: "620px",
            paddingTop: "30px",
            backgroundColor: "#75f9da",
            marginTop: "40px",
          }}
        >
          <div className="col-md-6">
            <img
              src={`${API_URL}/${product.images[tab]}`}
              alt=""
              className="d-block img-thumbnail rounded mt-4 w-100"
              // style={{ height: "400px" }}
            />
            <div
              className={`row mx-0 ${styles.mobile_list}`}
              style={{
                cursor: "pointer",
                paddingTop: "20px",
                marginBottom: "50px",
              }}
            >
              {product.images.map((img, index) => {
                console.log("img", img);
                return (
                  <img
                    key={index}
                    src={`${API_URL}/${img}`}
                    alt=""
                    className={`img-thumbnail rounded img-item ${styles.mobile_img}`}
                    style={{
                      width: "20%",
                      height: "80px",
                      border: "1px solid red",
                      marginRight: "20px",
                      transitionDuration: "0.3s",
                    }}
                    onClick={() => {
                      setTab(index);
                    }}
                  />
                );
              })}
            </div>
          </div>
          <div className="col-md-6 mt-3" style={{ padding: "0 38px" }}>
            <h1
              className={`text-uppercase ${styles.mobile_heading}`}
              style={{
                fontSize: "50px",
                color: "green",
                margin: 0,
              }}
            >
              {product.name}
            </h1>
            <div
              style={{
                borderBottom: "1px solid rgb(227 214 214)",
                paddingBottom: "10px",
                marginBottom: "10px",
              }}
            >
              <Rate onChange={setValue} value={value} />
            </div>
            <div className="product_menu">
              <span
                className="text-info"
                style={{
                  fontSize: "23px",
                  fontWeight: "600",
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  padding: "5px",
                }}
              >
                {numeral(product.price).format("0,0$")}
              </span>
              <span className="product_sold">Sold: {product.sold}</span>
            </div>
            <div
              className=" mx-0 d-flex justify-content-between"
              style={{ fontSize: "20px", margin: "10px 0" }}
            >
              <div>
                {product.stock > 0 ? (
                  <span className="text-danger">In Stock: {product.stock}</span>
                ) : (
                  <span className="text-danger">Out Stock</span>
                )}
              </div>
              <span style={{ color: "#471ceb" }}>
                Discount: {product.discount}
              </span>
            </div>
            <div style={{ paddingTop: "10px", fontSize: "19px" }}>
              Description: {product.description}
            </div>
            <div className="button_list">
              <button
                type="button"
                className={`btn btn-success d-block my-5 px-5 ${styles.mobile_button}`}
                style={{ marginTop: "20px" }}
                onClick={() => dispatch(addToCart(product, cart))}
              >
                BUY NOW
              </button>
              <button
                type="button"
                className={`button-heart ${styles.mobile_button1}`}
                onClick={() => dispatch(addToFavourite(product, favourite))}
              >
                MY FAVOURITE
                <i className="fa-regular fa-heart icon-heart"></i>
              </button>
            </div>
          </div>
        </div>
        <div
          style={{
            height: "440px",
            width: "350px",
            backgroundColor: "#ebf374",
          }}
          className={styles.mobile_menu}
        >
          <div
            className="d-flex align-items-center"
            style={{ margin: "10px 0" }}
          >
            <i
              className="fa-solid fa-globe"
              style={{ fontSize: "40px", padding: "0 20px", color: "#e3715e" }}
            ></i>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "500",
                color: "#e3715e",
                paddingTop: "20px",
              }}
            >
              Shipping worldwide
            </p>
          </div>
          <div className="d-flex align-items-center">
            <i
              className="fa-solid fa-rotate"
              style={{ fontSize: "40px", padding: "0 20px", color: "#e3715e" }}
            ></i>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "500",
                color: "#e3715e",
                paddingTop: "20px",
              }}
            >
              Free 7-day return if eligible, so easy
            </p>
          </div>
          <div className="d-flex align-items-center">
            <i
              className="fa-solid fa-receipt"
              style={{ fontSize: "40px", padding: "0 20px", color: "#e3715e" }}
            ></i>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "500",
                color: "#e3715e",
                paddingTop: "20px",
              }}
            >
              Supplier give bills for this product.
            </p>
          </div>
          <div className="d-flex align-items-center">
            <i
              className="fa-solid fa-credit-card"
              style={{ fontSize: "40px", padding: "0 20px", color: "#e3715e" }}
            ></i>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "500",
                color: "#e3715e",
                paddingTop: "20px",
              }}
            >
              Pay online or when receiving goods
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = await axiosClient.get("/products");
  const paths = products.map((product) => ({
    params: { id: product._id },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params: { id } }) {
  console.log("id", id);
  // console.log("params", params);

  // const product = await axiosClient(`/products/${params.id}`);
  const product = await axiosClient(`/products/${id}`);
  // console.log("product", product);
  return {
    props: {
      product,
    },
  };
}
