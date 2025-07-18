import type { QueryClient } from "@tanstack/react-query";
import { Socket } from "socket.io-client";
import type { MessageData } from "../types/messageType";
import type { FilledLobbyData } from "@shared/socketEvents";
import { v4 as uuidv4 } from "uuid";
import type { User } from "../types/userType";
export const registerSocketListeners = (
  socket: Socket,
  queryClient: QueryClient,
  setIsConected: (val: boolean) => void,
  setUsers: (users: User[]) => void
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

  const onLobbyJoin = (users: { id: string; username: string }[]) => {
    const allUserNames = users.map((user) => user.username);
    setUsers(users);
    console.log(`Users in this room ${allUserNames}`);
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
