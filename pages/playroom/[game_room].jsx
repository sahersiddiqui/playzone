import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Backdrop, CircularProgress } from "@mui/material";

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

function GameRoom() {
  const router = useRouter();
  const { game_room } = router.query;

  // Room State
  let counter = 0;
  const [room, setRoom] = useState("");
  const [backdropState, setBackdropState] = useState(true);

  // Messages States
  const [message, setMessage] = useState([]);
  const [errorMesg, setErrorMesg] = useState("");
  const [username, setUsername] = useState(
    `player_${Math.random().toString(36).slice(8)}`
  );
  const [currMesg, setCurrMesg] = useState({ user: "", mesg: "" });

  useEffect(() => {
    let room_id = game_room
      ? game_room
      : window.location.pathname.split("/").reverse().filter(Boolean)[0];

    setRoom(room_id);

    // Letting user join the room only once
    if (room_id && counter < 1) {
      counter++;
      socket.emit("join_room", { room_id, username });
    }

    // Room users max limit reach exception handling
    socket.on("join_room", (data) => {
      if (!data) setErrorMesg("Play room is full!");
    });

    // Receiving data from server
    socket.on(`broadcast_message`, (data) => {
      setMessage([...message, data]);
    });

    // Handle game board enable/disable scenario
    socket.on(`enable_gameboard`, () => {
      setBackdropState(false);
    });
    socket.on(`disable_gameboard`, () => {
      setBackdropState(true);
    });
  }, []);

  const sendMessage = () => {
    if (!errorMesg) socket.emit("send_message", { data: currMesg, room });
    setCurrMesg({ user: "", mesg: "" });
  };

  return (
    <div className="App">
      <div className="App-header">
        <Backdrop
          open={backdropState}
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <div>
          {errorMesg}

          {room ? (
            <>
              <p>You are now connected to room: {room}</p>
            </>
          ) : (
            <></>
          )}
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <textarea
            rows={3}
            cols={50}
            value={currMesg.mesg}
            style={{ resize: "none" }}
            onChange={(event) =>
              setCurrMesg({
                user: username,
                mesg: event.target.value,
              })
            }
          />
          <button onClick={() => sendMessage()} style={{ padding: "8px" }}>
            Send
          </button>
        </div>

        <h1> Message:</h1>
        <div>
          {message.map((item, key) => {
            return <div key={key}>{item.mesg}</div>;
          })}
        </div>
      </div>
    </div>
  );
}
export default GameRoom;
