import Head from "next/head";
import { Col, Row } from "antd";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const joinRoom = () => {
    let roomId = Math.random().toString(36).slice(2);
    router.push(`/tic-tac-toe/${roomId}`);
  };

  return (
    <div className="HomeContent">
      <Head>
        <title>Play Zone</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta property="og:image" content="/favicon.jpg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Play Tic-Tac-Toe online with your friends."
        />
      </Head>
      <Row>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img
            src="/home-logo.jpeg"
            alt="home logo"
            className="zoom-in-out-image"
          />
        </Col>
      </Row>
      <Row>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "7%",
          }}
        >
          <img
            src="/home-title.jpg"
            alt="home title"
            className="linear-title"
          />
        </Col>
      </Row>
    </div>
  );
}
