import styles from "../styles/footer.module.scss";
import Facebook from "../public/assets/facebook.svg";
import Instagram from "../public/assets/instagram.svg";
import Twitter from "../public/assets/twitter.svg";
import { Logo } from "../components/icons";

function Footer(props) {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Logo />
      </div>
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
