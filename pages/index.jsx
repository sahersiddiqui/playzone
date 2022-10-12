import { Col, Row } from "antd";
import FooterComponent from "./components/Footer";
import HeaderComponent from "./components/Header";
import style from "../styles/Home.module.css";
import { Typography } from "@mui/material";

export default function Home() {
  return (
    <div className="App">
      <Row>
        <Col span={24}>
          <HeaderComponent />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <div className={style.mainContent}>
            <Typography variant="h2">Tic Tac Toe</Typography>
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
