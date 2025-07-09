import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { registerSocketListeners } from "../socket/clientHandlers";
import { socket } from "../socket/socket";
export const useSocketListeners = (
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const cleanup = registerSocketListeners(
      socket,
      queryClient,
      setIsConnected
    );
    return cleanup;
  }, [queryClient]);
};
