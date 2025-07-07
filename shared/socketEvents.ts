export interface ServerToClientEvents {
  hello: (message: string) => void;
  message: (message: string) => void;
  lobbyCreation: (payload: string) => void;
}

export interface ClientToServerEvents {
  hello: (message: string) => void;
  message: (message: string) => void;
  lobbyCreation: (payload: LobbyData) => void;
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
