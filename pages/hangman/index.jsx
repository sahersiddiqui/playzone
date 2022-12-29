import Link from "next/link";
import { useEffect } from "react";
import { Grid, SpeedDial, SpeedDialAction, Typography } from "@mui/material";
import MetaTagHangman from "../components/hangman/MetaTagHangman";
import { MoreVertOutlined } from "@mui/icons-material";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import HouseIcon from "@mui/icons-material/House";

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  });

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
        <Grid container>
          <Grid item xs={12} md={4}>
            <img
              className="hangmanImg"
              src="/images/hangman/hangman-hd-removebg-preview.png"
            />
          </Grid>
          <Grid item xs={12} md={1}></Grid>
          <Grid item xs={12} md={6} style={{ padding: "0px" }}>
            <Typography className="heading">
              H<spna className="textDecor">a</spna>
              ng
              <spna className="textDecor">m</spna>a
              <spna className="textDecor">n</spna>
            </Typography>
            <br />
            <Typography className="content">
              Hangman is a guessing words game for players.
              <br />
              Here, program will think of a word and you have to make a guess by
              suggesting characters.
              <br />
              <br />
              <span style={{ fontSize: "1.2em", color: "#866f45" }}>
                Hint:&nbsp;
              </span>
              Start your guessing by choosing vowels (a, e, i, o, u) <br />
              <br />
              <span style={{ fontSize: "1.2em", color: "#866f45" }}>
                Support:&nbsp;
              </span>
              ** Will handle the case sensitivity for your ease.
              <br />
              ** Will disable the character which you have chosen once, to
              reduce the wrong attempts.
            </Typography>
            <br />
            <br />

            <div style={{ textAlign: "center" }}>
              <Link href="/hangman/play-game">
                <a className="playGameBtn">Play Game</a>
              </Link>
            </div>
          </Grid>
          <Grid item xs={12} md={1}></Grid>
        </Grid>
        <br />
        <br />
      </div>
    </>
  );
}
