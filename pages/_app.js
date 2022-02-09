import "../styles/globals.scss";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "../reducers";
import Layout from "../components/layout";
import { store } from "../store";

function MyApp({ Component, pageProps }) {
  //const store = createStore(rootReducer);
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
