import Layout from "../components/Layout";
import "bootstrap/dist/css/bootstrap.min.css";
import "antd/dist/reset.css";
import "../styles/globals.css";
import numeral from "numeral";
import "numeral/locales/vi";
import { useEffect } from "react";
import { DataProvider } from "../store/GlobalState";
import { SessionProvider } from "next-auth/react";

numeral.locale("vi");

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  console.log("session", session, pageProps);
  return (
    <>
      <SessionProvider session={session}>
        <DataProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </DataProvider>
      </SessionProvider>
    </>
  );
}
