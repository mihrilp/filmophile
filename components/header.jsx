import Link from "next/link";
import Logo from "../public/assets/logo_dark.svg";
import styles from "../styles/header.module.scss";

function Header(props) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <nav className={styles.navbar}>
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
