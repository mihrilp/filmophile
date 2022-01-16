import React from "react";
import { Close } from "../public/assets";

function Popup({ videoUrl, handleClick }) {
  return (
    <div className="popup">
      <Close className="popup__closeBtn" onClick={handleClick} />
      <iframe
        className="popup_iframe"
        src={videoUrl}
        width="100%"
        height="100%"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
}

export default Popup;
