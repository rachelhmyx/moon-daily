import { createContext, useEffect, useReducer } from "react";
import { reducers } from "./Reducers";
export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: {},
    favourite: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, favourite } = state;

  useEffect(() => {
    const next_cart = JSON.parse(localStorage.getItem("next_cart"));

    if (next_cart) dispatch({ type: "ADD.CART", payload: next_cart });
  }, []);

  useEffect(() => {
    localStorage.setItem("next_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const next_favourite = JSON.parse(localStorage.getItem("next_favourite"));

    if (next_favourite)
      dispatch({ type: "ADD.FAVOURITE", payload: next_favourite });
  }, []);

  useEffect(() => {
    localStorage.setItem("next_favourite", JSON.stringify(favourite));
  }, [favourite]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
