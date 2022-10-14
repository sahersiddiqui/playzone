import { Col, Row } from "antd";
import io from "socket.io-client";
import { useRouter } from "next/router";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
import GameBoardComponent from "../components/GameBoard";
import AnalyticsComponent from "../components/Analytics";
import ResultBarComponent from "../components/ResultBar";
import React, { useEffect, useRef, useState } from "react";
import { Backdrop, CircularProgress, Typography } from "@mui/material";

const connectionOptions = {
  timeout: 10000,
  transports: ["websocket"],
  "force new connection": true,
  reconnectionAttempts: "Infinity",
};
const socket = io.connect(
  "https://playzone-server.herokuapp.com",
  connectionOptions
);

export default function TicTacToe() {
  const router = useRouter();
  const { game_room } = router.query;

  // Room State
  let flag = 0;
  const [room, setRoom] = useState("");

  // Messages States
  const [errorMesg, setErrorMesg] = useState("");
  const [username, setUsername] = useState(
    `player_${Math.random().toString(36).slice(8)}`
  );

  const [counter, setCounter] = useState(0);
  const [initMove, setInitMove] = useState(null);
  const [responses, setResponses] = useState([]);
  const [winnerTeam, setWinnerTeam] = useState("_");
  const [isMatchTie, setIsMatchTie] = useState(false);
  const [backdropState, setBackdropState] = useState(true);
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [showResponseBar, setShowResponseBar] = useState(false);
  // const [currMesg, setCurrMesg] = useState({ user: "", mesg: "" });

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
    let room_id = game_room
      ? game_room
      : window.location.href.split("/").reverse().filter(Boolean)[0];

    setRoom(room_id);

    // Letting user join the room only once
    if (room_id && flag < 1) {
      flag++;
      socket.emit("join_room", { room_id, username });
    }

    // Room users max limit reach exception handling
    socket.on("join_room_error", (data) => {
      if (!data) setErrorMesg("Play room is full!");
    });
  }, []);

  useEffect(() => {
    // Receiving data from server
    socket.on(`broadcast_move`, (data) => {
      const { index, value } = data;

      if (initMove === value) setBackdropState(true);
      else setBackdropState(false);

      responses[index] = value;
      setResponses(responses);
      checkWinner(value);
    });

    // Handle game board enable/disable scenario
    socket.on(`enable_gameboard`, () => {
      setBackdropState(false);
    });
    socket.on(`disable_gameboard`, () => {
      setBackdropState(true);
    });
    socket.on(`back_to_home`, () => {
      router.push("tic-tac-toe");
    });
  });

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

  const sendPlayerMove = (payload) => {
    if (!errorMesg) socket.emit("send_player_move", payload);
  };

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

    if (!initMove) setInitMove(value);
    sendPlayerMove({ data: { index, value }, room: room });
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
      <Backdrop
        open={backdropState}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Typography variant="h4">Waiting for your friend to join</Typography>
        <CircularProgress color="info" />
      </Backdrop>

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
