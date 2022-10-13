import { Fade } from "@mui/material";
import { Col, Layout, Row, Tag } from "antd";
import CrossBoardComponent from "./CrossBoard";
import {
  AppstoreOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  SyncOutlined,
} from "@ant-design/icons";

const GameBoardComponent = ({
  counter,
  responses,
  isMatchTie,
  populateBoard,
  winnerDeclared,
}) => {
  const show = true;
  const { Content } = Layout;

  return (
    <>
      <Content className="GameBoard">
        <div className="darkThemeLight">
          <Row>
            <Col span={24}>
              <h1 className="Heading">
                <AppstoreOutlined className="appIcon" />
                &nbsp;&nbsp;Tic Tac Toe
              </h1>
            </Col>
            <Col span={3}></Col>
            <Col span={18}>
              <CrossBoardComponent
                counter={counter}
                responses={responses}
                populateBoard={populateBoard}
              />
            </Col>
          </Row>
          <br />
          <br />
        </div>
      </Content>
      <Row
        style={{
          width: "75%",
          margin: "auto",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <Col span={24} className="TurnColumn">
          {isMatchTie ? (
            <>
              <Fade in={true} className="FadeTabDraw">
                <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  Match Draw
                </Tag>
              </Fade>
            </>
          ) : !winnerDeclared ? (
            <>
              <Fade
                in={show}
                key={counter % 2 === 0 ? "X" : "O"}
                className="FadeTab"
                {...(true ? { timeout: 1000 } : {})}
              >
                <Tag
                  icon={<SyncOutlined spin />}
                  color="white"
                  style={{
                    backgroundColor: "#181818",
                    color: counter % 2 === 0 ? "#ff5db1" : "#00c2bb",
                  }}
                >
                  Player {counter % 2 === 0 ? "X" : "O"} Turn
                </Tag>
              </Fade>
            </>
          ) : (
            <>
              <Fade in={true} className="FadeTabOver">
                <Tag icon={<CheckCircleOutlined />} color="success">
                  Game Finished
                </Tag>
              </Fade>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default GameBoardComponent;
