import Link from "next/link";
import { Facebook, Instagram, Twitter } from "../public/assets";

function Footer(props) {
  return (
    <div className="footer">
      <nav className="footer__nav">
        <ul>
          <li>
            <Link href="/home">home</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <a href="mailto:filmophile27@gmail.com">contact</a>
          </li>
        </ul>
      </nav>
      <div className="footer__social">
        <h4>Follow Us: </h4>
        <div>
          <Facebook className="footer__social__icon" />
          <Instagram className="footer__social__icon" />
          <Twitter className="footer__social__icon" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
