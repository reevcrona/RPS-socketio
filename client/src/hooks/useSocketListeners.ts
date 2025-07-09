import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { registerSocketListeners } from "../socket/clientHandlers";
import { socket } from "../socket/socket";
export const useSocketListeners = (
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
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
