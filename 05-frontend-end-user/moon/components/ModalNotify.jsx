import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import Toast from "./Toast";

export default function ModalNotify() {
  const { state, dispatch } = useContext(DataContext);
  const { notify } = state;
  return (
    <>
      {notify.error && (
        <Toast
          msg={{ msg: notify.error, title: "Error" }}
          handleShow={() => dispatch({ type: "NOTIFY", payload: {} })}
          bgColor="bg-danger"
        />
      )}
      {notify.success && <Toast />}
    </>
  );
}