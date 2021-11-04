import Head from "next/head";
import styles from "../styles/home.module.scss";
import Header from "../components/header";
import Footer from "../components/footer";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Fimophile</title>
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <Header />
      <Footer />
    </div>
  );
}
