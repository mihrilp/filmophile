import Link from "next/link";
import Logo from "../public/assets/logo_dark.svg";

function Header(props) {
  return (
    <div className="header">
      <div className="logo">
        <Logo />
      </div>
      <nav className="navbar">
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
