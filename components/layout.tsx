import React from "react";
import { Header, Footer } from ".";
import { useSelector } from "react-redux";

const Layout: React.FC = ({ children }) => {
  const modalVisibility = useSelector((state) => state.modalVisibility);
  return (
    <div className={modalVisibility ? "blur" : " "}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
