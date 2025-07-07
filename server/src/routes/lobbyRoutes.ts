import { Router, Request, Response } from "express";
import { db } from "../../drizzle/db";
import { lobbies } from "../../drizzle/schema";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const dblobbies = await db.select().from(lobbies);
    res.status(200).json({ data: dblobbies });
  } catch (error) {
    console.error("Failed to fetch all lobbies", error);
    res.status(500).json({
      message: "Error: Something unexpected occured while fetching lobbies.",
    });
  }
});

export default router;
