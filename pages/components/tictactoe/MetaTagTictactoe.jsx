import Head from "next/head";

const MetaTagTictactoe = () => {
  return (
    <Head>
      <title>Playzone Tic Tac Toe</title>
      <link rel="icon" href="/images/tictactoe/favicon.ico" type="image/x-icon" />
      <meta property="og:image" content="/images/tictactoe/favicon.jpg" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta
        name="description"
        content="Play Tic-Tac-Toe online with your friends."
      />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Hanalei+Fill&display=swap"
        rel="stylesheet"
      />
    </Head>
  );
};

export default MetaTagTictactoe;
