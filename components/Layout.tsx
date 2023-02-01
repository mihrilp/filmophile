import React from "react";
import { Header, Footer } from ".";
import { useAppSelector, useAppDispatch } from "../hooks";
import ModalVideo from "./Modal";

const Layout: React.FC = ({ children }) => {
  const modalVisibility = useAppSelector((state) => state.modal.visibility);
  const videoUrl = useAppSelector((state) => state.modal.videoUrl);
  const dispatch = useAppDispatch();

  return (
    <div className={modalVisibility ? "blur" : "layout"}>
      <Header />
      {children}
      <Footer />
      {modalVisibility && <ModalVideo videoUrl={videoUrl} />}
    </div>
  );
};

export default Layout;
