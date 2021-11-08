import styles from "../styles/footer.module.scss";
import Link from "next/link";
import Facebook from "../public/assets/facebook.svg";
import Instagram from "../public/assets/instagram.svg";
import Twitter from "../public/assets/twitter.svg";

function Footer(props) {
  return (
    <div className={styles.footer}>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/home">home</Link>
          </li>
          <li>
            <Link href="/about">about</Link>
          </li>
          <li>
            <a href="mailto:filmophile27@gmail.com">contact</a>
          </li>
        </ul>
      </nav>
      <div className={styles.follow}>
        <h4>Follow Us: </h4>
        <div>
          <Facebook className={styles.icon} />
          <Instagram className={styles.icon} />
          <Twitter className={styles.icon} />
        </div>
      </div>
    </div>
  );
}

export default Footer;
