import Head from "next/head";
import { useState } from "react";
import Image from "next/image";
import { Inter } from "@next/font/google";
// import styles from '@/styles/Home.module.css'
import styles from "./homepage/HomePage.module.css";
import img from "./homepage/images/maylanh.jpg";
import img1 from "./homepage/images/tivi.png";
import "bootstrap/dist/css/bootstrap.min.css";
import img2 from "./homepage/images/sofa.jpg";
import img3 from "./homepage/images/iphone.jpg";
import img4 from "./homepage/images/bepga.jpg";
import { API_URL } from "../constants/URLS";
import { axiosClient } from "../libraries/axiosClient";
import numeral from "numeral";
import { Rate } from "antd";
import { Statistic } from "antd";
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const inter = Inter({ subsets: ["latin"] });

export default function Home({ products, categories }) {
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
          <div className={styles.banner_container}>
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
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <Image
                      src={img}
                      className="d-block"
                      alt="sofa"
                      style={{ height: "450px", width: "100%" }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <button className={styles.carousel_button}>
                        <a href="/shop/ShopDefault">SHOP NOW</a>
                      </button>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <Image
                      src={img1}
                      className="d-block"
                      alt="dieuhoa"
                      style={{ height: "450px", width: "100%" }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <button className={styles.carousel_button}>
                        <a href="/shop/ShopDefault">SHOP NOW</a>
                      </button>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <Image
                      src={img2}
                      className="d-block"
                      alt="tulanh"
                      style={{ height: "450px", width: "100%" }}
                    />
                    <div className="carousel-caption d-none d-md-block">
                      <button className={styles.carousel_button}>
                        <a href="/shop/ShopDefault">SHOP NOW</a>
                      </button>
                    </div>
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
                <Image
                  src={img3}
                  alt=""
                  style={{
                    width: "100%",
                    height: "200px",
                    marginBottom: "50px",
                  }}
                />
              </a>
              <a href="/shop/ShopDefault">
                <Image
                  src={img4}
                  alt=""
                  style={{ width: "100%", height: "200px" }}
                />
              </a>
            </div>
          </div>
          <div className={styles.banner_features}>
            <div className={styles.banner_container}>
              <div className={styles.features_block}>
                <div className={styles.block_item}>
                  <div className={styles.block_left}>
                    <i
                      className="fa-solid fa-truck"
                      style={{
                        fontSize: "45px",
                        color: "orange",
                      }}
                    ></i>
                  </div>
                  <div className={styles.block_right}>
                    <h2 className={styles.block_heading}>Free Delivery</h2>
                    <span className={styles.block_desc}>
                      For all oders over 2.000.000đ
                    </span>
                  </div>
                </div>
                <div className={styles.block_item}>
                  <div className={styles.block_left}>
                    <i
                      className="fa-solid fa-dollar-sign"
                      style={{
                        fontSize: "45px",
                        color: "orange",
                      }}
                    ></i>
                  </div>
                  <div className={styles.block_right}>
                    <h2 className={styles.block_heading}>Discount Code</h2>
                    <span className={styles.block_desc}>
                      Many attractive discount codes
                    </span>
                  </div>
                </div>
                <div className={styles.block_item}>
                  <div className={styles.block_left}>
                    <i
                      className="fa-solid fa-cloud-bolt"
                      style={{
                        fontSize: "45px",
                        color: "orange",
                      }}
                    ></i>
                  </div>
                  <div className={styles.block_right}>
                    <h2 className={styles.block_heading}>Hunting Time Frame</h2>
                    <span className={styles.block_desc}>
                      Unlimited sale hunting
                    </span>
                  </div>
                </div>
                <div className={styles.block_item}>
                  <div className={styles.block_left}>
                    <i
                      className="fa-solid fa-message"
                      style={{
                        fontSize: "45px",
                        color: "orange",
                      }}
                    ></i>
                  </div>
                  <div className={styles.block_right}>
                    <h2 className={styles.block_heading}>24/7 Support</h2>
                    <span className={styles.block_desc}>Dedicated support</span>
                  </div>
                </div>
                <div className={styles.block_item}>
                  <div className={styles.block_left}>
                    <i
                      className="fa-solid fa-arrow-rotate-left"
                      style={{
                        fontSize: "45px",
                        color: "orange",
                        margin: "0 20px",
                      }}
                    ></i>
                  </div>
                  <div className={styles.block_right}>
                    <h2 className={styles.block_heading}>30 Days Return</h2>
                    <span className={styles.block_desc}>
                      If the fault is caused by the manufacturer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.home_deal}>
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
            <a href="/shop/ShopDefault" className={styles.deal_link}>
              View All
            </a>
          </div>
          <div className={styles.deal_content}>
            {products.map((product) => {
              return (
                <div key={product._id} style={{ height: "490px" }}>
                  <div
                    className="card"
                    style={{ width: "18rem", border: "none", height: "100%" }}
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
                      <a href="/shop/ShopDefault" className={styles.deal_shop}>
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
                      className="card-img-top"
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
      </main>
    </>
  );
}

export async function getStaticProps(context) {
  const products = await axiosClient.get("/products");
  const categories = await axiosClient.get("/categories");

  return {
    props: {
      products,
      categories,
    },

    // revalidate: 3600,
  };
}
