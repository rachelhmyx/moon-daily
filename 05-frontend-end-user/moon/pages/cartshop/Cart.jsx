import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import styles from "./Cart.module.css";
import { DataContext } from "../../store/GlobalState";
import { API_URL } from "../../constants/URLS";
import numeral from "numeral";
import { decrease, increase } from "../../store/Actions";

export default function Cart() {
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;
  const [total, setTotal] = useState(0);

  //----------Tính tổng tất cả các sản phẩm được mua--------------
  useEffect(() => {
    const getTotal = () => {
      const result = cart.reduce((prev, item) => {
        return prev + item.total * item.quantity;
      }, 0);
      setTotal(result);
    };
    getTotal();
  }, [cart]);
  //-----------------------End-----------------------------------------

  return (
    <>
      <Head>
        <title>CART</title>
      </Head>
      <div className={styles.cart_container}>
        <div className={styles.cart_title}>
          <a className={styles.cart_link} href="/">
            HOME
          </a>
          <a className={styles.cart_link1} href="">
            SHOPPING CART
          </a>
        </div>
        <div className="row" style={{ padding: "100px 30px" }}>
          <div
            className="col-md-8 my-3 table-responsive"
            style={{ paddingRight: "20px" }}
          >
            <h1
              className={styles.cart_heading}
              style={{ marginBottom: "70px" }}
            >
              SHOPPING CART
            </h1>
            {/* Nếu ko có sản phẩm nào thì xét giỏ hàng như thế này */}
            {cart.length === 0 ? (
              <p className={styles.cart_alert}>Your cart is currently empty.</p>
            ) : (
              // Ngược lại có sản phẩm thì tạo bảng bên dưới
              <div>
                {/* ------------------------------------------------------------- */}
                {/* Trên PC: */}
                <table
                  className={`table ps-table--shopping-cart ps-table--responsive ${styles.table_PC}`}
                  style={{ height: "70%" }}
                >
                  <thead>
                    <tr>
                      <th className={styles.product_title}>PRODUCT</th>
                      <th className={styles.product_title}>PRICE</th>
                      <th className={styles.product_title}>STOCK</th>
                      <th className={styles.product_title}>QUANTITY</th>
                      <th className={styles.product_title}>TOTAL</th>
                      <th className={styles.product_title}>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => {
                      // console.log("item", item);
                      return (
                        <tr key={item._id}>
                          <td
                            style={{
                              width: "330px",
                              overflow: "hidden",
                              verticalAlign: "middle",
                            }}
                          >
                            <div className={styles.product_cart}>
                              <div className={styles.product_thumbnail}>
                                <img
                                  className="img-thumbnail"
                                  src={`${API_URL}/${item.images[0]}`}
                                  alt=""
                                  style={{ width: "120px", height: "120px" }}
                                />
                              </div>
                              <div className={styles.product_content}>
                                <a href={`/products/${item._id}`}>
                                  {item.name}
                                </a>
                              </div>
                            </div>
                          </td>
                          <td
                            data-label="price"
                            style={{
                              verticalAlign: "middle",
                              fontSize: "20px",
                            }}
                          >
                            {numeral(item.price).format("0,0$")}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              fontSize: "20px",
                            }}
                            className="mb-1 text-danger"
                          >
                            {item.stock > 0 ? (
                              <div>{item.stock}</div>
                            ) : (
                              <div>Out Stock</div>
                            )}
                          </td>
                          <td
                            data-label="quantity"
                            style={{
                              verticalAlign: "middle",
                              fontSize: "20px",
                            }}
                          >
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => dispatch(decrease(cart, item._id))}
                              // Nếu số lượng = 1 thì vô hiệu hóa nút -
                              disabled={item.quantity === 1 ? true : false}
                            >
                              -
                            </button>
                            <span style={{ padding: "0 15px", color: "blue" }}>
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => dispatch(increase(cart, item._id))}
                              // Nếu số lượng = tồn kho thì vô hiệu hóa nút +
                              disabled={
                                item.quantity === item.stock ? true : false
                              }
                            >
                              +
                            </button>
                          </td>
                          <td
                            data-label="total"
                            style={{
                              verticalAlign: "middle",
                              color: "#ed6a0b",
                              fontSize: "20px",
                            }}
                          >
                            {/* Tổng tiền theo số lượng của sản phẩm= tổng tiền 1sp( giá bán *(100- giảm giá)/100) * số lượng đặt hàng */}
                            {numeral(item.total * item.quantity).format("0,0$")}
                          </td>
                          <td
                            style={{
                              verticalAlign: "middle",
                              cursor: "pointer",
                              fontSize: "20px",
                              paddingLeft: "30px",
                            }}
                          >
                            <i
                              className="fa-solid fa-trash text-danger"
                              aria-hidden="true"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              // Khi bấm chuột vào icon xóa thì sẽ hiện ra model để xóa sản phẩm
                              onClick={() => {
                                dispatch({
                                  type: "ADD_MODAL",
                                  payload: {
                                    data: cart,
                                    id: item._id,
                                    type: "ADD_CART",
                                  },
                                });
                              }}
                            ></i>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* End  */}
                {/* ----------------------------------------------------------------------- */}
                {/* Trên Mobile: */}
                <div className={styles.mobile_cart}>
                  {cart.map((item) => {
                    return (
                      <div key={item._id}>
                        <div
                          style={{
                            width: "330px",
                            overflow: "hidden",
                            verticalAlign: "middle",
                          }}
                          className={styles.mobile_container}
                        >
                          <div className={styles.product_cart}>
                            <div className={styles.product_thumbnail}>
                              <img
                                className="img-thumbnail"
                                src={`${API_URL}/${item.images[0]}`}
                                alt=""
                                style={{ width: "120px", height: "120px" }}
                              />
                            </div>
                            <div className={styles.product_content}>
                              <a href={`/products/${item._id}`}>{item.name}</a>
                            </div>
                          </div>
                        </div>
                        <div
                          style={{
                            verticalAlign: "middle",
                            fontSize: "20px",
                          }}
                          className={styles.mobile_price}
                        >
                          Price:
                          <span>{numeral(item.price).format("0,0$")}</span>
                        </div>
                        <div
                          style={{
                            verticalAlign: "middle",
                            fontSize: "20px",
                          }}
                          className={`mb-1 text-danger ${styles.mobile_stock}`}
                        >
                          Stock:
                          <span>
                            {item.stock > 0 ? (
                              <div>{item.stock}</div>
                            ) : (
                              <div>Out Stock</div>
                            )}
                          </span>
                        </div>
                        <div
                          style={{
                            verticalAlign: "middle",
                            fontSize: "20px",
                          }}
                          className={styles.mobile_quantity}
                        >
                          Quantity:
                          <div>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => dispatch(decrease(cart, item._id))}
                              // Nếu số lượng = 1 thì vô hiệu hóa nút -
                              disabled={item.quantity === 1 ? true : false}
                            >
                              -
                            </button>
                            <span style={{ padding: "0 15px", color: "blue" }}>
                              {item.quantity}
                            </span>
                            <button
                              className="btn btn-outline-secondary"
                              onClick={() => dispatch(increase(cart, item._id))}
                              // Nếu số lượng = tồn kho thì vô hiệu hóa nút +
                              disabled={
                                item.quantity === item.stock ? true : false
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div
                          style={{
                            verticalAlign: "middle",
                            color: "#ed6a0b",
                            fontSize: "20px",
                          }}
                          className={styles.mobile_total}
                        >
                          {/* Tổng tiền theo số lượng của sản phẩm= tổng tiền 1sp( giá bán *(100- giảm giá)/100) * số lượng đặt hàng */}
                          Total:
                          <span>
                            {numeral(item.total * item.quantity).format("0,0$")}
                          </span>
                        </div>
                        <div
                          style={{
                            verticalAlign: "middle",
                            cursor: "pointer",
                            fontSize: "20px",
                            paddingLeft: "30px",
                          }}
                          className={styles.mobile_action}
                        >
                          Action:
                          <span>
                            <i
                              className="fa-solid fa-trash text-danger"
                              aria-hidden="true"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                              // Khi bấm chuột vào icon xóa thì sẽ hiện ra model để xóa sản phẩm
                              onClick={() => {
                                dispatch({
                                  type: "ADD_MODAL",
                                  payload: {
                                    data: cart,
                                    id: item._id,
                                    type: "ADD_CART",
                                  },
                                });
                              }}
                            ></i>
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* End  */}
                {/* ------------------------------------------------------------- */}
              </div>
            )}
          </div>
          <div
            className={`col-md-4 my-3 text-uppercase ${styles.mobile_shipping}`}
            style={{ paddingLeft: "90px" }}
          >
            <h1 className={styles.cart_heading} style={{ paddingTop: "32px" }}>
              Shipping
            </h1>
            <form>
              <label
                htmlFor="address"
                className={styles.label_name}
                style={{ marginTop: "36px" }}
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="form-control mb-2"
                style={{ outline: "none" }}
              />
              <label
                htmlFor="phoneNumber"
                className={styles.label_name}
                style={{ marginTop: "20px" }}
              >
                Phone Number
              </label>
              <input
                type="text"
                name="phoneNumber"
                id="phoneNumber"
                className="form-control mb-2"
                style={{ outline: "none" }}
              />
            </form>
            <h3 className={styles.form_total}>
              Total:
              <span className="text-info" style={{ paddingLeft: "20px" }}>
                {/* Tổng tiền tất cả sản phẩm được đặt hàng */}
                {numeral(total).format("0,0$")}
              </span>
            </h3>
            <a
              href="/login/Login"
              className={`btn btn-success my-2 ${styles.mobile_payment}`}
              style={{ marginLeft: "180px", padding: "12px" }}
            >
              Proceed with payment
            </a>
            <div className={styles.cart_shop}>
              <a href="/shop/ShopDefault">Back To Shop</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
