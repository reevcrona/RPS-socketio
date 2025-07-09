import { socket } from "../socket/socket";

export const useSocketEmitters = () => {
  const sendMessageToServer = (userMessage: string) => {
    socket.emit("message", userMessage);
  };

  const createLobby = (
    lobbyData: any
  ): Promise<{ status: "ok" | "error"; message?: string }> => {
    return new Promise((resolve, reject) => {
      if (!socket) {
        reject(new Error("Socket not connected"));
        return;
      }

      socket.emit(
        "lobbyCreation",
        lobbyData,
        (response: { status: "ok" | "error"; message?: string }) => {
          if (response.status === "ok") {
            resolve(response);
          } else {
            reject(new Error(response.message || "Unknown error"));
          }
        }
      );
    });
  };

  const joinLobby = (
    lobbyId: string
  ): Promise<{ status: "ok" | "error"; message?: string }> => {
    return new Promise((resolve, reject) => {
      if (!socket) {
        reject(new Error("Socket not connected"));
        return;
      }
      socket.emit(
        "joinLobby",
        lobbyId,
        (response: { status: "ok" | "error"; message?: string }) => {
          if (response.status === "ok") {
            resolve(response);
          } else {
            reject(new Error(response.message || "Unknown error"));
          }
        }
      );
    });
  };

  return {
    sendMessageToServer,
    createLobby,
    joinLobby,
  };
};
