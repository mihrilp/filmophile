import React from "react";
import { Footer, Header } from ".";
import { useAppSelector } from "@/hooks";
import ModalVideo from "./Modal";

const Layout: React.FC = ({ children }) => {
  const modalVisibility = useAppSelector((state) => state.modal.visibility);
  const videoUrl = useAppSelector((state) => state.modal.videoUrl);

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
