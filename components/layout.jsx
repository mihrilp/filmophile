import React from "react";
import { Header, Footer } from "../components";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const modalVisibility = useSelector((state) => state.modalVisibility);
  return (
    <div className={modalVisibility ? "blur" : " "}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
