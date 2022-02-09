import React from "react";
import Footer from "./footer";
import Header from "./header";
import { useSelector } from "react-redux";

function Layout({ children }) {
  const modalVisibility = useSelector((state) => state.modal.value);
  return (
    <div className={modalVisibility ? "blur" : " "}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default Layout;
