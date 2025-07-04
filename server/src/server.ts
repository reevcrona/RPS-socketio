import express from "express";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { Request, Response } from "express";
import {
  ClientToServerEvents,
  SocketData,
  InterServerEvents,
  ServerToClientEvents,
} from "@shared/socketEvents";

import { db, checkDbConnection } from "../drizzle/db";
import { users } from "../drizzle/schema";

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

// Checks database connection
checkDbConnection();

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

io.on("connection", (socket) => {
  console.log("New user connected");
  socket.emit("hello", "Hello from the server!");

  socket.on("hello", (arg) => {
    console.log(arg);
  });

  socket.on("message", (arg) => {
    io.emit("message", arg);
  });
});

io.listen(4000);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
