export interface ServerToClientEvents {
  hello: (message: string) => void;
  message: (message: string) => void;
}

export interface ClientToServerEvents {
  hello: (message: string) => void;
  message: (message: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  name: string;
  age: number;
}
