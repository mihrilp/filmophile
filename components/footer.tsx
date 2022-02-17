import { Logo, Facebook, Instagram, Twitter } from "../public/assets";

function Footer() {
  return (
    <div className="footer">
      <div className="footer__logo">
        <Logo />
      </div>

      <div className="footer__quote">
        <q>
          We love films and storytelling as a people. It’s just a human
          compulsion to listen to and tell stories
        </q>
        <p>Mychael Danna</p>
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
