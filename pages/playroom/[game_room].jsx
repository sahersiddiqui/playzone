import io from "socket.io-client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const socket = io.connect("https://playzone-server.herokuapp.com/");

function GameRoom() {
  const router = useRouter();
  const { game_room } = router.query;

  // Room State
  let counter = 0;
  const [room, setRoom] = useState("");

  // Messages States
  const [message, setMessage] = useState([]);
  const [errorMesg, setErrorMesg] = useState("");
  const [currMesg, setCurrMesg] = useState({ user: "", mesg: "" });

  useEffect(() => {
    let game_id = game_room
      ? game_room
      : window.location.pathname.split("/").reverse().filter(Boolean)[0];
    setRoom(game_id);

    debugger;
    if (game_id && counter < 1) {
      counter++;
      socket.emit("join_room", game_id);
    }

    socket.on("join_room", (data) => {
      if (!data) setErrorMesg("Play room is full!");
    });

    socket.on(`broadcast_message`, (data) => {
      setMessage([...message, data]);
    });
  }, []);

  const sendMessage = () => {
    if (!errorMesg) socket.emit("send_message", { data: currMesg, room });
    else
      setErrorMesg(
        `${errorMesg}<br/> Someone is already playing game with your friend.`
      );
    setCurrMesg({ user: "", mesg: "" });
  };

  return (
    <div className="App">
      <div className="App-header">
        <div>
          {errorMesg}

          {room ? (
            <>
              <p>You're now connected to room: {room}</p>
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
              setCurrMesg({ user: "username", mesg: event.target.value })
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
