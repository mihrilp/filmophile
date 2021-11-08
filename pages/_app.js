import "../styles/globals.scss";
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
