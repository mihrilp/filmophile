import React from "react";
import { Header, Footer } from ".";
//import { useSelector } from "react-redux";
import { useAppSelector } from "../hooks";

const Layout: React.FC = ({ children }) => {
  const modalVisibility = useAppSelector((state) => state.modalVisibility);
  return (
    <div className={modalVisibility ? "blur" : "layout"}>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
