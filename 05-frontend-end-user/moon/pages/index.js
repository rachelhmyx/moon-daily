import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from '@/styles/Home.module.css'
import styles from "./homepage/HomePage.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { API_URL } from "../constants/URLS";
import { axiosClient } from "../libraries/axiosClient";
import numeral from "numeral";
import { Rate } from "antd";
import { Statistic } from "antd";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  products,
  categories,
  slides,
  advertisements,
  features,
}) {
  // console.log("f", features);

  const [value, setValue] = useState(4);

  const toggleCarousel = (action) => {
    const { Carousel } = require("bootstrap");
    const carousel = new Carousel("#demo");
    if (action === "next") {
      carousel.next();
    } else {
      carousel.prev();
    }
  };

  return (
    <>
      <Head>
        <title>MOON</title>
      </Head>
      <main className={styles.home_page}>
        <div className={styles.home_banner}>
          {/* Trên PC */}
          <div className={styles.banner_container_PC}>
            <div className={styles.banner_left}>
              <div
                id="carouselExampleCaptions"
                className="carousel slide"
                data-bs-ride="false"
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="3"
                    aria-label="Slide 4"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleCaptions"
                    data-bs-slide-to="4"
                    aria-label="Slide 5"
                  ></button>
                </div>
                <div className="carousel-inner">
                  {slides.map((s, index) => {
                    // console.log("index", index);
                    if (s.sortOrder === 0) {
                      return (
                        <div className="carousel-item active" key={s._id}>
                          <img
                            src={`${API_URL}/${s.imageUrl}`}
                            className="d-block"
                            alt=""
                            style={{ height: "450px", width: "100%" }}
                          />
                        </div>
                      );
                    }
                    if (s.sortOrder !== 0) {
                      return (
                        <div className="carousel-item" key={s._id}>
                          <img
                            src={`${API_URL}/${s.imageUrl}`}
                            className="d-block"
                            alt=""
                            style={{ height: "450px", width: "100%" }}
                          />
                        </div>
                      );
                    }
                  })}

                  <div className="carousel-caption d-none d-md-block">
                    <button className={styles.carousel_button}>
                      <a href="/shop/ShopDefault">SHOP NOW</a>
                    </button>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
            <div className={styles.banner_right}>
              <a href="/shop/ShopDefault">
                {advertisements &&
                  advertisements.map((a) => {
                    return (
                      <img
                        key={a._id}
                        src={`${API_URL}/${a.imageUrl}`}
                        alt=""
                        style={{
                          width: "100%",
                          height: "200px",
                          marginBottom: "50px",
                        }}
                      />
                    );
                  })}
              </a>
            </div>
          </div>
          {/* End */}
          {/* Trên Mobile */}
          <div className={styles.mobile_banner}>
            <div className={styles.banner_left}>
              <div id="demo" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                  {slides.map((s) => {
                    if (s.sortOrder === 0) {
                      return (
                        <div className="carousel-item active" key={s._id}>
                          <img
                            src={`${API_URL}/${s.imageUrl}`}
                            className="d-block"
                            alt=""
                            style={{ height: "215px", width: "100%" }}
                          />
                        </div>
                      );
                    }
                    if (s.sortOrder !== 0) {
                      return (
                        <div className="carousel-item" key={s._id}>
                          <img
                            src={`${API_URL}/${s.imageUrl}`}
                            className="d-block"
                            alt=""
                            style={{ height: "215px", width: "100%" }}
                          />
                        </div>
                      );
                    }
                  })}
                  <div className="carousel-caption d-md-block">
                    <button className={styles.carousel_button}>
                      <a href="/shop/ShopDefault">SHOP NOW</a>
                    </button>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  href="#demo"
                  data-slide="prev"
                  onClick={() => toggleCarousel("prev")}
                >
                  <span
                    className={`carousel-control-prev-icon ${styles.mobile_icon}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#e9822b",
                    }}
                  ></span>
                </a>
                <a
                  className="carousel-control-next"
                  href="#demo"
                  data-slide="next"
                  onClick={() => toggleCarousel("next")}
                >
                  <span
                    className={`carousel-control-next-icon ${styles.mobile_icon}`}
                    style={{
                      width: "50px",
                      height: "50px",
                      backgroundColor: "#e9822b",
                    }}
                  ></span>
                </a>
              </div>
            </div>
            <div className={styles.banner_right}>
              <a
                href="/shop/ShopDefault"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                {advertisements &&
                  advertisements.map((a) => {
                    return (
                      <img
                        key={a._id}
                        src={`${API_URL}/${a.imageUrl}`}
                        alt=""
                        style={{
                          width: "48%",
                          height: "100px",
                          marginBottom: "50px",
                        }}
                      />
                    );
                  })}
              </a>
            </div>
          </div>
          {/* End */}
          <div className={styles.banner_features}>
            <div className={styles.banner_container}>
              <div className={styles.features_block}>
                {features &&
                  features.map((f) => {
                    return (
                      <div className={styles.block_item} key={f._id}>
                        <div className={styles.block_left}>
                          <i
                            className={f.icon}
                            style={{
                              fontSize: "45px",
                              color: "orange",
                            }}
                          ></i>
                        </div>
                        <div className={styles.block_right}>
                          <h2 className={styles.block_heading}>{f.title}</h2>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        <div className={styles.home_deal}>
          {/* Trên PC */}
          <div className={styles.deal_header_PC}>
            <div className={styles.deal_left}>
              <h3 className={styles.deal_heading}>Deal Of The Day</h3>
            </div>
            <div className={styles.deal_right}>
              <h4 className={styles.deal_name}>End In: </h4>
              <Countdown
                value={deadline}
                style={{ color: "#fff !important", fontWeight: "700" }}
              />
            </div>
            <a href="/shop/ShopDefault" className={styles.deal_link}>
              View All
            </a>
          </div>
          {/* End */}
          {/* Trên Mobile */}
          <div className={styles.deal_mobile}>
            <div className={styles.deal_header}>
              <div className={styles.deal_left}>
                <h3 className={styles.deal_heading}>Deal Of The Day</h3>
              </div>
              <div className={styles.deal_right}>
                <h4 className={styles.deal_name}>End In: </h4>
                <Countdown
                  value={deadline}
                  style={{ color: "#fff !important", fontWeight: "700" }}
                />
              </div>
            </div>
            <a href="/shop/ShopDefault" className={styles.deal_link}>
              View All
            </a>
          </div>
          {/* End */}
          <div className={styles.deal_content}>
            {products.map((product) => {
              if (product.dealOfTheDay === true) {
                return (
                  <div key={product._id} style={{ height: "490px" }}>
                    <div
                      className="card"
                      style={{ width: "20rem", border: "none", height: "100%" }}
                    >
                      <div className={styles.deal_thumbnail}>
                        <a href={`products/${product._id}`}>
                          <img
                            src={`${API_URL}/${product.imageUrl}`}
                            className="card-img-top"
                            alt=""
                            style={{
                              width: "200px",
                              height: "200px",
                              marginLeft: "35px",
                            }}
                          />
                        </a>
                        <div className={styles.deal_discount}>
                          - {product.discount} %
                        </div>
                      </div>
                      <div
                        className="card-body"
                        style={{ backgroundColor: "#fff" }}
                      >
                        <a
                          href="/shop/ShopDefault"
                          className={styles.deal_shop}
                        >
                          YOUNG SHOP
                        </a>
                        <div className={styles.deal_list}>
                          <p className={styles.deal_item1}>
                            {numeral(product.price).format("0,0$")}
                          </p>
                          <div className={styles.deal_item2}>
                            {product.stock > 0 ? (
                              <p>Stock: {product.stock}</p>
                            ) : (
                              <p>Out Stock</p>
                            )}
                          </div>
                        </div>
                        <a
                          href={`/products/${product._id}`}
                          className="card-title"
                          style={{ fontSize: "22px", display: "block" }}
                        >
                          {product.name}
                        </a>
                        <Rate onChange={setValue} value={value} />
                        <p className={styles.deal_sold}>Sold: {product.sold}</p>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
        <div className={styles.home_categories}>
          <h3 className={styles.categories_header}>Top Categories</h3>
          <div className="row">
            {categories.map((category) => {
              return (
                <div
                  className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6"
                  key={category._id}
                >
                  <a
                    href="/shop/ShopDefault"
                    className={styles.categories_card}
                    style={{ height: "250px" }}
                  >
                    <img
                      src={`${API_URL}/${category.imageUrl}`}
                      className={`card-img-top ${styles.mobile_img}`}
                      alt=""
                      style={{
                        width: "155px",
                        height: "155px",
                        marginTop: "15px",
                        marginLeft: "48px",
                      }}
                    />
                    <h5 className={styles.categories_title}>{category.name}</h5>
                  </a>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.hot_product}>
          <h3 className={styles.hot_heading}>Hot New Arrivals</h3>
          <div className={styles.hot_container}>
            <div className="row">
              {products.map((p) => {
                if (p.newArrival === true) {
                  return (
                    <div
                      key={p._id}
                      className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12"
                      style={{ margin: "40px 0" }}
                    >
                      <div className={styles.hot_list}>
                        <div className={styles.hot_left}>
                          <a href={`products/${p._id}`}>
                            <img
                              src={`${API_URL}/${p.imageUrl}`}
                              alt=""
                              style={{
                                width: "100px",
                                height: "100px",
                                marginLeft: "35px",
                              }}
                            />
                          </a>
                        </div>
                        <div className={styles.hot_right}>
                          <div className={styles.hot_name}>
                            <a href={`products/${p._id}`}>{p.name}</a>
                          </div>
                          <Rate onChange={setValue} value={value} />
                          <div>{numeral(p.price).format("0,0$")}</div>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const products = await axiosClient.get("/products");
  const categories = await axiosClient.get("/categories");
  const slides = await axiosClient.get("/slides");
  const advertisements = await axiosClient.get("/advertisements");
  const features = await axiosClient.get("/features");

  return {
    props: {
      products,
      categories,
      slides,
      advertisements,
      features,
    },

    // revalidate: 3600,
  };
}
