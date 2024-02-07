import PlayerList from "../components/playerlist";

export default function Page({ params }: { params: { gameid: string } }) {
  return (
    <>
      <PlayerList gameid={params.gameid} />
    </>
  );
}
