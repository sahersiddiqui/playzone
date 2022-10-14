import { useRouter } from "next/router";

function GameRoomIndex() {
  const router = useRouter();
  const { game_room } = router.query;
  console.log(game_room);

  return <>Hello Dude! This is game room index.</>;
}
export default GameRoomIndex;
