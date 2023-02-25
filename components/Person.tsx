import React from "react";
import Image from "next/image";

interface PersonProps {
  name: string;
  imgUrl: string;
  character?: string;
  job?: string;
}

function Person({ name, imgUrl, job, character }: PersonProps) {
  return (
    <div className="person">
      <div className="person__imgContainer">
        <Image
          className="person__imgContainer__poster"
          src={
            imgUrl
              ? `https://image.tmdb.org/t/p/w500/${imgUrl}`
              : "/no-image-placeholder.png"
          }
          alt="movie image"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="person__info">
        <p className="person__info__name">{name}</p>
        {character && <p className="person__info__character">{character}</p>}
        {job && <p className="person__info__job">{job}</p>}
      </div>
    </div>
  );
}

export default Person;
