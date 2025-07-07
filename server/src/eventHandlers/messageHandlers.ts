import { Socket, Server } from "socket.io";
import { db } from "../../drizzle/db";
import { messages } from "../../drizzle/schema";

const messageHandler = (io: Server, socket: Socket) => {
  const saveMessage = async (message: string): Promise<void> => {
    try {
      await db.insert(messages).values({ content: message });
    } catch (error) {
      console.error("Failed to save message to database", error);
    }
  };

  const emitMessage = async (message: string): Promise<void> => {
    try {
      await saveMessage(message);
      io.emit("message", message);
    } catch (error) {
      console.error("Something failed in emitMessage fucntion", error);
    }
  };

  socket.on("message", emitMessage);
};

export { messageHandler };
