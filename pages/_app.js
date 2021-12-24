import "../styles/globals.scss";
import "../styles/pages/home.scss";
import "../styles/pages/detail.scss";
import "../styles/pages/about.scss";
import "../styles/components/layout.scss";
import "../styles/components/header.scss";
import "../styles/components/footer.scss";
import "../styles/components/card.scss";
import Layout from "../components/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
