require("dotenv/config");
const { default: axios } = require("axios");
// const argon2 = require("argon2");
const express = require("express");
// const pg = require("pg");

// const db = new pg.Pool({
//   connectionString: process.env.DATABASE.URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

const app = express();

app.get("/messages", (req, res) => {
  res.send("is this working?");
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  process.stdout.write(`\n\nApp listening on port ${PORT}\n\n`);
});
