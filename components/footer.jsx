import Link from "next/link";
import { Logo, Facebook, Instagram, Twitter } from "../public/assets";

function Footer(props) {
  return (
    <div className="footer">
      <Logo className="footer__logo" />
      <div className="footer__quote">
        <q>
          We love films and storytelling as a people. It’s just a human
          compulsion to listen to and tell stories
        </q>
        <p>Mychael Danna</p>
      </div>
      <div className="footer__social">
        <Facebook className="footer__social__icon" />
        <Instagram className="footer__social__icon" />
        <Twitter className="footer__social__icon" />
      </div>
    </div>
  );
}

export default Footer;
