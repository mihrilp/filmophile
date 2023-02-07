import { useEffect, useState } from "react";
import { fetchMovieDetail } from "../api/fetchMovies";
import { Facebook, Instagram, Twitter } from "../public/assets";

function Footer({ movieId }: { movieId: string }) {
  const [quote, setQuote] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const movie = await fetchMovieDetail(movieId);
      setQuote(movie?.tagline);
      setName(movie?.title);
    })();
  }, [movieId]);

  return (
    <div className="footer">
      <div className="footer__quote">
        <q>{quote}</q>
        <p>-{name}</p>
      </div>
      <div className="footer__social">
        <a className="footer__social__icon" href="#">
          <Facebook />
          <div className="footer__social__icon__tooltip">Facebook</div>
        </a>
        <a className="footer__social__icon" href="#">
          <Instagram />
          <span className="footer__social__icon__tooltip">Instagram</span>
        </a>
        <a className="footer__social__icon" href="#">
          <Twitter />
          <span className="footer__social__icon__tooltip"> Twitter</span>
        </a>
      </div>
    </div>
  );
}

export default Footer;
