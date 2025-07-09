import { Socket, Server } from "socket.io";
import { LobbyData } from "@shared/socketEvents";
import { lobbies } from "../../drizzle/schema";
import { db } from "../../drizzle/db";
import { lobbyExists } from "../utils/checkLobbyExists";
const lobbyHandler = (io: Server, socket: Socket) => {
  const createLobby = async (payload: LobbyData) => {
    try {
      const newLobby = await db
        .insert(lobbies)
        .values({
          name: payload.name,
          isPrivate: payload.isPrivate,
          password: payload.password || null,
          playersInLobby: 0,
        })
        .returning();
      console.log("New lobby successfully created!");
      return newLobby[0];
    } catch (error) {
      console.error("Failed to create lobby", error);
    }
  };

  const respond = (
    callback:
      | ((res: { status: "ok" | "error"; message?: string }) => void)
      | undefined,
    response: { status: "ok" | "error"; message?: string }
  ) => {
    if (callback) callback(response);
  };

  const emitLobby = async (
    payload: LobbyData,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => {
    try {
      const newLobby = await createLobby(payload);
      if (!newLobby) {
        return respond(callback, {
          status: "error",
          message: "Failed to create lobby",
        });
      }
      io.emit("lobbyCreation", newLobby);
      socket.join(newLobby.id);
      io.to(newLobby.id).emit("userJoined", { socketId: socket.id });
      return respond(callback, { status: "ok" });
    } catch (error) {
      console.error("Error emitting new lobby event", error);
      return respond(callback, {
        status: "error",
        message: "Internal server error",
      });
    }
  };

  const joinLobby = async (
    lobbyId: string,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => {
    try {
      const exists = await lobbyExists(lobbyId);

      if (!exists) {
        return respond(callback, {
          status: "error",
          message: "Lobby did not exist.",
        });
      }
      socket.join(lobbyId);
      io.to(lobbyId).emit("userJoined", { socketId: socket.id });
      return respond(callback, { status: "ok" });
    } catch (error) {
      console.error("Error joining lobby.", error);
      return respond(callback, {
        status: "error",
        message: "Internal server error",
      });
    }
  };

  socket.on("joinLobby", joinLobby);
  socket.on("lobbyCreation", emitLobby);
};

export { lobbyHandler };
