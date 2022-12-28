import Link from "next/link";
import { useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import MetaTagHangsman from "../components/hangsman/MetaTagHangsman";

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 500);
  });
  return (
    <>
      <div className="fullBg">
        <MetaTagHangsman />
        <Grid container>
          <Grid item xs={12} md={4}>
            <img
              className="hangmanImg"
              src="/images/hangsman/hangman-hd-removebg-preview.png"
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
              <Link href="/hangsman/play-game">
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
