import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
// import "@/styles/globals.css";
import "../styles/globals.css";
import numeral from "numeral";
import "numeral/locales/vi";
import { useEffect } from "react";
import { DataProvider } from "../store/GlobalState";

numeral.locale("vi");

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <>
      <DataProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DataProvider>
    </>
  );
}
