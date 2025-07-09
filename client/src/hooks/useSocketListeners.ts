import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { registerSocketListeners } from "../socket/clientHandlers";
import { socket } from "../socket/socket";
import type { User } from "../types/userType";
export const useSocketListeners = (
  setIsConnected: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<User[]>>
) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const cleanup = registerSocketListeners(
      socket,
      queryClient,
      setIsConnected,
      setUser
    );
    return cleanup;
  }, [queryClient]);
};
