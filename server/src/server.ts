import express from "express";
import { createServer } from "node:http";
import { Server, Socket } from "socket.io";
import { Request, Response } from "express";
import cors from "cors";
import {
  ClientToServerEvents,
  SocketData,
  InterServerEvents,
  ServerToClientEvents,
} from "@shared/socketEvents";
import { db, checkDbConnection } from "../drizzle/db";
import { users } from "../drizzle/schema";
import { messageHandler } from "./eventHandlers/messageHandlers";
import { lobbyHandler } from "./eventHandlers/lobbyHandlers";
import { userDataHandler } from "./eventHandlers/userDataHandlers";
import messageRoutes from "./routes/messageRoutes";
import lobbyRoutes from "./routes/lobbyRoutes";

// 'app' handles routing and request processing
const app = express();

// 'server' listens for incoming network requests and passes them to 'app'
const server = createServer(app);

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});
const port = 3000;
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
// Checks database connection
checkDbConnection();
app.use("/messages", messageRoutes);
app.use("/lobby", lobbyRoutes);
app.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const myUsers = await db.select().from(users);

    console.log(myUsers);

    res.status(200).json(myUsers);
  } catch (error) {
    console.log("Failed to fetch users", error);

    res.status(500).json({ message: "Error:failed to fech users" });
  }
});

const onConnection = (socket: Socket) => {
  messageHandler(io, socket);
  lobbyHandler(io, socket);
  userDataHandler(io, socket);
};

io.on("connection", onConnection);

io.listen(4000);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
