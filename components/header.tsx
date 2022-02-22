import Link from "next/link";
import { useState } from "react";
import { Logo, BurgerMenu } from "../public/assets";

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleHamburgerMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="header">
      <Link href="/" passHref>
        <a className="header__logo">
          <Logo />
        </a>
      </Link>
      <a className="header__burgerMenuBtn" onClick={toggleHamburgerMenu}>
        <BurgerMenu />
      </a>
      <nav
        className={`header__navbar ${
          isOpen ? "header__active" : "header__deactive"
        }`}
      >
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
