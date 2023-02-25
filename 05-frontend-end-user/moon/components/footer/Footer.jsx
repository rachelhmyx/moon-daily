import React from "react";
import styles from "./Footer.module.css";
import img from "./images/mastercard.png";
import img1 from "./images/momo.png";
import img2 from "./images/paypal.jpeg";
import img3 from "./images/skrill.jpeg";
import img4 from "./images/visa.png";
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.footer_container}>
          <div className={styles.footer_newsletter}>
            <form className={styles.footer_form} action="action" method="post">
              <div
                className="row"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div className="col-sm-5 ">
                  <div className={styles.form_left}>
                    <h1 className={styles.heading}>Newsletter</h1>
                    <span className={styles.desc}>
                      Subcribe to get information about products and coupons
                    </span>
                  </div>
                </div>
                <div className="col-sm-7 ">
                  <div className={styles.form_right}>
                    <input
                      className={styles.input}
                      type="text"
                      placeholder="Email Address"
                    />
                    <button className={styles.btn}>Subscribe</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className={styles.footer_information}>
            <div className={styles.footer_left}>
              <h3 className={styles.footer_title}>Contact us</h3>
              <div className={styles.footer_content}>
                <span>Call us 24/7</span>
                <h3 className={styles.number}>1800 96 96 96</h3>
                <span>
                  24 Hoan Kiem, Ha Noi, Viet Nam
                  <p className={styles.email}>hanoi@gmail.com</p>
                </span>
                <ul className={styles.list_icon}>
                  <li className={styles.icon_item}>
                    <a href="#">
                      <i
                        className="fa-brands fa-facebook-f"
                        style={{ color: "blue" }}
                      ></i>
                    </a>
                  </li>
                  <li className={styles.icon_item}>
                    <a href="#">
                      <i
                        className="fa-brands fa-twitter"
                        style={{ color: "#4ec0ec" }}
                      ></i>
                    </a>
                  </li>
                  <li className={styles.icon_item}>
                    <a href="#">
                      <i
                        className="fa-brands fa-google-plus-g"
                        style={{ color: "red" }}
                      ></i>
                    </a>
                  </li>
                  <li className={styles.icon_item}>
                    <a href="#">
                      <i
                        className="fa-brands fa-instagram"
                        style={{ color: "#f358d9" }}
                      ></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className={styles.footer_center1}>
              <h3 className={styles.footer_title}>Quick links</h3>
              <ul className={styles.footer_list}>
                <li className={styles.footer_item}>
                  <a href="">Policy</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Term & Condition</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Shipping</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Return</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">FAQs</a>
                </li>
              </ul>
            </div>
            <div className={styles.footer_center2}>
              <h3 className={styles.footer_title}>Company</h3>
              <ul className={styles.footer_list}>
                <li className={styles.footer_item}>
                  <a href="">About Us</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Affilate</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Career</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
            <div className={styles.footer_right}>
              <h3 className={styles.footer_title}>Bussiness</h3>
              <ul className={styles.footer_list}>
                <li className={styles.footer_item}>
                  <a href="">Our Press</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Checkout</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">My account</a>
                </li>
                <li className={styles.footer_item}>
                  <a href="">Shop</a>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.footer_links}>
            <div className={styles.links_menu}>
              <strong>Smart Phone & Accessory:</strong>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Desktop PC
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Laptop
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Tablet
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Phone
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Headphone
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Phone Charger
              </a>
              <a href="/shop/ShopDefault">Wireless Speaker</a>
            </div>
            <div className={styles.links_menu}>
              <strong>Electronic equipment:</strong>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Air Conditioners
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Washing Machines
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Office Electronics
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                TV Televisions
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Car Electronics
              </a>
              <a href="/shop/ShopDefault">Audios & Theaters</a>
            </div>
            <div className={styles.links_menu}>
              <strong>Household electrical appliances:</strong>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Blender
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Gas Stove
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Electric Fan
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Oil-free Fryer
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Griller
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Microwave oven
              </a>
              <a href="/shop/ShopDefault">Super Tepid</a>
            </div>
            <div className={styles.links_menu}>
              <strong>Mom & Babies:</strong>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Newborn Toys
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Diaper Towel
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Baby Socks
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Beanie
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Wet Towel
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Washing Basin
              </a>
              <a href="/shop/ShopDefault">Milk Bottle</a>
            </div>
            <div className={styles.links_menu}>
              <strong>Beauty Products:</strong>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Lipstick
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Sunscreen
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Cream Liner
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Cleanser
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Toner
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Eyeliner
              </a>
              <a href="/shop/ShopDefault">Eyebrow Liner</a>
            </div>
            <div className={styles.links_menu}>
              <strong>Healthcare Products:</strong>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Face Lift Machine
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Massage Machine
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Shower Gel
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Exfoliating Pad
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Weight Gain Milk
              </a>
              <a className={styles.links_item} href="/shop/ShopDefault">
                Cordyceps
              </a>
              <a href="/shop/ShopDefault">Functional Foods</a>
            </div>
          </div>
          <div className={styles.footer_copyright}>
            <div style={{ color: "green" }}>
              2023: Moon Daily.All Rights Reserved
            </div>
            <div className={styles.footer_menu}>
              <span style={{ color: "green" }}>We Using Safe Payment For:</span>
              <a href="#">
                <Image
                  src={img}
                  alt=""
                  width={40}
                  height={25}
                  className={styles.footer_img}
                />
                <Image
                  src={img1}
                  alt=""
                  width={40}
                  height={25}
                  className={styles.footer_img}
                />
                <Image
                  src={img2}
                  alt=""
                  width={40}
                  height={25}
                  className={styles.footer_img}
                />
                <Image
                  src={img3}
                  alt=""
                  width={40}
                  height={25}
                  className={styles.footer_img}
                />
                <Image
                  src={img4}
                  alt=""
                  width={40}
                  height={25}
                  className={styles.footer_img}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
