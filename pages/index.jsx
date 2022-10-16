import Link from "next/link";
import { Col, Row } from "antd";
import { useRouter } from "next/router";
import MetaTag from "./components/MetaTag";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);

  const joinRoom = () => {
    setIsDisabled(true);
    let roomId = Math.random().toString(36).slice(2);
    router.push(`tic-tac-toe/${roomId}`);
  };

  return (
    <div className="HomeContent">
      <MetaTag />
      <Row className="HomeImage">
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
            src="/images/home-logo.jpeg"
            alt="home logo"
            className="zoom-in-out-image"
          />
        </Col>
      </Row>
      <Row className="HomeImage">
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "3%",
          }}
        >
          <img
            src="/images/home-title.jpg"
            alt="home title"
            className="linear-title"
          />
        </Col>
      </Row>
      <br />
      <Row className="HomeActions">
        <Col xs={24} md={6}></Col>
        <Col xs={24} md={6}>
          <button
            disabled={isDisabled}
            style={{ paddingTop: 0 }}
            className="PlayButton"
            onClick={joinRoom}
          >
            Online Player
          </button>
          {/* <Link href="#">
            <a className="PlayButton">Online Player</a>
          </Link> */}
        </Col>
        <Col xs={24} md={6}>
          <Link href="/tic-tac-toe">
            <a className="PlayButton">Offline Player</a>
          </Link>
        </Col>
        <Col xs={24} md={6}></Col>
      </Row>
    </div>
  );
}
