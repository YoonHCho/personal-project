CREATE DATABASE personalProjOne;

CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	email TEXT NOT NULL,
	hashedPassword TEXT NOT NULL,
	joinedAt TIMESTAMPTZ NOT NULL default now()
);

CREATE TABLE comments (
	commentId SERIAL PRIMARY KEY,
	userId INT NOT NULL,
	comments TEXT NOT NULL,
	commentedAt TIMESTAMPTZ NOT NULL default now(),
	FOREIGN KEY(userId)
		REFERENCES users(userId)
);




-- set client_min_messages to warning;

-- -- DANGER: this is NOT how to do it in the real world.
-- -- `drop schema` INSTANTLY ERASES EVERYTHING.
-- drop schema "public" cascade;

-- create schema "public";

-- CREATE TABLE "public"."users" (
-- 	"userId" serial NOT NULL,
-- 	"username" TEXT NOT NULL UNIQUE,
-- 	"email" TEXT NOT NULL,
-- 	"hashedPassword" TEXT NOT NULL,
-- 	"joinedAt" timestamptz NOT NULL,
-- 	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
-- ) WITH (
--   OIDS=FALSE
-- );

-- CREATE TABLE "public"."comments" (
-- 	"commentId" serial NOT NULL,
-- 	"userId" int NOT NULL,
-- 	"content" TEXT NOT NULL,
-- 	"commentedAt" timestamptz NOT NULL,
-- 	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
-- ) WITH (
--   OIDS=FALSE
-- );

-- ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
