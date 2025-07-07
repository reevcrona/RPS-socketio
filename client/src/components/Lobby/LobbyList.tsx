import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { LobbyResponse } from "../../types/lobbyType";
import LobbyTile from "./LobbyTile";
const fetchLobbies = async () => {
  const response = await axios.get<LobbyResponse>(
    "http://localhost:3000/lobby"
  );
  console.log(response.data.data);

  return response.data.data;
};

function LobbyList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lobbies"],
    queryFn: fetchLobbies,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <>
      {data &&
        data.map((lobby) => (
          <LobbyTile
            key={lobby.id}
            name={lobby.name}
            playerInLobby={lobby.playersInLobby}
            status="Active"
          />
        ))}
    </>
  );
}

export default LobbyList;
