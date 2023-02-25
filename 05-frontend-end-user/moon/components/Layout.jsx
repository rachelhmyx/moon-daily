import React from "react";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import Modal from "./Modal";
import ModalNotify from "./ModalNotify";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Modal />
      <ModalNotify />
      <main>{children}</main>
      <Footer />
    </>
  );
}
