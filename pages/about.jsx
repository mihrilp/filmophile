import styles from "../styles/about.module.scss";

function About(props) {
  return (
    <div className={styles.about}>
      <h2 className={styles.title}>About Us</h2>
      <p className={styles.text}>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et repellat
        molestiae illo. Dignissimos, ut! Non cumque cupiditate amet libero
        explicabo vero facere saepe atque sapiente. Iusto perspiciatis porro
        beatae sapiente, fugiat vel dolor architecto velit quo aspernatur
        pariatur, nesciunt optio temporibus facere. Iure soluta molestiae
        molestias, laudantium ab voluptatibus quod.
      </p>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et repellat
        molestiae illo. Dignissimos, ut! Non cumque cupiditate amet libero
        explicabo vero facere saepe atque sapiente. Iusto perspiciatis porro
        beatae sapiente, fugiat vel dolor architecto velit quo aspernatur
        pariatur, nesciunt optio temporibus facere. Iure soluta molestiae
        molestias, laudantium ab voluptatibus quod.
      </p>
    </div>
  );
}

export default About;
