import { socket } from "../socket";
import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import type { MessageData } from "../types/messageType";
import { v4 as uuidv4 } from "uuid";

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

    const onHello = (arg: string) => {
      console.log("Recived this from server", arg);
      setMessage(arg);
    };

    socket.on("connect", onConnect);
    socket.on("hello", onHello);
    socket.on("message", onMessage);

    return () => {
      socket.off("connect", onConnect);
      socket.off("hello", onHello);
      socket.off("message", onMessage);
    };
  }, [queryClient]);

  return {
    isConnected,
    message,
    sayHelloToServer,
    sendMessageToServer,
  };
};

export { useSocket };
