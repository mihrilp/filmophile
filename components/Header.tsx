import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Logo, BurgerMenu, Close, Search } from "@/public/assets";
import SearchBar from "./SearchBar";
import { useRouter } from "next/router";

function Header() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const router = useRouter();

  const toggleHamburgerMenu = useCallback(() => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }, [isBurgerMenuOpen]);

  const toggleSearchBar = useCallback(() => {
    setIsSearchBarOpen(!isSearchBarOpen);
  }, [isSearchBarOpen]);

  const handleRouteChange = useCallback(() => {
    setIsBurgerMenuOpen(false);
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  return (
    <div className="header">
      <Link href="/" passHref>
        <a className="header__logo">
          <Logo />
        </a>
      </Link>
      <SearchBar
        isSearchBarOpen={isSearchBarOpen}
        setIsSearchBarOpen={setIsSearchBarOpen}
      />
      <nav
        className={`header__navbar ${
          isBurgerMenuOpen && "header__activeNavbar"
        }`}
      >
        <Link href="/movies">
          <a>Movies</a>
        </Link>
        <Link href="/tv-shows">
          <a>TV Shows</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </nav>
      <div className="header__mobileMenu">
        <button onClick={toggleSearchBar}>
          <Search width={27} height={27} />
        </button>
        <div className="header__burgerMenuBtn" onClick={toggleHamburgerMenu}>
          {isBurgerMenuOpen ? <Close stroke="#cb9e0c" /> : <BurgerMenu />}
        </div>
      </div>
    </div>
  );
}

export default Header;
