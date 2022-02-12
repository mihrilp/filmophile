import React from "react";

function Info({ title, arr }) {
  return (
    <div className="info">
      <h3 className="info__title">{title}</h3>
      {arr.map((item, index) => (
        <p key={index}>{item.name}</p>
      ))}
    </div>
  );
}

export default Info;
