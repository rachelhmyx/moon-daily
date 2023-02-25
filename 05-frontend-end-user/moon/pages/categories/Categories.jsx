import React, { useState } from "react";
import Head from "next/head";
import styles from "./Categories.module.css";
import Image from "next/image";
import img6 from "./images/maygiatsale.png";
import img7 from "./images/dieuhoa.jpeg";
import img8 from "./images/may giat 1.jpeg";
import img9 from "./images/dientuvanphong.jpeg";
import img10 from "./images/tivi.jpeg";
import img11 from "./images/dientuoto.jpeg";
import img12 from "./images/amthanh.jpeg";
import img13 from "./images/tulanh.jpeg";
import img14 from "./images/bepgasale.png";
import img15 from "./images/mayxay.jpeg";
import img16 from "./images/bepga.jpeg";
import img17 from "./images/quat.jpeg";
import img18 from "./images/noichien.jpeg";
import img19 from "./images/lonuong.jpeg";
import img20 from "./images/lovisong.jpeg";
import img21 from "./images/mayruabat.jpeg";
import img22 from "./images/sonsale.jpg";
import img23 from "./images/son.png";
import img24 from "./images/kemchongnang.jpeg";
import img25 from "./images/kemlot.jpeg";
import img26 from "./images/suaruamat.jpeg";
import img27 from "./images/kemat.jpeg";
import img28 from "./images/kemay.jpeg";
import img29 from "./images/phanmat.jpeg";
import { axiosClient } from "../../libraries/axiosClient";
import { API_URL } from "../../constants/URLS";

export default function Categories({ categories, subCategories }) {
  const [tab, setTab] = useState(0);

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
              {categories.map((category) => {
                return (
                  <ul className={styles.container_list} key={category._id}>
                    <li className={styles.container_item}>{category.name}</li>
                  </ul>
                );
              })}
            </div>
            <div className={styles.container_right}>
              {subCategories.map((category, id) => {
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
                          {category.products[tab].name}
                        </a>
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
                                  onClick={() => {
                                    setTab(index + index);
                                  }}
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
              })}

              {/* <div className={styles.group_menu}>
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
              </div> */}
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
                    width={650}
                    height={295}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className={styles.block_right}>
                  <div className={styles.block_menu}>
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
                  </div>
                </div>
              </div>
              <div className={styles.block_content_bottom}>
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
              </div>
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
                    width={650}
                    height={295}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className={styles.block_right}>
                  <div className={styles.block_menu}>
                    <a href="/shop/ShopDefault">
                      <Image
                        src={img15}
                        alt=""
                        width={190}
                        height={230}
                        style={{ marginLeft: "22px", marginBottom: "20px" }}
                      />
                      <span className={styles.block_name}>Blender</span>
                    </a>
                  </div>
                  <div className={styles.block_menu}>
                    <a href="/shop/ShopDefault">
                      <Image
                        src={img16}
                        alt=""
                        width={190}
                        height={230}
                        style={{ marginLeft: "22px", marginBottom: "20px" }}
                      />
                      <span className={styles.block_name}>Gas Stove</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.block_content_bottom}>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img17}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Electric Fan</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img18}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Oil-free Fryer</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img19}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Griller</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img20}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Microwave oven</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img21}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span
                      className={styles.block_name}
                      style={{ paddingLeft: "80px" }}
                    >
                      Dishwasher
                    </span>
                  </a>
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
                    width={650}
                    height={295}
                    style={{ border: "1px solid #ccc" }}
                  />
                </div>
                <div className={styles.block_right}>
                  <div className={styles.block_menu}>
                    <a href="/shop/ShopDefault">
                      <Image
                        src={img23}
                        alt=""
                        width={190}
                        height={230}
                        style={{ marginLeft: "22px", marginBottom: "20px" }}
                      />
                      <span className={styles.block_name}>Lipstick</span>
                    </a>
                  </div>
                  <div className={styles.block_menu}>
                    <a href="/shop/ShopDefault">
                      <Image
                        src={img24}
                        alt=""
                        width={190}
                        height={230}
                        style={{ marginLeft: "22px", marginBottom: "20px" }}
                      />
                      <span className={styles.block_name}>Sunscreen</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.block_content_bottom}>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img25}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Cream Liner</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img26}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Cleanser</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img27}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Toner</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img28}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span className={styles.block_name}>Eyeliner</span>
                  </a>
                </div>
                <div className={styles.block_menu}>
                  <a href="/shop/ShopDefault">
                    <Image
                      src={img29}
                      alt=""
                      width={190}
                      height={230}
                      style={{ marginLeft: "22px", marginBottom: "20px" }}
                    />
                    <span
                      className={styles.block_name}
                      style={{ paddingLeft: "80px" }}
                    >
                      Eyeshadow
                    </span>
                  </a>
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
  const subCategories = await axiosClient.get("/categories/number-products");

  return {
    props: {
      categories,
      subCategories,
    },

    // revalidate: 3600,
  };
}
