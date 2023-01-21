CREATE DATABASE personalProjOne;

CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	username TEXT UNIQUE NOT NULL,
	email TEXT NOT NULL,
	hashedPassword TEXT NOT NULL,
	joinedAt TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
	commentId SERIAL PRIMARY KEY,
	userId INT NOT NULL,
	username TEXT NOT NULL,
	comments TEXT NOT NULL,
	commentedAt TEXT NOT NULL,
	FOREIGN KEY(userId)
		REFERENCES users(userId),
	FOREIGN KEY(username)
		REFERENCES users(username)
);

CREATE TABLE visits (
	visitId SERIAL PRIMARY KEY,
	totalVisits INT NOT NULL,
	todayVisits INT NOT NULL,
	currentDate TEXT NOT NULL
);
