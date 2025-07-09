import { Socket, Server } from "socket.io";

const userDataHandler = (io: Server, socket: Socket) => {
  const updateSocketData = (
    userName: string,
    callback?: (response: { status: "ok" | "error"; message?: string }) => void
  ) => {
    socket.data.name = userName;
    if (callback) {
      return callback({ status: "ok", message: `${socket.data.name}` });
    }
  };
  socket.on("setUserData", updateSocketData);
};

export { userDataHandler };
