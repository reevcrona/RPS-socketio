import { io, Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "@shared/socketEvents";
const URL = "http://localhost:4000";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(URL);
