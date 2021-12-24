import "../styles/globals.scss";
import "../styles/pages/home.scss";
import "../styles/pages/detail.scss";
import "../styles/pages/about.scss";
import "../styles/components/container.scss";
import "../styles/components/header.scss";
import "../styles/components/footer.scss";
import "../styles/components/card.scss";
import Container from "../components/container";
import Header from "../components/header";
import Footer from "../components/footer";

function MyApp({ Component, pageProps }) {
  return (
    <Container>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Container>
  );
}

export default MyApp;
