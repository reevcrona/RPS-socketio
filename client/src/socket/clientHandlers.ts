import type { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import type { MessageData } from "../types/messageType";
import type { FilledLobbyData } from "@shared/socketEvents";
import { v4 as uuidv4 } from "uuid";
export const registerSocketListeners = (
  socket: Socket,
  queryClient: QueryClient,
  setIsConected: (val: boolean) => void
) => {
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

  const onLobbyJoin = ({
    socketId,
    userName,
  }: {
    socketId: string;
    userName: string;
  }) => {
    console.log(`User ID ${socketId} & UserName ${userName} joined the room`);
  };

  socket.on("connect", onConnect);
  socket.on("message", onMessage);
  socket.on("lobbyCreation", onLobbyCreation);
  socket.on("userJoined", onLobbyJoin);

  return () => {
    socket.off("connect", onConnect);
    socket.off("message", onMessage);
    socket.off("lobbyCreation", onLobbyCreation);
    socket.off("userJoined", onLobbyJoin);
  };
};
