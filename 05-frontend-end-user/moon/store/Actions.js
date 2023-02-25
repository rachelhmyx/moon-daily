export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_MODAL: "ADD_MODAL",
  ADD_FAVOURITE: "ADD_FAVOURITE",
  // ADD_MODALFAVOURITE: "ADD_MODALFAVOURITE",
};

//-------------Thêm sản phẩm vào giỏ hàng-------------
export const addToCart = (product, cart) => {
  if (product.stock === 0)
    return {
      type: "NOTIFY",
      payload: { error: "This product is out of stock." },
    };

  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "The product has been added to cart." },
    };

  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};
//-------------End--------------------------------------

//-----------Làm nút giảm để mua sản phẩm----------------
export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });
  return { type: "ADD_CART", payload: newData };
};
//----------------End-------------------------

//---------------Làm nút tăng để mua sản phẩm-----------
export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return { type: "ADD_CART", payload: newData };
};

//--------------End-------------------------------------

//--------------Xóa sản phẩm khỏi giỏ hàng-----------------
export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id);
  return { type, payload: newData };
};
//---------------End---------------------------------------

export const addToFavourite = (product, favourite) => {
  const check = favourite.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return {
      type: "NOTIFY",
      payload: { error: "The product has been added to favourite." },
    };

  return {
    type: "ADD_FAVOURITE",
    payload: [...favourite, { ...product, quantity: 1 }],
  };
};
