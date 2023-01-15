import Link from "next/link";
import { useState } from "react";
import { Logo, BurgerMenu, Close } from "../public/assets";
import SearchBar from "./searchBar";

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
        <Link href="/about">
          <a>What is Filmophile?</a>
        </Link>
      </nav>
      <div className="header__burgerMenuBtn" onClick={toggleHamburgerMenu}>
        {isOpen ? <Close /> : <BurgerMenu />}
      </div>
    </div>
  );
}

export default Header;
