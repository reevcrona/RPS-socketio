import { eq } from "drizzle-orm";
import { db } from "../../drizzle/db";
import { lobbies } from "../../drizzle/schema";

export const lobbyExists = async (id: string): Promise<boolean> => {
  const result = await db
    .select({ id: lobbies.id })
    .from(lobbies)
    .where(eq(lobbies.id, id))
    .limit(1);

  return result.length > 0;
};
