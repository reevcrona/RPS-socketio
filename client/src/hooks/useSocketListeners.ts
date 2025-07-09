import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { registerSocketListeners } from "../socket/clientHandlers";
import { socket } from "../socket/socket";
export const useSocketListeners = (
  setIsConnected: (value: boolean) => void,
  setMessage: (msg: String) => void
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const cleanup = registerSocketListeners(
      socket,
      queryClient,
      setMessage,
      setIsConnected
    );
    return cleanup;
  }, [queryClient]);
};
