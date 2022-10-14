import * as React from "react";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from "react";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import CloseIcon from "@mui/icons-material/Close";
import TableContainer from "@mui/material/TableContainer";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import {
  TableFooter,
  Snackbar,
  Alert,
  IconButton,
  Hidden,
} from "@mui/material";

function App() {
  const [flag, setFlag] = useState("X");
  const [counter, setCounter] = useState(0);
  const [openNote, setOpenNote] = useState(true);
  const [winnerTeam, setWinnerTeam] = useState("_");
  const [isMatchTie, setIsMatchTie] = useState(false);
  const [responses, setResponses] = useState([[], [], []]);
  const [winnerDeclared, setWinnerDeclared] = useState(false);
  const [showWinnerBar, setShowWinnerBar] = useState(false);
  const [showDrawBar, setDrawBar] = useState(false);
  const fields = [
    [0, 1, 2],
    [0, 1, 2],
    [0, 1, 2],
  ];
  useEffect(() => {
    if (counter === 9 && !winnerDeclared) {
      setIsMatchTie(true);
      setDrawBar(true);
    }
  }, [counter]);

  const resetMatch = () => {
    setFlag("X");
    setCounter(0);
    setWinnerTeam("_");
    setIsMatchTie(false);
    setWinnerDeclared(false);
    setResponses([[], [], []]);
  };

  const populateBoard = (row, col) => {
    if (winnerDeclared) return;
    responses[row][col] = flag;
    if (flag === "X") setFlag("O");
    else setFlag("X");
    setResponses([...responses]);
    checkWinner();
  };

  const checkWinner = () => {
    setCounter(counter + 1);
    let row1 = [],
      row2 = [],
      row3 = [],
      col1 = [],
      col2 = [],
      col3 = [],
      dig1 = [],
      dig2 = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (i === 0) row1.push(responses[i][j]);
        if (i === 1) row2.push(responses[i][j]);
        if (i === 2) row3.push(responses[i][j]);
        if (j === 0) col1.push(responses[i][j]);
        if (j === 1) col2.push(responses[i][j]);
        if (j === 2) col3.push(responses[i][j]);
        if (i === j) dig1.push(responses[i][j]);
        if (i + j === 2) dig2.push(responses[i][j]);
      }
    }

    if (
      (row1.filter(Boolean).length === 3 && row1.every((v) => v === row1[0])) ||
      (row2.filter(Boolean).length === 3 && row2.every((v) => v === row2[0])) ||
      (row3.filter(Boolean).length === 3 && row3.every((v) => v === row3[0])) ||
      (col1.filter(Boolean).length === 3 && col1.every((v) => v === col1[0])) ||
      (col2.filter(Boolean).length === 3 && col2.every((v) => v === col2[0])) ||
      (col3.filter(Boolean).length === 3 && col3.every((v) => v === col3[0])) ||
      (dig1.filter(Boolean).length === 3 && dig1.every((v) => v === dig1[0])) ||
      (dig2.filter(Boolean).length === 3 && dig2.every((v) => v === dig2[0]))
    ) {
      setWinnerDeclared(true);
      setShowWinnerBar(true);
    }
  };

  const handleCloseWinner = () => {
    setShowWinnerBar(false);
  };
  const handleCloseDraw = () => {
    setDrawBar(false);
  };

  return (
    <div className="App">
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleCloseWinner}
        open={showWinnerBar}
        autoHideDuration={3000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseWinner}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseWinner} severity="success" variant="filled">
          Congrats. You have won the game.
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        onClose={handleCloseDraw}
        open={showDrawBar}
        autoHideDuration={3000}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseDraw}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleCloseDraw} severity="warning" variant="filled">
          Last match was a draw.
        </Alert>
      </Snackbar>
      {/* <header className="App-header"> */}
      <TableContainer component={Paper} className="tableContainer">
        <Table
          align="center"
          sx={{ width: "70%", marginBottom: "10%" }}
          aria-label="tictactoe board"
        >
          <TableHead>
            <TableRow>
              <TableCell style={{ border: "0" }} colSpan="3" align="left">
                <h1
                  style={{
                    display: "flex",
                    marginLeft: "-4%",
                    alignItems: "center",
                    color: "whitesmoke",
                  }}
                >
                  <AppsOutlinedIcon fontSize="large" />
                  &nbsp;Tic Tac Toe
                </h1>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((item, index) => {
              return (
                <TableRow style={{ height: "100px" }}>
                  {item.map((innerItem, innerIndex) => {
                    let border = "0 0 0 0";
                    if (index === 0 && innerIndex === 1)
                      border = "0px 2px 0px 2px";
                    else if (index === 1 && innerIndex === 0)
                      border = "2px 0px 2px 0px";
                    else if (index === 1 && innerIndex === 1)
                      border = "2px 2px 2px 2px";
                    else if (index === 1 && innerIndex === 2)
                      border = "2px 0px 2px 2px";
                    else if (index === 2 && innerIndex === 1)
                      border = "0px 2px 0px 2px";

                    return (
                      <>
                        {responses[index][innerIndex] ? (
                          <>
                            <TableCell
                              style={{
                                borderWidth: border,
                                borderColor: "whitesmoke",
                                borderStyle: "solid",
                              }}
                              align="center"
                            >
                              {responses[index][innerIndex] === "X" ? (
                                <>
                                  <CloseOutlinedIcon
                                    fontSize="large"
                                    style={{
                                      color: "whitesmoke",
                                      fontSize: "3.2em",
                                    }}
                                  />
                                </>
                              ) : (
                                <>
                                  <CircleOutlinedIcon
                                    fontSize="large"
                                    style={{
                                      color: "whitesmoke",
                                      fontSize: "3.2em",
                                    }}
                                  />
                                </>
                              )}
                            </TableCell>
                          </>
                        ) : (
                          <>
                            <TableCell
                              onClick={() => populateBoard(index, innerIndex)}
                              style={{
                                borderWidth: border,
                                borderColor: "whitesmoke",
                                borderStyle: "solid",
                              }}
                              align="center"
                            ></TableCell>
                          </>
                        )}
                      </>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan="1" align="left">
                <h4
                  style={{
                    marginTop: "-20%",
                    fontWeight: "1200",
                    color: "whitesmoke",
                  }}
                >
                  Score Board
                </h4>
              </TableCell>
              <TableCell
                colSpan="2"
                align="right"
                style={{ color: "whitesmoke" }}
              >
                <br />
                <span style={{ color: "brown" }}>*</span>
                <span>Game starts with player X</span>
                <br />
                <span>
                  <span style={{ color: "brown" }}>*</span>
                  Game starts by just tap on box
                </span>
                <br />
                <span>
                  wanna&nbsp;
                  <spna
                    style={{ color: "brown", cursor: "Pointer" }}
                    onClick={() => resetMatch()}
                  >
                    reset the match
                  </spna>
                  ?
                </span>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" style={{ color: "whitesmoke" }}>
                Play<Hidden mdDown>er</Hidden> X
              </TableCell>
              <TableCell align="center" style={{ color: "whitesmoke" }}>
                Play<Hidden mdDown>er</Hidden> O
              </TableCell>
              <TableCell align="center" style={{ color: "whitesmoke" }}>
                <Hidden mdDown>Match</Hidden> Tie
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" style={{ color: "whitesmoke" }}>
                {winnerTeam}
              </TableCell>
              <TableCell align="center" style={{ color: "whitesmoke" }}>
                {winnerTeam}
              </TableCell>
              <TableCell align="center" style={{ color: "whitesmoke" }}>
                {isMatchTie ? "1" : "_"}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <div className="hiddenBoard">
        <div className="bgArea"></div>
      </div>

      <Snackbar
        style={{ opacity: "0.9" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={openNote}
        onClose={() => setOpenNote(false)}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={() => setOpenNote(false)}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      >
        <Alert severity="info" variant="filled" style={{ textAlign: "left" }}>
          Current version (v1) might not declare winner player specifically.
          Please try latest version&nbsp;
          <a href="" style={{ color: "yellow", textDecoration: "none" }}>
            here
          </a>
          &nbsp;to enjoy.
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
