import React from "react";

interface InfoProps {
  title: string;
  arr: Array<{ name: string }>;
}

function Info({ title, arr }: InfoProps) {
  return (
    <div className="info">
      <h3 className="info__title">{title}</h3>
      {arr.map((item, index) => (
        <>
          <span> {index ? ", " : ""} &nbsp;</span>
          <p className="info__item" key={index}>
            {item.name}
          </p>
        </>
      ))}
    </div>
  );
}

export default Info;
