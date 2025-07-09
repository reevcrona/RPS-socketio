export interface ServerToClientEvents {
  message: (message: string) => void;
  lobbyCreation: (payload: FilledLobbyData) => void;
  userJoined: (users: { id: string; username: string }[]) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
  lobbyCreation: (
    payload: LobbyData,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => void;
  joinLobby: (
    lobbyId: string,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => void;
  setUserData: (
    name: string,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
  lobbyId: string;
}

export interface LobbyData {
  name: string;
  isPrivate: boolean;
  password?: string;
}

export interface FilledLobbyData {
  id: string;
  name: string;
  createdAt: Date;
  isPrivate: boolean;
  password: string | null;
  playersInLobby: number | null;
}
