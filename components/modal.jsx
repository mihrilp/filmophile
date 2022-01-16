import React from "react";
import { createPortal } from "react-dom";
import { Close } from "../public/assets";

function ModalVideo({ videoUrl, handleClick }) {
  return createPortal(
    <div className="modal">
      <Close className="modal__closeBtn" onClick={handleClick} />
      <iframe
        className="modal__iframe"
        src={videoUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>,
    document.getElementById("modal-root")
  );
}

export default ModalVideo;
