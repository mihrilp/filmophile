import { Facebook, Instagram, Twitter } from "@/public/assets";
import Link from "next/link";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__discover">
        <h3 className="footer__discover__title">Discover</h3>
        <Link href="/movies">
          <a>Movie</a>
        </Link>
        <span> / </span>
        <Link href="/tv-shows">
          <a>TV Show</a>
        </Link>
      </div>
      <div className="footer__quote">
        <q>Welcome to Jurassic Park.</q>
        <p>-Jurassic Park</p>
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
