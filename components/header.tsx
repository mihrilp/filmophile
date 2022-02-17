import Link from "next/link";
import { Logo } from "../public/assets";

function Header() {
  return (
    <div className="header">
      <Link href="/" passHref>
        <a className="header__logo">
          <Logo />
        </a>
      </Link>
      <nav className="header__nav">
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
