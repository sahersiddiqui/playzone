import WinnerBoardComponent from "./WinnerBoard";
import { Col, Layout, Progress, Row } from "antd";
import { DashboardOutlined, ProfileOutlined } from "@ant-design/icons";

const AnalyticsComponent = ({
  counter,
  winnerTeam,
  isMatchTie,
  resetMatch,
  winnerDeclared,
}) => {
  const { Content } = Layout;

  return (
    <>
      <Content className="AnalyticsBoard">
        <Row className="darkThemeLight" style={{ color: "#fff" }}>
          <Col xs={24} lg={12}>
            <div>
              <h1 style={{ color: "#fff" }}>
                <DashboardOutlined className="appIcon" />
                &nbsp;&nbsp;Progress
              </h1>
              <span>
                <Progress
                  type="circle"
                  status={
                    counter >= 9 ? "success" : !counter ? "exception" : "active"
                  }
                  strokeColor={
                    counter >= 9
                      ? {
                          "0%": "#00c2bb",
                          "100%": "#ff5db1",
                        }
                      : !counter
                      ? { "100%": "#F1CFC8" }
                      : { "0%": "#00c2bb", "100%": "#ff5db1" }
                  }
                  className="ProgressCircle"
                  percent={
                    !counter ? 100 : parseFloat((counter / 9) * 100).toFixed(1)
                  }
                  title="Completion Percentage"
                  style={{ color: "red !important" }}
                  // format={() => "Done"}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="notes">
              <h1 style={{ color: "#fff" }}>
                Notes&nbsp;&nbsp;
                <ProfileOutlined className="appIcon" />
              </h1>
              <div>
                <div>
                  <span className="NoteText">*</span>
                  <span>&nbsp;Game starts with player X</span>
                </div>
                <div>
                  <span>
                    <span className="NoteText">*</span>
                    &nbsp;Game starts by just tap on box
                  </span>
                </div>
                <div>
                  <span>
                    wanna&nbsp;
                    <span className="ResetMatch" onClick={() => resetMatch()}>
                      reset the game
                    </span>
                    ?
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Content>
      <WinnerBoardComponent
        isMatchTie={isMatchTie}
        winnerTeam={winnerTeam}
        winnerDeclared={winnerDeclared}
      />
    </>
  );
};

export default AnalyticsComponent;
