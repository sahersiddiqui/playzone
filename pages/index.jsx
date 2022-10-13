import Head from "next/head";
import { Col, Row } from "antd";
import { Button, Typography } from "@mui/material";
import style from "../styles/Home.module.css";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const joinRoom = () => {
    let roomId = Math.random().toString(36).slice(2);
    router.push(`/tic-tac-toe/${roomId}`);
  };

  return (
    <div className="App">
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
        <Col span={24}>
          <HeaderComponent />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={style.mainContent}>
            <Typography variant="h2">Tic Tac Toe</Typography>
            <br />
            <Button onClick={joinRoom} variant="contained">
              Click to start the game
            </Button>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <FooterComponent />
        </Col>
      </Row>
    </div>
  );
}
