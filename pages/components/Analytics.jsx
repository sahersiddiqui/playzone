import WinnerBoardComponent from "./WinnerBoard";
import { Col, Layout, Progress, Row } from "antd";
import { DashboardTwoTone, ProfileTwoTone } from "@ant-design/icons";

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
        <Row>
          <Col xs={24} lg={12}>
            <div>
              <h1>
                <DashboardTwoTone size={"large"} />
                &nbsp;&nbsp;Game Stats
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
                          "0%": "#108ee9",
                          "100%": "#87d068",
                        }
                      : !counter
                      ? { "100%": "#F1CFC8" }
                      : { "0%": "#c0eefc", "100%": "#68b6f2" }
                  }
                  className="ProgressCircle"
                  percent={
                    !counter ? 100 : parseFloat((counter / 9) * 100).toFixed(1)
                  }
                  title="Completion Percentage"
                  // format={() => "Done"}
                />
              </span>
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="notes">
              <h1>
                <ProfileTwoTone size={"large"} />
                &nbsp;&nbsp;Notes
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
