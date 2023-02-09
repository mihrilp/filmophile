import React, { useCallback } from "react";
import { createPortal } from "react-dom";
import { useAppDispatch } from "@/hooks";
import { Close } from "@/public/assets";
import { closeModal } from "@/store/modalSlice";

interface ModalProps {
  videoUrl: string | undefined;
}

function ModalVideo({ videoUrl }: ModalProps) {
  const dispatch = useAppDispatch();
  const handleClick = useCallback(() => dispatch(closeModal()), []);
  return createPortal(
    <div className="modal">
      <Close className="modal__closeBtn" onClick={handleClick} />
      <iframe
        className="modal__iframe"
        src={`https://www.youtube.com/embed/${videoUrl}?autoplay=1`}
        width="100%"
        height="100%"
        allow="autoplay"
        allowFullScreen
      ></iframe>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
}

export default ModalVideo;
