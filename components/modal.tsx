import React from "react";
import { createPortal } from "react-dom";
import { Close } from "../public/assets";

interface ModalProps {
  videoUrl: string;
  handleClick: () => void;
}

function ModalVideo({ videoUrl, handleClick }: ModalProps) {
  return createPortal(
    <div className="modal">
      <Close className="modal__closeBtn" onClick={handleClick} />
      <iframe
        className="modal__iframe"
        src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1`}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}

export default ModalVideo;
