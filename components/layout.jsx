import React from "react";
import Header from "./header";
import Footer from "./footer";

function Layout({ children }) {
  return (
    <div className="layout">
      <div className="layout__content">
        <Header />
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
