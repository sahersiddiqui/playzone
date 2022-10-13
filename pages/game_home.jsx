import { useRouter } from "next/router";

function GameHome() {
  const router = useRouter();

  const joinRoom = () => {
    let roomId = Math.random().toString(36).slice(2);
    router.push(`playroom/${roomId}`);
  };

  return (
    <div className="App">
      <div className="App-header">
        <div>
          <p>Click to join the Game</p>
          <button style={{ padding: "8px" }} onClick={joinRoom}>
            Play Game
          </button>
        </div>
        <br />
      </div>
    </div>
  );
}

export default GameHome;
