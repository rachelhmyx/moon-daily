import React, { useState, useContext } from "react";
import Head from "next/head";
import styles from "./ShopDefault.module.css";
import Image from "next/image";
import img from "./images/maygiat.png";
import img1 from "./images/tulanh.jpg";
import img2 from "./images/son.jpg";
import img10 from "./images/laptop.jpeg";
import img11 from "./images/dieuhoa.jpeg";
import img12 from "./images/lo nuong.jpeg";
import img13 from "./images/baby.jpeg";
import img14 from "./images/my pham.jpeg";
import img15 from "./images/thuc pham.jpeg";
import img16 from "./images/daychuyen.jpeg";
import img17 from "./images/hotel.jpeg";
import { API_URL } from "../../constants/URLS";
import { Rate } from "antd";
import numeral from "numeral";
import { DataContext } from "../../store/GlobalState";
import { addToFavourite } from "../../store/Actions";
import { axiosClient } from "../../libraries/axiosClient";

export default function ShopDefault({
  suppliers,
  products,
  categories,
  subCategories,
}) {
  const [value, setValue] = useState(4);
  const { state, dispatch } = useContext(DataContext);
  const { favourite } = state;

  // console.log("categories", subCategories);

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
        <title>SHOP DEFAULT</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.shop_header}>
          <div className={styles.header_title}>
            <a className={styles.header_link} href="/">
              HOME
            </a>
            <a className={styles.header_link1} href="">
              SHOP DEFAULT
            </a>
          </div>
        </div>
        <div className={styles.shop_container}>
          <div className={styles.shop_banner}>
            <div id="demo" className="carousel slide" data-ride="carousel">
              {/* <ul className="carousel-indicators">
                <li data-slide-to="0" className="active"></li>
                <li data-slide-to="1"></li>
                <li data-slide-to="2"></li>
              </ul> */}

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <Image
                    className={styles.img_name}
                    src={img}
                    alt=""
                    width={1650}
                    height={470}
                  />
                </div>
                <div className="carousel-item">
                  <Image
                    className={styles.img_name}
                    src={img1}
                    alt=""
                    width={1650}
                    height={470}
                  />
                </div>
                <div className="carousel-item">
                  <Image
                    className={styles.img_name}
                    src={img2}
                    alt=""
                    width={1650}
                    height={470}
                  />
                </div>
              </div>

              <a
                className="carousel-control-prev"
                href="#demo"
                data-slide="prev"
                onClick={() => toggleCarousel("prev")}
              >
                <span
                  className="carousel-control-prev-icon"
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
                  className="carousel-control-next-icon"
                  style={{
                    width: "50px",
                    height: "50px",
                    backgroundColor: "#e9822b",
                  }}
                ></span>
              </a>
            </div>
          </div>
          {/* <div className={styles.shop_brand}>
            {suppliers &&
              suppliers.map((supplier) => {
                return (
                  <a href="" key={supplier._id}>
                    <img
                      src={`${API_URL}/${supplier.imageUrl}`}
                      width={150}
                      height={70}
                    />
                  </a>
                );
              })}
          </div> */}
          <div className={styles.shop_categories}>
            {/* {subCategories &&
              subCategories.map((category) => {
                return (
                  <div className={styles.group_menu} key={category._id}>
                    <div className={styles.group_left}>
                      <img
                        src={`${API_URL}/${category.imageUrl}`}
                        alt=""
                        width={100}
                        height={120}
                        style={{ padding: "20px 0 0 5px" }}
                      />
                    </div>
                    <div className={styles.group_right}>
                      <h3 className={styles.group_heading}>{category.name}</h3>
                      <ul className={styles.group_list}>
                        {category.products.map((c) => {
                          return (
                            <li className={styles.group_item} key={c._id}>
                              <a
                                className={styles.links_item}
                                href="/shop/ShopDefault"
                              >
                                {c.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                );
              })} */}
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img10}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>
                  Smart Phone & Accessory
                </h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Desktop PC
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Laptop
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Tablet
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Phone
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img11}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>Electronic Equipment</h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Air Conditioners
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Washing Machines
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Office Electronics
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      TV Televisions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img12}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>
                  Household Electrical Appliances
                </h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Blender
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Gas Stove
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Electric Fan
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Oil-free Fryer
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img13}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>Mom & Babies</h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Newborn Toys
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Diaper Towel
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Baby Socks
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Beanie
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img14}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>Beauty Products</h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Lipstick
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Sunscreen
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Cream Liner
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Cleanser
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img15}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>Healthcare Products</h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Face Lift Machine
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Massage Machine
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Shower Gel
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Exfoliating Pad
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img16}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>Accessories & Jewelry</h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Watch
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Necklace
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Ring
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Earring
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.group_menu}>
              <div className={styles.group_left}>
                <Image
                  src={img17}
                  alt=""
                  width={100}
                  height={120}
                  style={{ padding: "20px 0 0 5px" }}
                />
              </div>
              <div className={styles.group_right}>
                <h3 className={styles.group_heading}>Sport & Travel</h3>
                <ul className={styles.group_list}>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Plane Ticket
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Sport Shoes
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Hotels & Motels
                    </a>
                  </li>
                  <li className={styles.group_item}>
                    <a className={styles.links_item} href="/shop/ShopDefault">
                      Sportswear
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={styles.layout_shop}>
            <h3 className={styles.layout_heading}>Best Sale Item</h3>
            <div className={styles.layout_product}>
              {products &&
                products.map((product) => {
                  if (product.hotItem === true) {
                    return (
                      <div
                        key={product._id}
                        style={{ height: "500px" }}
                        className={styles.product_item}
                      >
                        <div
                          className="card"
                          style={{
                            width: "20rem",
                            border: "none",
                            height: "90%",
                          }}
                        >
                          <div className={styles.layout_thumbnail}>
                            <a href={`/products/${product._id}`}>
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
                            <div className={styles.layout_discount}>
                              - {product.discount} %
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
                              <p className={styles.layout_item1}>
                                {numeral(product.total).format("0,0$")}
                              </p>
                              <div className={styles.layout_item2}>
                                {numeral(product.price).format("0,0$")}
                              </div>
                            </div>
                            <a
                              href={`/products/${product._id}`}
                              className="card-title"
                              style={{
                                fontSize: "22px",
                                display: "block",
                              }}
                            >
                              {product.name}
                            </a>
                            <Rate
                              onChange={setValue}
                              value={value}
                              className={styles.rate}
                            />
                            <p className={styles.layout_sold}>
                              Sold: {product.sold}
                            </p>
                            <button
                              type="button"
                              className={styles.layout_button}
                              onClick={() =>
                                dispatch(addToFavourite(product, favourite))
                              }
                            >
                              MY FAVOURITE
                              <i
                                className="fa-regular fa-heart"
                                style={{
                                  paddingLeft: "12px",
                                  fontSize: "21px",
                                }}
                              ></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
            </div>
          </div>
          <div className={styles.shop_menu}>
            <div className={styles.menu_left}>
              <div className={styles.menu_heading}>CATEGORIES</div>
              <div className={styles.menu_content}>
                {/* {subCategories &&
                  subCategories.map((category) => {
                    return (
                      <div key={category._id} className={styles.menu_text}>
                        <a href={`/categories/${category._id}`}>
                          {category.name}
                        </a>
                      </div>
                    );
                  })} */}
                <ul className={styles.menu_list}>
                  <li className={styles.menu_text}>
                    <a href="/categories/SmartPhoneAccessory">
                      Smart Phone & Accessory
                    </a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/categories/ElectronicEquipment">
                      Electronic Equipment
                    </a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/categories/HouseholdElectricalAppliances">
                      Household Electrical Appliances
                    </a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/categories/MomBabies">Mom & Babies</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/categories/BeautyProducts">Beauty Products</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/categories/FashionAccessory">
                      Fashion And Accessory
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.menu_right}>
              <div className={styles.menu_heading}>BY BRANDS</div>
              <div className={styles.menu_content}>
                {/* {suppliers.map((supplier) => {
                  return (
                    <div key={supplier._id} className={styles.menu_text}>
                      <a href="/suppliers/Suppliers">{supplier.name}</a>
                    </div>
                  );
                })} */}
                <ul className={styles.menu_list}>
                  <li className={styles.menu_text}>
                    <a href="/suppliers/Suppliers">SAMSUNG</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/suppliers/Suppliers">DIOR</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/suppliers/Suppliers">SHARP STORE</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/suppliers/Suppliers">APPLE</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/suppliers/Suppliers">OPPO STORE</a>
                  </li>
                  <li className={styles.menu_text}>
                    <a href="/suppliers/Suppliers">CASIO STORE</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const suppliers = await axiosClient.get("/suppliers");
  const products = await axiosClient.get("/products");
  const categories = await axiosClient.get("/categories");
  const subCategories = await axiosClient.get(
    "/categories/number-products"
  );
  // const categories = await axiosClient.get("/categories/question/18");

  return {
    props: {
      suppliers,
      products,
      categories,
      subCategories,
    },

    // revalidate: 3600,
  };
}
