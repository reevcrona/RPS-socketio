type LobbyTileProps = {
  name: string;
  id: string;
  playerInLobby: number;
  status: "Active" | "Full";
};
import { useSocketEmitters } from "../../hooks/useSocketEmitters";
import { useNavigate } from "react-router-dom";
function LobbyTile({ name, playerInLobby, status, id }: LobbyTileProps) {
  const { joinLobby } = useSocketEmitters();
  const navigate = useNavigate();
  const handleJoinLobby = async () => {
    try {
      await joinLobby(id);
      navigate(`/lobby/${id}`);
    } catch (error) {
      console.error("Failed to join lobby", error);
    }
  };

  return (
    <div className="bg-white text-black w-full justify-between max-w-[300px] min-h-[120px] flex flex-col p-4">
      <h2 className="font-bold text-xl">{name}</h2>
      <div className="flex justify-between">
        <h3>Players {playerInLobby}/2</h3>
        <div className="bg-green-500 px-3 py-1">
          <h3>{status}</h3>
        </div>
      </div>
      <p>Connected: Player123</p>
      <div className="flex items-center justify-center ">
        <button
          onClick={handleJoinLobby}
          className="bg-green-500 cursor-pointer mt-3 w-full max-w-[150px] rounded-lg p-1 text-lg"
        >
          Join Lobby
        </button>
      </div>
    </div>
  );
}

export default LobbyTile;
