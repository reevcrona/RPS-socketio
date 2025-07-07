CREATE TABLE "lobbies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"maxPlayers" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
