import { socket } from "../socket";
import { useState, useEffect } from "react";

const useSocket = () => {
  const [isConnected, setIsConected] = useState(socket.connected);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const onConnect = () => {
      setIsConected(true);
    };

    const onHello = (arg: string) => {
      console.log("Recived this from server", arg);
      setMessage(arg);
    };

    socket.on("connect", onConnect);
    socket.on("hello", onHello);

    return () => {
      socket.off("connect", onConnect);
      socket.off("hello", onHello);
    };
  }, []);

  return { isConnected, message };
};

export { useSocket };
