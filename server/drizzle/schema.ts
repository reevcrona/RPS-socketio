import {
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  integer,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messages = pgTable("messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  content: text("content").notNull(),
  createAt: timestamp("created_at").defaultNow().notNull(),
});

export const lobbies = pgTable("lobbies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  playersInLobby: integer("players_in_lobby").default(0),
  isPrivate: boolean().notNull(),
  password: text("password"),
  createAt: timestamp("created_at").defaultNow().notNull(),
});
