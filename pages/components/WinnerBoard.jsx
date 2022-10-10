import { Col, Row, Layout } from "antd";
import { Divider, Hidden } from "@mui/material";
import { FrownTwoTone, SlidersTwoTone, SmileTwoTone } from "@ant-design/icons";

const WinnerBoardComponent = ({ winnerTeam, winnerDeclared, isMatchTie }) => {
  const { Content } = Layout;

  return (
    <>
      <Content className="WinnerBoard">
        <div>
          <Row>
            <Col xs={24}>
              <h1 className="Heading">
                <SlidersTwoTone size={"large"} />
                &nbsp;&nbsp;
                <Hidden smDown>Winner</Hidden> Score Board
              </h1>
              <Divider orientation="horizontal" />
            </Col>
          </Row>
          <Row className="WinnerTableHead">
            <Col xs={8}>Player X</Col>
            <Col xs={8}>Player O</Col>
            <Col xs={8}>Match Tie</Col>
          </Row>
          <Divider orientation="horizontal" />
          <Row className="WinnerTableBody">
            <Col span={8}>
              {!winnerDeclared ? (
                "_"
              ) : winnerTeam === "x" ? (
                <SmileTwoTone twoToneColor="#52c41a" />
              ) : (
                <FrownTwoTone twoToneColor="#faad14" />
              )}
            </Col>
            <Col span={8}>
              {!winnerDeclared ? (
                "_"
              ) : winnerTeam === "o" ? (
                <SmileTwoTone twoToneColor="#52c41a" />
              ) : (
                <FrownTwoTone twoToneColor="#faad14" />
              )}
            </Col>
            <Col span={8}>{isMatchTie ? <SmileTwoTone /> : "_"}</Col>
          </Row>
        </div>
      </Content>
    </>
  );
};

export default WinnerBoardComponent;
