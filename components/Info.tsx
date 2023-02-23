import React from "react";

interface InfoProps {
  title: string;
  content: Array<{ name: string }> | number;
}

function Info({ title, content }: InfoProps) {
  return (
    <div className="info">
      <h4 className="info__title">{title}</h4>
      {typeof content === "number" ? (
        <p className="info__item">{content}</p>
      ) : (
        content.map((item, index) => (
          <>
            <span> {index ? ", " : ""} &nbsp;</span>
            <p className="info__item" key={index}>
              {item.name}
            </p>
          </>
        ))
      )}
    </div>
  );
}

export default Info;
