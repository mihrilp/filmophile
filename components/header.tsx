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
      <div className="header__menu">
        <a
          className="header__menu__burgerMenuBtn"
          onClick={toggleHamburgerMenu}
        >
          <BurgerMenu />
        </a>
        <nav
          className={`header__menu__navbar ${
            isOpen ? "header__menu__active" : "header__menu__deactive"
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
    </div>
  );
}

export default Header;
