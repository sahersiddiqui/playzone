import { Col, Row } from "antd";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
import GameBoardComponent from "../components/GameBoard";
import AnalyticsComponent from "../components/Analytics";
import ResultBarComponent from "../components/ResultBar";
import React, { useEffect, useRef, useState } from "react";

export default function TicTacToe() {
  const [counter, setCounter] = useState(0);
  const [responses, setResponses] = useState([]);
  const [winnerTeam, setWinnerTeam] = useState("_");
  const [isMatchTie, setIsMatchTie] = useState(false);
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [showResponseBar, setShowResponseBar] = useState(false);

  const winningConditions = [
    // Horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagnonal
    [0, 4, 8],
    [2, 4, 6],
  ];
  const topRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (winnerDeclared || isMatchTie) {
      // scroll to bottom every time states (winnerDeclared, isMatchTie) change
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    if (counter === 9 && !winnerDeclared) {
      setIsMatchTie(true);
      setShowResponseBar(true);
    }
  }, [counter, winnerDeclared, isMatchTie]);

  const handleCloseResponseMesg = () => {
    setShowResponseBar(false);
  };

  const resetMatch = () => {
    setCounter(0);
    setResponses([]);
    setWinnerTeam("_");
    setIsMatchTie(false);
    setWinnerDeclared(false);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const populateBoard = (index, value) => {
    if (winnerDeclared) return;
    responses[index] = value;
    setResponses(responses);
    checkWinner(value);
  };

  const checkWinner = (value) => {
    setCounter(counter + 1);
    winningConditions.map((item) => {
      let condRes = item.every((elem) => responses[elem] === value);
      if (condRes) {
        setWinnerTeam(value);
        setWinnerDeclared(true);
        setShowResponseBar(true);
      }
    });
  };

  return (
    <div className="App">
      <ResultBarComponent
        showResponseBar={showResponseBar}
        responseMesg={
          isMatchTie
            ? "Last match was a draw."
            : winnerDeclared
            ? "Congrats. You have won the game."
            : "Retry your match!"
        }
        handleCloseResponseMesg={handleCloseResponseMesg}
        type={isMatchTie ? "warning" : winnerDeclared ? "success" : "info"}
      />

      <Row>
        <Col span={24}>
          <div ref={topRef} />
          <HeaderComponent />
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12}>
          <GameBoardComponent
            counter={counter}
            responses={responses}
            isMatchTie={isMatchTie}
            populateBoard={populateBoard}
            winnerDeclared={winnerDeclared}
          />
        </Col>
        <Col xs={24} sm={12}>
          <AnalyticsComponent
            counter={counter}
            resetMatch={resetMatch}
            winnerTeam={winnerTeam}
            isMatchTie={isMatchTie}
            winnerDeclared={winnerDeclared}
          />
          <div ref={bottomRef} />
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
