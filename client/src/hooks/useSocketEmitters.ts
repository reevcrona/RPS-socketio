import { socket } from "../socket/socket";

export const useSocketEmitters = () => {
  const sayHelloToServer = () => {
    socket.emit("hello", "Hello from client");
  };

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
  return {
    sayHelloToServer,
    sendMessageToServer,
    createLobby,
  };
};
