import Head from "next/head";

const MetaTagHangsman = () => {
  return (
    <Head>
      <title>Playzone Hangman - Word Guessing Game</title>
      <link rel="icon" href="/images/favicon-hangsman.ico" type="image/x-icon" />
      <meta property="og:image" content="/images/preview.jpg" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Make stronger vocabulary by making guess of random words in Hangman online game."
      />
    </Head>
  );
};

export default MetaTagHangsman;
