import Head from "next/head";

function About() {
  return (
    <div className="about">
      <Head>
        <title>About</title>
      </Head>
      <p className="about__title">
        A unique place for TV series and movie lovers <br /> (AKA Filmophiles)
      </p>
      <p className="about__text">
        You can see popular and top rated movies. You can find all details about
        movies and Tv series like IMDB rates, date, subject etc. Also you can
        watch trailer. You can search your favorite movie, TV series and actors.
        At the bottom of the page you can see the movies and TV series that you
        have visited before.
      </p>
    </div>
  );
}

export default About;
