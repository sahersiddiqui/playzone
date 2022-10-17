import { Col, Row } from "antd";
import io from "socket.io-client";
import Zoom from "@mui/material/Zoom";
import { useRouter } from "next/router";
import MetaTag from "../components/MetaTag";
import HeaderComponent from "../components/Header";
import FooterComponent from "../components/Footer";
import { ShareOutlined } from "@mui/icons-material";
import GameBoardComponent from "../components/GameBoard";
import AnalyticsComponent from "../components/Analytics";
import ResultBarComponent from "../components/ResultBar";
import React, { useEffect, useRef, useState } from "react";
import {
  Hidden,
  Tooltip,
  Backdrop,
  SpeedDial,
  CircularProgress,
  Snackbar,
  SpeedDialAction,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import ShareIcon from "@mui/icons-material/Share";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

// const connectionOptions = {
//   timeout: 10000,
//   transports: ["websocket"],
//   "force new connection": true,
//   reconnectionAttempts: "Infinity",
// };
// connectionOptions
const socket = io.connect(process.env.NEXT_PUBLIC_BACKEND_SERVER);

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
  const [showMesgBar, setShowMesgBar] = useState(true);
  const [backdropState, setBackdropState] = useState(true);
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [showResponseBar, setShowResponseBar] = useState(false);
  const [showToolTip, setShowToolTip] = useState(true);
  const [showCopiedToolTip, setShowCopiedToolTip] = useState(false);
  // const [currMesg, setCurrMesg] = useState({ user: "", mesg: "" });
  const [winnerIndex, setWinnerIndex] = useState();

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

    setTimeout(() => {
      setShowToolTip(false);
    }, 5000);
  }, []);

  useEffect(() => {
    // Receiving data from server
    socket.on(`broadcast_move`, (data) => {
      const { index, value } = data;

      if (initMove === value && !isMatchTie) setBackdropState(true);
      else setBackdropState(false);

      responses[index] = value;
      setResponses(responses);
      checkWinner(value);
    });

    // Handle reset match request
    socket.on(`reset_match`, () => {
      // resetMatchStates();
      window.location.reload();
      // router.reload(window.location.pathname);
      // initMove === "x" ? setBackdropState(false) : setBackdropState(true);
    });

    // Handle game board enable/disable scenario
    socket.on(`enable_gameboard`, () => {
      setBackdropState(false);
    });
    socket.on(`close_mesg_bar`, () => {
      setShowMesgBar(false);
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
      setBackdropState(false);
      setShowResponseBar(true);
    }
  }, [counter, winnerDeclared, isMatchTie]);

  const sendPlayerMove = (payload) => {
    if (!errorMesg) socket.emit("send_player_move", payload);
  };

  const handleCloseResponseMesg = () => {
    setShowResponseBar(false);
  };

  const resetMatchStates = () => {
    setCounter(0);
    setResponses([]);
    setWinnerTeam("_");
    setIsMatchTie(false);
    setWinnerDeclared(false);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const resetMatch = () => {
    // resetMatchStates();
    socket.emit("request_reset_match", room);
  };

  const populateBoard = (index, value) => {
    if (winnerDeclared) return;

    if (!initMove) setInitMove(value);
    sendPlayerMove({ data: { index, value }, room: room });
  };

  const checkWinner = (value) => {
    setCounter(counter + 1);
    winningConditions.map((item, index) => {
      let condRes = item.every((elem) => responses[elem] === value);

      if (condRes) {
        setWinnerTeam(value);
        setWinnerDeclared(true);
        setBackdropState(false);
        setShowResponseBar(true);
        setWinnerIndex(index);
      }
    });
  };

  const actions = [
    {
      icon: <FileCopyIcon />,
      name: "Copy",
      onClick: () => {
        navigator.clipboard.writeText(
          `${process.env.NEXT_PUBLIC_GAME_ROOM_URL}/${room}`
        );
      },
    },
    {
      icon: <WhatsAppIcon />,
      name: "Share",
      onClick: () => {
        window.open(
          `whatsapp://send?text=${process.env.NEXT_PUBLIC_GAME_ROOM_URL}/${room}`
        );
      },
    },
  ];

  return (
    <div className="App">
      <MetaTag />
      <Hidden mdDown>
        <Snackbar
          className="customSnackbar"
          type="info"
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={showMesgBar}
          onClose={() => setShowMesgBar(false)}
          message={
            <>
              Click to copy and share with your friend & ask them to join.&nbsp;
              <Tooltip
                title="Copied"
                placement="bottom"
                open={showCopiedToolTip}
              >
                <ContentCopyIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_GAME_ROOM_URL}/${room}`
                    );
                    setShowCopiedToolTip(true);
                  }}
                />
              </Tooltip>
            </>
          }
        />

        {/* <ResultBarComponent
          type={"info"}
          autoHideDuration={null}
          showResponseBar={showMesgBar}
          handleCloseResponseMesg={() => setShowMesgBar(false)}
          // responseMesg={
          //   "Copy & share " +
          //   process.env.NEXT_PUBLIC_GAME_ROOM_URL +
          //   "/" +
          //   room +
          //   " with your friend & ask them to join."
          // }
          responseMesg={
            <>
              Click to copy and share with your friend & ask them to join.
              <ContentCopyIcon />
            </>
          }
        /> */}
      </Hidden>
      <Hidden mdUp>
        {/* <Tooltip
          TransitionComponent={Zoom}
          title="Click Me"
          placement="top"
          open={showToolTip}
        >
          <SpeedDial
            className="SpeedDialBtn"
            ariaLabel="Share room"
            sx={{
              position: "fixed",
              zIndex: (theme) => theme.zIndex.drawer + 2,
              bottom: 16,
              right: 16,
            }}
            icon={<ShareOutlined />}
            onClick={() => {
              window.open(`whatsapp://send?text=${process.env.NEXT_PUBLIC_GAME_ROOM_URL}/${room}`);
            }}
          ></SpeedDial>
        </Tooltip> */}
        <SpeedDial
          className="SpeedDialBtn"
          ariaLabel="Share room"
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.drawer + 2,
            bottom: 16,
            right: 16,
          }}
          direction={"up"}
          icon={<ShareOutlined />}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </Hidden>

      <Backdrop
        open={backdropState}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Row>
          {/* <Col md={24} xs={24}>
            <Typography
              variant="h6"
              style={{ textAlign: "center", color: "whitesmoke" }}
            >
              Waiting for your friend to join
            </Typography>
          </Col>
          <br /> */}
          <Col
            md={24}
            xs={24}
            style={{ marginTop: "20px", textAlign: "center" }}
          >
            <CircularProgress
              // color="warning"
              style={{ color: "#ff5db1 !important" }}
            />
          </Col>
        </Row>
      </Backdrop>

      <ResultBarComponent
        autoHideDuration={3000}
        showResponseBar={showResponseBar}
        responseMesg={
          isMatchTie
            ? "Last match was a draw."
            : winnerDeclared
            ? initMove === winnerTeam
              ? "Congrats. You have won the game."
              : "Opps. You have lost the game."
            : "Retry your match!"
        }
        handleCloseResponseMesg={handleCloseResponseMesg}
        type={
          isMatchTie
            ? "warning"
            : winnerDeclared
            ? initMove === winnerTeam
              ? "success"
              : "error"
            : "info"
        }
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
            winnerIndex={winnerIndex}
            winnerTeam={winnerTeam}
            resetMatch={resetMatch}
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
