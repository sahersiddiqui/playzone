import _ from "lodash";
import axios from "axios";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  Modal,
  SpeedDial,
  Typography,
  SpeedDialAction,
} from "@mui/material";
import { useEffect, useState } from "react";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HouseIcon from "@mui/icons-material/House";
import keyboard from "../../styles/hangman/keyboard.module.css";
import RefreshIcon from "@mui/icons-material/Refresh";
import MetaTagHangman from "../components/hangman/MetaTagHangman";
import CircularProgress from "@mui/material/CircularProgress";
import { MoreVertOutlined, ShareOutlined } from "@mui/icons-material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const style = {
  p: 4,
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  bgcolor: "background.paper",
  boxShadow: 24,
  textAlign: "center",
  "& span": {
    fontSize: 150,
    color: "#a82a1e",
  },
  "& .MuiTypography-h6": {
    color: "#a82a1e",
    fontFamily: "Eater",
  },
};

const Game = () => {
  const [word, setWord] = useState("");
  const [usedChars, setUsedChars] = useState([]);
  const [backdrop, setBackdrop] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [gameResult, setGameResult] = useState("");

  const alphabets = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
  ];
  const [definition, setDefinition] = useState("");
  const handleClick = (item) => {
    setUsedChars([...usedChars, item]);
  };

  const [wrongChars, setWrongChars] = useState(0);

  useEffect(() => {
    setShowLoading(true);
    getServerData();
  }, []);

  useEffect(() => {
    let temp = usedChars.filter((item) => !word.includes(item));
    setWrongChars(temp.length);
    if (temp.length >= 6) {
      setGameResult("lose");
      setBackdrop(true);
    } else if (
      usedChars &&
      temp &&
      word &&
      usedChars.length - temp.length ==
        Array.from(new Set(word.split(""))).length //remove duplicates
    ) {
      setGameResult("win");
      setBackdrop(true);
    }
  }, [usedChars, word]);

  const getServerData = () => {
    axios
      .get("/api/fetch-words")
      .then((resp) => {
        setWord(resp.data.word);
        setDefinition(resp.data.definition);
        setBackdrop(false);
        setUsedChars([]);
        setWrongChars(0);
        setShowLoading(false);
      })
      .catch((err) => {
        setWord("memoranda");
        setDefinition(
          "A written statement, record, or communication such as within an office"
        );
        setBackdrop(false);
        setUsedChars([]);
        setWrongChars(0);
        setShowLoading(false);
      });
  };

  const handleClose = () => {
    setShowLoading(true);
    getServerData();
  };

  const actions = [
    {
      icon: <WhatsAppIcon />,
      name: "Share",
      onClick: () => {
        window.open(
          `whatsapp://send?text=${process.env.NEXT_PUBLIC_GAME_ROOM_URL}/hangman`
        );
      },
    },
    {
      icon: <HouseIcon />,
      name: "Home",
      onClick: () => {
        window.location.href = `${process.env.NEXT_PUBLIC_GAME_ROOM_URL}`;
      },
    },
  ];

  return (
    <>
      <div className="fullBg">
        <MetaTagHangman />

        <SpeedDial
          className="SpeedDialBtnHangman"
          ariaLabel="Share hangman"
          sx={{
            position: "fixed",
            zIndex: (theme) => theme.zIndex.drawer + 2,
            bottom: 16,
            right: 30,
          }}
          direction={"up"}
          icon={<MoreVertOutlined />}
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

        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.modal + 1 }}
          open={showLoading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>

        <Modal
          disableAutoFocus={true}
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={backdrop}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{ timeout: 500 }}
        >
          <Fade in={backdrop}>
            <Box sx={style}>
              {/* &#x2620; &#128520; */}
              {gameResult == "lose" ? (
                <span>&#x1f479;</span>
              ) : (
                <span>&#128122;</span>
              )}
              <br />
              <br />
              <br />
              <Typography id="transition-modal-title" variant="h6">
                {gameResult == "lose" ? (
                  "You are hanged!"
                ) : (
                  <>
                    You have survived!
                    <br />
                    May be next time
                  </>
                )}
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  style={{ color: "#a82a1e", border: "0px solid #a82a1e" }}
                >
                  <RefreshIcon style={{ fontSize: "35px" }} />
                </Button>
              </Typography>
            </Box>
          </Fade>
        </Modal>

        <Grid container style={{ textAlign: "center", paddingTop: 50 }}>
          <Grid item xs={4} md={3}></Grid>
          <Grid item xs={4} md={1}>
            <div className={keyboard.hangmanContainer}>
              <img
                src="/images/hangman/hang-man.svg"
                alt="hangman"
                style={{ position: "relative", left: `-${100 * wrongChars}px` }}
              />
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>
              {_.map(word.toLowerCase(), (item, index) => (
                <span key={index}>
                  <span className={keyboard.word}>
                    {usedChars.includes(item) ? item : <>&nbsp;</>}
                  </span>
                  <span>&nbsp;</span>
                </span>
              ))}
            </div>
          </Grid>
          <Grid item xs={12} md={4}></Grid>
        </Grid>
        <Grid container spacing={3} className={keyboard.keyboardContainer}>
          <Grid item xs={12} md={3}></Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" className={keyboard.definition}>
              {definition}
            </Typography>
          </Grid>

          {_.map(alphabets, (alpha, index) => {
            return (
              <Grid item xs={12} md={12} key={index}>
                {_.map(alpha, (item) => (
                  <div key={item}>
                    {!usedChars.includes(item) ? (
                      <div
                        className={keyboard.keys}
                        onClick={() => handleClick(item)}
                      >
                        {item}
                      </div>
                    ) : (
                      <div className={keyboard.disableKeys}>{item}</div>
                    )}
                  </div>
                ))}
              </Grid>
            );
          })}
        </Grid>
        <br />
        <br />
        <br />
      </div>
    </>
  );
};

export default Game;
