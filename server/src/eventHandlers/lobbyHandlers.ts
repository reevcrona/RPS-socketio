import { Socket, Server } from "socket.io";
import { LobbyData } from "@shared/socketEvents";
import { lobbies } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
const lobbyHandler = (io: Server, socket: Socket) => {
  const createLobby = async (payload: LobbyData) => {
    try {
      const newLobby = await db
        .insert(lobbies)
        .values({
          name: payload.name,
          isPrivate: payload.isPrivate,
          password: payload.password || null,
        })
        .returning();
      console.log("New lobby successfully created!");
      return newLobby[0];
    } catch (error) {
      console.error("Failed to create lobby", error);
    }
  };

  const emitLobby = async (payload: LobbyData) => {
    try {
      const newLobby = await createLobby(payload);
      io.emit("lobbyCreation", newLobby);
    } catch (error) {
      console.error("Error emitting new lobby event", error);
    }
  };

  socket.on("lobbyCreation", emitLobby);
};

export { lobbyHandler };
