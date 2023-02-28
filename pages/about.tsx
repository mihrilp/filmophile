import Head from "next/head";

function About() {
  return (
    <div className="about">
      <Head>
        <title>About</title>
      </Head>
      <p className="about__title">What is Filmophile?</p>
      <p className="about__text">
        A unique place for TV series and movie lovers. You can check trends of
        the week. You can see popular and top rated movies. You can see popular
        and top rated Tv Series. You can find all details about movies and Tv
        series like rates, date, story etc. Also you can watch trailer.
      </p>
      <p className="about__text">
        You can search your favorite movie, TV series and actors. At the bottom
        of the page you can see the movies and TV series that you have visited
        before.
      </p>
    </div>
  );
}

export default About;
