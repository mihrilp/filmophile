import React from "react";
import Image from "next/image";

function Info({ title, arr }) {
  return (
    <div className="info">
      <h3 className="info__title">{title}</h3>
      {arr.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
}

export default Info;
