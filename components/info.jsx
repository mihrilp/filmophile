import React from "react";
import Image from "next/image";

function Info({ title, arr }) {
  return (
    <div>
      <h3>{title}</h3>
      {arr.map((item) => (
        <>
          {item.logo_path && (
            <Image
              src={`https://image.tmdb.org/t/p/original${item.logo_path}`}
              alt="movie image"
              width={100}
              height={100}
              layout="responsive"
            />
          )}
          <p key={item.id}>{item.name}</p>
        </>
      ))}
    </div>
  );
}

export default Info;
