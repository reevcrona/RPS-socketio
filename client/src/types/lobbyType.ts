export type LobbyData = {
  id: string;
  name: string;
  createdAt: string;
  isPrivate: boolean;
  password: string;
  playersInLobby: number;
};

export type LobbyResponse = {
  data: LobbyData[];
};
