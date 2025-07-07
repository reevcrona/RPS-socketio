import { Socket, Server } from "socket.io";
import { LobbyData } from "@shared/socketEvents";
import { lobbies } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
const lobbyHandler = (io: Server, socket: Socket) => {
  const createLobby = async (payload: LobbyData) => {
    try {
      await db.insert(lobbies).values(payload);
    } catch (error) {
      console.error("Failed to create lobby", error);
    }
  };
  socket.on("lobbyCreation", createLobby);
};

export { lobbyHandler };
