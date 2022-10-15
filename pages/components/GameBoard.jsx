import { Fade, Button, Tooltip } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
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
  winnerIndex,
  winnerTeam,
  resetMatch,
}) => {
  const show = true;
  const { Content } = Layout;

  let winningLineClass = "";
  let lineColor = "";

  if (winnerIndex === 0) winningLineClass = "t-horizontal-line";
  else if (winnerIndex === 1) winningLineClass = "m-horizontal-line";
  else if (winnerIndex === 2) winningLineClass = "b-horizontal-line";
  else if (winnerIndex === 3) winningLineClass = "l-vertical-line";
  else if (winnerIndex === 4) winningLineClass = "m-vertical-line";
  else if (winnerIndex === 5) winningLineClass = "r-vertical-line";
  else if (winnerIndex === 6) winningLineClass = "r-diagonal-line";
  else if (winnerIndex === 7) winningLineClass = "diagonal-line";

  if (winnerTeam == "x") lineColor = "#ff00b1";
  else if (winnerTeam == "o") lineColor = "#00cabc";

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
              <span
                className={`line ${winningLineClass}`}
                style={{ borderColor: lineColor }}
              ></span>

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
          // width: "75%",
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
              <Fade in={true} className="FadeTabOver resetIcon">
                <Tooltip title="Restart Game" placement="top">
                  <Button
                    aria-label="reload game"
                    onClick={() => resetMatch()}
                    color="primary"
                    variant="contained"
                  >
                    <RefreshIcon />
                  </Button>
                </Tooltip>
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
              <Fade in={true} className="FadeTabOver resetIcon">
                <Tooltip title="Restart Game" placement="top">
                  <Button
                    aria-label="reload game"
                    onClick={() => resetMatch()}
                    color="primary"
                    variant="contained"
                  >
                    <RefreshIcon />
                  </Button>
                </Tooltip>
              </Fade>
            </>
          )}
        </Col>
      </Row>
    </>
  );
};

export default GameBoardComponent;
