export interface ServerToClientEvents {
  message: (message: string) => void;
  lobbyCreation: (payload: FilledLobbyData) => void;
  userJoined: (data: { socketId: string }) => void;
}

export interface ClientToServerEvents {
  message: (message: string) => void;
  lobbyCreation: (
    payload: LobbyData,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}

export interface LobbyData {
  name: string;
  isPrivate: boolean;
  password?: string;
}

export interface FilledLobbyData {
  id: string;
  name: string;
  createdAt: string;
  isPrivate: boolean;
  password: string;
  playersInLobby: number;
}
