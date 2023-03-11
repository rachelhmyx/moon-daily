import React, { useContext } from "react";
import styles from "./Navbar.module.css";
import img from "./images/shopping-cart.png";
import Image from "next/image";
import Link from "next/link";
import { DataContext } from "../../store/GlobalState";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  //-----------Set giá trị mặc định cho giỏ hàng------------
  const { data, status } = useSession();
  const { state } = useContext(DataContext);
  const { cart } = state;
  const { favourite } = state;

  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.header}>
          <div className={styles.header_top}>
            <div className={styles.header_container}>
              {/* Trên PC */}
              <div className={styles.header_left_PC}>
                <Image
                  src={img}
                  alt=""
                  width={50}
                  height={50}
                  className={styles.image}
                />
                <h1 className={styles.heading}>
                  <a href="/">MOON</a>
                </h1>
              </div>
              <div className={styles.header_center_PC}>
                <div className={styles.menu_icon}>
                  <a
                    href="/searchproducts/SearchProducts"
                    className={styles.header_name}
                  >
                    Search Products
                  </a>
                  <i
                    className="fa-solid fa-chevron-down"
                    style={{
                      fontSize: "26px",
                      marginLeft: "auto",
                      marginRight: "23px",
                      color: "#726f6f",
                    }}
                  ></i>
                </div>
                <ul className={styles.header_sub}>
                  <li className={styles.header_sub1}>
                    <a href="/categories/SmartPhoneAccessory">
                      Smart Phone & Accessory
                    </a>
                  </li>
                  <li className={styles.header_sub1}>
                    <a href="/categories/ElectronicEquipment">
                      Electronic Equipment
                    </a>
                  </li>
                  <li className={styles.header_sub1}>
                    <a href="/categories/HouseholdElectricalAppliances">
                      Household Electrical Appliances
                    </a>
                  </li>
                  <li className={styles.header_sub1}>
                    <a href="/categories/MomBabies">Mom & Babies</a>
                  </li>
                  <li className={styles.header_sub1}>
                    <a href="/categories/BeautyProducts">Beauty Products</a>
                  </li>
                  <li className={styles.header_sub1}>
                    <a href="/categories/FashionAccessory">
                      Fashion And Accessory
                    </a>
                  </li>
                </ul>
              </div>
              <div className={styles.header_right_PC}>
                <div className={styles.header_actions}>
                  <Link legacyBehavior href="/whishlist/Whishlist">
                    <a className={styles.header_extra}>
                      <i
                        className="fa-regular fa-heart"
                        style={{ fontSize: "33px", color: "#db6451" }}
                      ></i>
                      <span className={styles.header_item}>
                        <i className={styles.header_number}>
                          {/* Số trên mục yêu thích phụ thuộc vào độ dài của sản phẩm */}
                          {favourite.length}
                        </i>
                      </span>
                    </a>
                  </Link>
                  <div className={styles.header_extra}>
                    <i
                      className="fa-solid fa-cart-plus"
                      style={{ fontSize: "33px", color: "#db6451" }}
                    ></i>
                    <span className={styles.header_item}>
                      <i className={styles.header_number}>{cart.length}</i>
                      {/* Số trên giỏ hàng phụ thuộc vào độ dài của sản phẩm */}
                    </span>
                    <div>
                      {cart.length === 0 ? (
                        <div className={styles.desc}>No products in cart</div>
                      ) : (
                        <Link className={styles.desc} href="/cartshop/Cart">
                          View cart
                        </Link>
                      )}
                    </div>
                  </div>
                  <div className={styles.header_user}>
                    <div className={styles.user_left}>
                      <i
                        className="fa-regular fa-user"
                        style={{ fontSize: "33px", color: "#db6451" }}
                      ></i>
                    </div>
                    <div className={styles.user_right}>
                      {data && data.user ? (
                        <>
                          {/* <button onClick={() => signOut()}>LOGOUT</button> */}
                          <Link href="" onClick={() => signOut()}>
                            LOGOUT
                          </Link>
                          <span>{data.user.username}</span>
                        </>
                      ) : (
                        <>
                          <Link href="/login/Login">LOGIN</Link>
                          <Link href="/register/Register">REGISTER</Link>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {/* End */}
              {/* Trên Mobile */}
              <div className={styles.mobile_header}>
                <div className={styles.mobile_top}>
                  <div className={styles.header_left}>
                    <Image
                      src={img}
                      alt=""
                      width={50}
                      height={50}
                      className={styles.image}
                    />
                    <h1 className={styles.heading}>
                      <a href="/">MOON</a>
                    </h1>
                  </div>
                  <div className={styles.header_right}>
                    <div className={styles.header_actions}>
                      <Link legacyBehavior href="/whishlist/Whishlist">
                        <a className={styles.header_extra}>
                          <i
                            className="fa-regular fa-heart"
                            style={{ fontSize: "29px", color: "#db6451" }}
                          ></i>
                          <span className={styles.header_item}>
                            <i className={styles.header_number}>
                              {/* Số trên mục yêu thích phụ thuộc vào độ dài của sản phẩm */}
                              {favourite.length}
                            </i>
                          </span>
                        </a>
                      </Link>
                      <div className={styles.header_extra}>
                        <i
                          className="fa-solid fa-cart-plus"
                          style={{ fontSize: "29px", color: "#db6451" }}
                        ></i>
                        <span className={styles.header_item}>
                          <i className={styles.header_number}>{cart.length}</i>
                          {/* Số trên giỏ hàng phụ thuộc vào độ dài của sản phẩm */}
                        </span>
                        <div>
                          {cart.length === 0 ? (
                            <div className={styles.desc}>
                              No products in cart
                            </div>
                          ) : (
                            <Link className={styles.desc} href="/cartshop/Cart">
                              View cart
                            </Link>
                          )}
                        </div>
                      </div>
                      <div className={styles.header_user}>
                        <div className={styles.user_left}>
                          <i
                            className="fa-regular fa-user"
                            style={{ fontSize: "33px", color: "#db6451" }}
                          ></i>
                        </div>
                        <div className={styles.user_right}>
                          <Link href="/login/Login">LOGIN</Link>
                          <Link href="/register/Register">REGISTER</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.header_center}>
                  <div className={styles.menu_icon}>
                    <a
                      href="/searchproducts/SearchProducts"
                      className={styles.header_name}
                    >
                      Search Products
                    </a>
                    <i
                      className="fa-solid fa-chevron-down"
                      style={{
                        fontSize: "26px",
                        marginLeft: "auto",
                        marginRight: "23px",
                        color: "#726f6f",
                      }}
                    ></i>
                  </div>
                  <ul className={styles.header_sub}>
                    <li className={styles.header_sub1}>
                      <a href="/categories/SmartPhoneAccessory">
                        Smart Phone & Accessory
                      </a>
                    </li>
                    <li className={styles.header_sub1}>
                      <a href="/categories/ElectronicEquipment">
                        Electronic Equipment
                      </a>
                    </li>
                    <li className={styles.header_sub1}>
                      <a href="/categories/HouseholdElectricalAppliances">
                        Household Electrical Appliances
                      </a>
                    </li>
                    <li className={styles.header_sub1}>
                      <a href="/categories/MomBabies">Mom & Babies</a>
                    </li>
                    <li className={styles.header_sub1}>
                      <a href="/categories/BeautyProducts">Beauty Products</a>
                    </li>
                    <li className={styles.header_sub1}>
                      <a href="/categories/FashionAccessory">
                        Fashion And Accessory
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* End */}
            </div>
          </div>
          <nav className={styles.nav}>
            {/* Trên PC */}
            <div className={styles.nav_container}>
              <div className={styles.nav_left_PC}>
                <ul className={styles.menu}>
                  <li className={styles.menu_item}>
                    <a className={styles.menu_heading1} href="/">
                      HOME
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                  </li>
                  <li className={styles.menu_item}>
                    <a
                      className={styles.menu_heading}
                      href="/categories/Categories"
                    >
                      CATEGORIES
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                    <ul className={styles.sub_menu}>
                      <li className={styles.sub_menu1}>
                        <a href="/">Smart Phone & Accessory</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/"> Electronic Equipment</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Laptop</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Watch</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Household Electrical Appliances</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Sport & Travel</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Mom & Babies</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Home & Lifestyle</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Beauty Products</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        Healthcare Products
                        <a href="/"></a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Books</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Balo & Bags</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/"> Pets Care Products</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/"> Accessories & Jewelry</a>
                      </li>
                    </ul>
                  </li>
                  <li className={styles.menu_item}>
                    <a
                      className={styles.menu_heading}
                      href="/products/Products"
                    >
                      PRODUCTS
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                    <ul className={styles.sub_menu}>
                      <li className={styles.sub_menu1}>
                        <a href="/">Apple Iphone 14 Pro Max 128GB</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        Điện thoại Samsung Galaxy Z Flip4 5G 128GB
                        <a href="/"></a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">
                          Tai nghe Samsung Galaxy Buds2 Pro Bluetooth
                        </a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Loa Bluetooth Di Động LG Xboomgo PL7</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">
                          Máy giặt lồng ngang LG Inverter 9kg-FM1209S6W
                        </a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Google Tivi Sony 4K 65 inch KD-65X75K</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        Nồi chiên không dầu Philips HD9270/90-6.2L
                        <a href="/"></a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Bếp nướng điện Nagakawa NAG3104</a>
                      </li>
                    </ul>
                  </li>
                  <li className={styles.menu_item}>
                    <a
                      className={styles.menu_heading}
                      href="/suppliers/Suppliers"
                    >
                      SUPPLIERS
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                    <ul className={styles.sub_menu}>
                      <li className={styles.sub_menu1}>
                        <a href="/">Samsung</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/"> Apple</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Gucci</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Louis Vuitton</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        Sharp
                        <a href="/"></a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Mac</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Panasonic</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">LG</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        <a href="/">Oppo</a>
                      </li>
                      <li className={styles.sub_menu1}>
                        Dior
                        <a href="/"></a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
              <div className={styles.nav_right}>
                <a
                  href="/ordertracking/OrderTracking"
                  className={styles.nav_order}
                >
                  Tract your order
                </a>
                <div className={styles.nav_language}>
                  <i
                    className="fa-solid fa-globe"
                    style={{ fontSize: "20px" }}
                  ></i>
                  <select className={styles.nav_select}>
                    <option value="English">English</option>
                    <option value="Tiếng Việt">Tiếng Việt</option>
                  </select>
                </div>
              </div>
            </div>
            {/* End */}
            {/* Trên Mobile */}
            <div className={styles.mobile_nav}>
              <div className={styles.nav_left}>
                <ul className={styles.menu}>
                  <li className={styles.menu_item}>
                    <a
                      className={styles.menu_heading}
                      href="/categories/Categories"
                    >
                      CATEGORIES
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                  </li>
                  <li className={styles.menu_item}>
                    <a
                      className={styles.menu_heading}
                      href="/products/Products"
                    >
                      PRODUCTS
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                  </li>
                  <li className={styles.menu_item}>
                    <a
                      className={styles.menu_heading}
                      href="/suppliers/Suppliers"
                    >
                      SUPPLIERS
                      <i
                        className="fa-solid fa-chevron-down"
                        style={{ fontSize: "15px", paddingLeft: "10px" }}
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            {/* End */}
          </nav>
        </div>
      </div>
    </>
  );
}
