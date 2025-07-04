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

app.get("/", (req: Request, res: Response): void => {
  res.send("yooole");
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
