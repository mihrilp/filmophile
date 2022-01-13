import React from "react";
import Image from "next/image";

function Info({ title, arr }) {
  return (
    <div className="info">
      <h3>{title}</h3>
      {arr.map((item) =>
        item.logo_path ? (
          <div key={item.id} className="info__logo">
            <Image
              src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
              alt="movie image"
              layout="fill"
            />
          </div>
        ) : (
          <p key={item.id}>{item.name}</p>
        )
      )}
    </div>
  );
}

export default Info;
