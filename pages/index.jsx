import { Grid } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import MetaTag from "./components/tictactoe/MetaTag";

function Main() {
  const router = useRouter();

  return (
    <div className={styles.mainContainer}>
      <MetaTag />
      <div className={styles.innerContainer}>
        <Grid container>
          <Grid item xs={12} sm={3}>
            <img src="/images/logo.png" className={styles.homeLogo} />
          </Grid>
        </Grid>
        <Grid container className={styles.gameContainer}>
          <Grid
            item
            xs={3}
            style={{ backgroundColor: "#5190cf", borderColor: "#5190cf" }}
            onClick={() => router.push("/tic-tac-toe")}
          >
            <div className={styles.imageContainer}>
              <img src="/images/tictactoe.svg" />
            </div>
            <h4 className={styles.gameTitle}>Tic Tac Toe</h4>
          </Grid>
          <Grid
            item
            xs={3}
            style={{ backgroundColor: "#de4492", borderColor: "#de4492" }}
            onClick={() => router.push("/hangman")}
          >
            <div className={styles.imageContainer}>
              <img src="/images/hangman.svg" />
            </div>
            <h4 className={styles.gameTitle}>Hangman</h4>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default Main;
