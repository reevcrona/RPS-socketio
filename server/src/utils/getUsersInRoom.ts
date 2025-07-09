import { TypedServer } from "../types/socketTypes";

export const getUsersInRoom = async (roomId: string, io: TypedServer) => {
  const sockets = await io.in(roomId).fetchSockets();
  return sockets.map((s) => ({
    id: s.id,
    username: s.data.name,
  }));
};
