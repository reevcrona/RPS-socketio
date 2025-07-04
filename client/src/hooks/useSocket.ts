import { socket } from "../socket";
import { useState, useEffect } from "react";

const useSocket = () => {
  const [isConnected, setIsConected] = useState(socket.connected);
  const [message, setMessage] = useState<string>("");
  const [globalMessage, setGlobalMessage] = useState<string[]>([]);

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
      setGlobalMessage((prevState) => [...prevState, arg]);
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
  }, []);

  return {
    isConnected,
    message,
    sayHelloToServer,
    globalMessage,
    sendMessageToServer,
  };
};

export { useSocket };
