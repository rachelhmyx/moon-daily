import React, { useState, useEffect } from "react";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";
import styles from "./SearchProducts.module.css";
import numeral from "numeral";
import Head from "next/head";
import Autocomplete from "react-autocomplete";
import { Rate } from "antd";

export default function Search() {
  const [value, setValue] = useState(4);

  const [search, setSearch] = useState("");
  const [filterProducts, setFilterProducts] = useState([]);

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axiosClient.get("/products").then((response) => {
      setFilterProducts(response);
    });
  }, [search]);

  const handleSelectProduct = (value, product) => {
    setSearch(value);
    setSelectedProduct(product);
  };

  // const handleProduct = (e) => {
  //   setSearch(e.target.value);
  // };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("search", search);
    axiosClient
      .post("/products/search/products", { name: search })
      .then((response) => {
        console.log(response);
        setFilterProducts(response);
      });
  };

  return (
    <>
      <Head>
        <title>SEARCH PRODUCT</title>
      </Head>
      <div className={styles.form_container}>
        <form onSubmit={handleSearch} style={{ border: "none" }}>
          {/* Trên PC */}
          <div className={styles.form_content_PC}>
            <Autocomplete
              items={filterProducts}
              getItemValue={(product) => product.name}
              renderItem={(product) => <div>{product.name}</div>}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSelect={handleSelectProduct}
              inputProps={{
                style: {
                  color: "green",
                  border: "none",
                  outline: "none",
                  fontSize: "24px",
                  width: "685px",
                  height: "56px",
                  paddingLeft: "20px",
                },
              }}
              wrapperStyle={{ border: "1px solid #888484" }}
              className={styles.mobile_form}
            />

            <button type="submit" className={styles.form_button}>
              Search
            </button>
          </div>
          {/* End */}
          {/* Trên Mobile */}
          <div className={styles.form_content}>
            <Autocomplete
              items={filterProducts}
              getItemValue={(product) => product.name}
              renderItem={(product) => <div>{product.name}</div>}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSelect={handleSelectProduct}
              inputProps={{
                style: {
                  color: "green",
                  border: "none",
                  outline: "none",
                  fontSize: "24px",
                  width: "70%",
                  height: "56px",
                  paddingLeft: "20px",
                },
              }}
              wrapperStyle={{ border: "1px solid #888484" }}
            />

            <button type="submit" className={styles.form_button}>
              Search
            </button>
          </div>
          {/* End */}
        </form>
      </div>
      <div className={styles.product_container}>
        <div className="row">
          {filterProducts &&
            filterProducts.map((product) => {
              return (
                <div
                  key={product._id}
                  className={`col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 ${styles.product_main}`}
                  style={{ margin: "40px 0" }}
                >
                  <div className={styles.hot_list}>
                    <div className={styles.hot_left}>
                      <a href={`/products/${product._id}`}>
                        <img
                          src={`${API_URL}/${product.imageUrl}`}
                          alt=""
                          style={{
                            width: "250px",
                            height: "250px",
                            marginLeft: "100px",
                          }}
                          className={styles.mobile_img}
                        />
                      </a>
                    </div>
                    <div className={styles.hot_right}>
                      <div className={styles.hot_name}>
                        <a href={`/products/${product._id}`}>{product.name}</a>
                      </div>
                      <Rate onChange={setValue} value={value} />
                      <div className={styles.product_item}>
                        <div style={{ color: "red" }}>
                          {numeral(product.price).format("0,0$")}
                        </div>
                        <div style={{ color: "violet" }}>
                          Sold: {product.sold}
                        </div>
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
