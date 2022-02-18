import "../styles/globals.scss";
import { Provider } from "react-redux";
import { Layout } from "../components";
import { store } from "../store";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      <div id="modal-root"></div>
    </Provider>
  );
}

export default MyApp;
