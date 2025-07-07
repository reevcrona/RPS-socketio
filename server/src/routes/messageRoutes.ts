import { Router, Request, Response } from "express";
import { db } from "../../drizzle/db";
import { messages } from "../../drizzle/schema";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const dbMessages = await db.select().from(messages);
    res.status(200).json({ data: dbMessages });
  } catch (error) {
    console.error("Failed to fetch all messages", error);
    res.status(500).json({ message: "Error" });
  }
});

export default router;
