import { socket } from "../socket";
import { useState, useEffect } from "react";

const useSocket = () => {
  const [isConnected, setIsConected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      setIsConected(true);
    };

    socket.on("connect", onConnect);

    return () => {
      socket.off("connect", onConnect);
    };
  }, []);

  return { isConnected };
};

export { useSocket };
