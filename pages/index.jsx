import Link from "next/link";
import { Col, Row, Typography } from "antd";
import { useRouter } from "next/router";
import MetaTag from "./components/MetaTag";
import { useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

export default function Home() {
  const router = useRouter();
  const [isDisabled, setIsDisabled] = useState(false);
  const [backdropState, setBackdropState] = useState(false);

  const joinRoom = () => {
    setIsDisabled(true);
    setBackdropState(true);
    let roomId = Math.random().toString(36).slice(2);
    router.push(`tic-tac-toe/${roomId}`);
  };

  return (
    <div className="HomeContent">
      <MetaTag />

      <Backdrop
        open={backdropState}
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Row>
          <Col md={24} xs={24}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                top: 60,
                position: "fixed",
                left: 10,
                right: 10,
                fontFamily: "Hanalei Fill",
                fontSize: "1.6em",
                color: "whitesmoke",
              }}
            >
              Hold tight, we are making room for you!
            </Typography>
          </Col>
          <br />
          <Col
            md={24}
            xs={24}
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <CircularProgress style={{ color: "#ff5db1 !important" }} />
          </Col>
        </Row>
      </Backdrop>

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
