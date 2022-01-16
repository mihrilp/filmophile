import { useState } from "react";
import "../styles/globals.scss";
import Footer from "../components/footer";
import Header from "../components/header";
import { ModalContext } from "../ModalContext";

function MyApp({ Component, pageProps }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ modalIsOpen, setModalIsOpen }}>
      <div className={modalIsOpen ? "blur" : " "}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
      <div id="modal-root"></div>
    </ModalContext.Provider>
  );
}

export default MyApp;
