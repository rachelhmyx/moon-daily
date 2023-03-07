import React, { useState } from "react";
import Head from "next/head";
import styles from "./Categories.module.css";
import Image from "next/image";
import img from "./images/laptop.jpeg";
import img1 from "./images/dieuhoa1.jpeg";
import img2 from "./images/lonuong.jpeg";
import img3 from "./images/baby.jpeg";
import img4 from "./images/son3.jpeg";
import img5 from "./images/tuixach1.jpeg";
import img6 from "./images/maygiatsale.png";
import img7 from "./images/dieuhoa.jpeg";
import img8 from "./images/may giat 1.jpeg";
import img9 from "./images/dientuvanphong.jpeg";
import img10 from "./images/tivi.jpeg";
import img11 from "./images/dientuoto.jpeg";
import img12 from "./images/amthanh.jpeg";
import img13 from "./images/tulanh.jpeg";
import img14 from "./images/bepgasale.png";
import img22 from "./images/sonsale.jpg";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";

export default function Categories({ categories, subCategories }) {
  return (
    <>
      <Head>
        <title>CATEGORIES</title>
      </Head>
      <div className={styles.main}>
        <div className={styles.header}>
          <div className={styles.header_title}>
            <a className={styles.header_link} href="/">
              HOME
            </a>
            <a className={styles.header_link1} href="">
              SHOP CATEGORIES
            </a>
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.container_top}>
            <div className={styles.container_left}>
              <h2 className={styles.container_heading}>CATEGORIES</h2>
              <ul className={styles.container_list}>
                <li className={styles.container_item}>
                  <a href="/shop/ShopDefault">Smart Phone & Accessory</a>
                </li>
                <li className={styles.container_item}>
                  <a href="/shop/ShopDefault">Electronic Equipment</a>
                </li>
                <li className={styles.container_item}>
                  <a href="/shop/ShopDefault">
                    Household Electrical Appliances
                  </a>
                </li>
                <li className={styles.container_item}>
                  <a href="/shop/ShopDefault">Mom & Babies</a>
                </li>
                <li className={styles.container_item}>
                  <a href="/shop/ShopDefault">Beauty Products</a>
                </li>
                <li className={styles.container_item}>
                  <a href="/shop/ShopDefault">Fashion And Accessory</a>
                </li>
              </ul>
              {/* {categories.map((category) => {
                return (
                  <ul className={styles.container_list} key={category._id}>
                    <li className={styles.container_item}>{category.name}</li>
                  </ul>
                );
              })} */}
            </div>
            <div className={styles.container_right}>
              {/* {subCategories.map((category, id) => {
                console.log("category", category);
                console.log("id", id);
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
                      <div className={styles.group_list}>
                        <a
                          className={styles.links_item1}
                          href="/shop/ShopDefault"
                        >
                         {/* {category.products[tab].name} */}
              {/* </a>
                        <ul className={styles.group_list}>
                          {category.products.map((product, index) => {
                            console.log("index", index);
                            return (
                              <li
                                className={styles.group_item}
                                key={product._id}
                              >
                                <a
                                  className={styles.links_item}
                                  href="/shop/ShopDefault"
                                  key={index}
                                >
                                  {product.name}
                                </a>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })} */}
              <div className={styles.group_menu}>
                <div className={styles.group_left}>
                  <Image
                    src={img}
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
                    src={img1}
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
                    src={img2}
                    alt=""
                    width={100}
                    height={120}
                    style={{ padding: "20px 0 0 5px" }}
                  />
                </div>
                <div className={styles.group_right}>
                  <h3 className={styles.group_heading}>
                    Household electrical appliances
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
                    src={img3}
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
                    src={img4}
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
                    src={img5}
                    alt=""
                    width={100}
                    height={120}
                    style={{ padding: "20px 0 0 5px" }}
                  />
                </div>
                <div className={styles.group_right}>
                  <h3 className={styles.group_heading}>
                    Fashion and Accessory
                  </h3>
                  <ul className={styles.group_list}>
                    <li className={styles.group_item}>
                      <a className={styles.links_item} href="/shop/ShopDefault">
                        Men's and women's pants
                      </a>
                    </li>
                    <li className={styles.group_item}>
                      <a className={styles.links_item} href="/shop/ShopDefault">
                        Branded handbags
                      </a>
                    </li>
                    <li className={styles.group_item}>
                      <a className={styles.links_item} href="/shop/ShopDefault">
                        Metal Strap Women's Watch
                      </a>
                    </li>
                    <li className={styles.group_item}>
                      <a className={styles.links_item} href="/shop/ShopDefault">
                        Diamond Necklace For Women
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.container_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_heading}>Electronic Equipment</h3>
              <ul className={styles.block_list}>
                <li className={styles.block_item}>
                  <a className={styles.block_link} href="/shop/ShopDefault">
                    New Arrivals
                  </a>
                </li>
                <li className={styles.block_item}>
                  <a className={styles.block_link} href="/shop/ShopDefault">
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.block_content}>
              <div className={styles.block_content_top}>
                <div className={styles.block_banner}>
                  <Image
                    src={img6}
                    alt=""
                    width={1200}
                    height={330}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className={styles.block_bottom}>
                  {subCategories.map((category, id) => {
                    if (id === 1) {
                      return (
                        <div className={styles.block_content_bottom}>
                          {category.products.map((c) => {
                            return (
                              <div className={styles.block_menu}>
                                <a href="/shop/ShopDefault">
                                  <img
                                    src={`${API_URL}${c.imageUrl}`}
                                    alt=""
                                    width={190}
                                    height={230}
                                    style={{
                                      marginLeft: "22px",
                                      marginBottom: "20px",
                                    }}
                                  />
                                  <span className={styles.block_name}>
                                    {c.name}
                                  </span>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  })}
                  {/* <div className={styles.block_menu}>
                    <a href="/shop/ShopDefault">
                      <Image
                        src={img7}
                        alt=""
                        width={190}
                        height={230}
                        style={{ marginLeft: "22px", marginBottom: "20px" }}
                      />
                      <span className={styles.block_name}>
                        Air Conditioners
                      </span>
                    </a>
                  </div>
                  <div className={styles.block_menu}>
                    <a href="/shop/ShopDefault">
                      <Image
                        src={img8}
                        alt=""
                        width={190}
                        height={230}
                        style={{ marginLeft: "22px", marginBottom: "20px" }}
                      />
                      <span className={styles.block_name}>
                        Washing Machines
                      </span>
                    </a>
                  </div> */}
                </div>
              </div>
              {/* <div className={styles.block_content_bottom}>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img9}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>
                      Office Electronics
                    </span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img10}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}> TV Televisions</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img11}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}> Car Electronics</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img12}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Audios & Theaters</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img13}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span
                      className={styles.block_name}
                      style={{ paddingLeft: "80px" }}
                    >
                      Fridge
                    </span>
                  </a>
                </div>
              </div> */}
            </div>
          </div>
          <div className={styles.container_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_heading}>
                Household electrical appliances
              </h3>
              <ul className={styles.block_list}>
                <li className={styles.block_item}>
                  <a className={styles.block_link} href="/shop/ShopDefault">
                    New Arrivals
                  </a>
                </li>
                <li className={styles.block_item}>
                  <a className={styles.block_link} href="/shop/ShopDefault">
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.block_content}>
              <div className={styles.block_content_top}>
                <div className={styles.block_banner}>
                  <Image
                    src={img14}
                    alt=""
                    width={1200}
                    height={330}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className={styles.block_bottom}>
                  {subCategories.map((category, id) => {
                    // if (id === 2) {
                      if (id === 4) {
                      return (
                        <div className={styles.block_content_bottom}>
                          {category.products.map((c) => {
                            return (
                              <div className={styles.block_menu}>
                                <a href="/shop/ShopDefault">
                                  <img
                                    src={`${API_URL}${c.imageUrl}`}
                                    alt=""
                                    width={190}
                                    height={230}
                                    style={{
                                      marginLeft: "22px",
                                      marginBottom: "20px",
                                    }}
                                  />
                                  <span className={styles.block_name}>
                                    {c.name}
                                  </span>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.container_block}>
            <div className={styles.block_header}>
              <h3 className={styles.block_heading}>Beauty Products</h3>
              <ul className={styles.block_list}>
                <li className={styles.block_item}>
                  <a className={styles.block_link} href="/shop/ShopDefault">
                    New Arrivals
                  </a>
                </li>
                <li className={styles.block_item}>
                  <a className={styles.block_link} href="/shop/ShopDefault">
                    Best Sellers
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.block_content}>
              <div className={styles.block_content_top}>
                <div className={styles.block_banner}>
                  <Image
                    src={img22}
                    alt=""
                    width={1200}
                    height={330}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className={styles.block_bottom}>
                  {subCategories.map((category, id) => {
                    // if (id === 4) {
                      if (id === 8) {
                      return (
                        <div className={styles.block_content_bottom}>
                          {category.products.map((c) => {
                            return (
                              <div className={styles.block_menu}>
                                <a href="/shop/ShopDefault">
                                  <img
                                    src={`${API_URL}${c.imageUrl}`}
                                    alt=""
                                    width={190}
                                    height={230}
                                    style={{
                                      marginLeft: "22px",
                                      marginBottom: "20px",
                                    }}
                                  />
                                  <span className={styles.block_name}>
                                    {c.name}
                                  </span>
                                </a>
                              </div>
                            );
                          })}
                        </div>
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getStaticProps(context) {
  const categories = await axiosClient.get("/categories");
  // const subCategories = await axiosClient.get("/categories/questions/18");
  const subCategories = await axiosClient.get(
    "/categories/number-products"
  );

  return {
    props: {
      categories,
      subCategories,
    },

    // revalidate: 3600,
  };
}
