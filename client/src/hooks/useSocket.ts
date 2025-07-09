import { socket } from "../socket";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { MessageData } from "../types/messageType";
import { v4 as uuidv4 } from "uuid";
import type { FilledLobbyData } from "@shared/socketEvents";

const useSocket = () => {
  const queryClient = useQueryClient();
  const [isConnected, setIsConected] = useState(socket.connected);
  const [message, setMessage] = useState<string>("");

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

  useEffect(() => {
    const onConnect = () => {
      setIsConected(true);
    };

    const onMessage = (arg: string) => {
      const newMessage: MessageData = {
        id: uuidv4(),
        content: arg,
        createAt: new Date().toISOString(),
      };
      queryClient.setQueryData<MessageData[]>(
        ["messages"],
        (oldMessages = []) => [...oldMessages, newMessage]
      );
    };

    const onLobbyCreation = (payload: FilledLobbyData) => {
      queryClient.setQueryData<FilledLobbyData[]>(
        ["lobbies"],
        (oldLobbies = []) => {
          const exists = oldLobbies.some((lobby) => lobby.id === payload.id);
          if (exists) return oldLobbies;
          return [...oldLobbies, payload];
        }
      );
    };

    const onLobbyJoin = ({ socketId }: { socketId: string }) => {
      console.log(`User ${socketId} joined the room`);
    };

    const onHello = (arg: string) => {
      console.log("Recived this from server", arg);
      setMessage(arg);
    };

    socket.on("connect", onConnect);
    socket.on("hello", onHello);
    socket.on("message", onMessage);
    socket.on("lobbyCreation", onLobbyCreation);
    socket.on("userJoined", onLobbyJoin);

    return () => {
      socket.off("connect", onConnect);
      socket.off("hello", onHello);
      socket.off("message", onMessage);
      socket.off("lobbyCreation", onLobbyCreation);
      socket.off("userJoined", onLobbyJoin);
    };
  }, [queryClient]);

  return {
    isConnected,
    message,
    sayHelloToServer,
    sendMessageToServer,
    createLobby,
  };
};

export { useSocket };
