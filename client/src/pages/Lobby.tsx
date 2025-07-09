import LobbyRoom from "../components/Lobby/LobbyRoom";
import type { User } from "../types/userType";
type LobbyProps = {
  users: User[];
};

function Lobby({ users }: LobbyProps) {
  return (
    <>
      <LobbyRoom />
      <div>
        {users.map((u) => {
          return (
            <p className="text-2xl" key={u.id}>
              {u.username}
            </p>
          );
        })}
      </div>
    </>
  );
}

export default Lobby;
