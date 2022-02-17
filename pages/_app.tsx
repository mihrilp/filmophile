import "../styles/globals.scss";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers";
import { Layout } from "../components";
import { store } from "../store";
import thunk from "redux-thunk";
import type { AppProps } from "next/app";

//const store = createStore(rootReducer, applyMiddleware(thunk));

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
