import Link from "next/link";
import { useState } from "react";
import { Logo, BurgerMenu, Close } from "../public/assets";
import SearchBar from "./SearchBar";

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
      <SearchBar />
      <nav className={`header__navbar ${isOpen && "header__active"}`}>
        <Link href="/">
          <a>Movies</a>
        </Link>
        <Link href="/tv-shows">
          <a>TV Shows</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <div className="header__burgerMenuBtn" onClick={toggleHamburgerMenu}>
        {isOpen ? <Close /> : <BurgerMenu />}
      </div>
    </div>
  );
}

export default Header;
