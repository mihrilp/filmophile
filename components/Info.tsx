import React from "react";

interface InfoProps {
  title: string;
  content: Array<{ name: string }> | number | string;
}

function Info({ title, content }: InfoProps) {
  return (
    <div className="info">
      <h4 className="info__title">{title}</h4>
      {Array.isArray(content) ? (
        content.map((item, index) => (
          <>
            <span> {index ? ", " : ""} &nbsp;</span>
            <p className="info__item" key={index}>
              {item.name}
            </p>
          </>
        ))
      ) : (
        <p className="info__item">{content}</p>
      )}
    </div>
  );
}

export default Info;
