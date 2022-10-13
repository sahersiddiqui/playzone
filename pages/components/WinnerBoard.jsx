import { Col, Row, Layout } from "antd";
import { Divider, Hidden } from "@mui/material";
import { FrownTwoTone, SlidersOutlined, SmileTwoTone } from "@ant-design/icons";

const WinnerBoardComponent = ({ winnerTeam, winnerDeclared, isMatchTie }) => {
  const { Content } = Layout;

  return (
    <>
      <Content className="WinnerBoard">
        <div className="darkThemeLight">
          <Row>
            <Col xs={24}>
              <h1 className="Heading">
                <SlidersOutlined className="appIcon" />
                &nbsp;&nbsp;
                <Hidden smDown>Winner</Hidden> Score Board
              </h1>
              <Divider
                orientation="horizontal"
                style={{ backgroundColor: "#fff" }}
              />
            </Col>
          </Row>
          <Row className="WinnerTableHead">
            <Col xs={8}>Player X</Col>
            <Col xs={8}>Player O</Col>
            <Col xs={8}>Match Tie</Col>
          </Row>
          <Divider
            orientation="horizontal"
            style={{ backgroundColor: "#fff" }}
          />
          <Row className="WinnerTableBody">
            <Col span={8} style={{ color: "#fff" }}>
              {!winnerDeclared ? (
                "_"
              ) : winnerTeam === "x" ? (
                <SmileTwoTone twoToneColor="#52c41a" />
              ) : (
                <FrownTwoTone twoToneColor="#faad14" />
              )}
            </Col>
            <Col span={8} style={{ color: "#fff" }}>
              {!winnerDeclared ? (
                "_"
              ) : winnerTeam === "o" ? (
                <SmileTwoTone twoToneColor="#52c41a" />
              ) : (
                <FrownTwoTone twoToneColor="#faad14" />
              )}
            </Col>
            <Col span={8} style={{ color: "#fff" }}>
              {isMatchTie ? <SmileTwoTone /> : "_"}
            </Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default WinnerBoardComponent;
