require("dotenv/config");
const argon2 = require("argon2");
const express = require("express");
const pg = require("pg");
const jwt = require("jsonwebtoken");

// const db = new pg.Pool({
//   connectionString: process.env.DATABASE.URL,
//   ssl: {
//     rejectUnauthorized: false,
//   },
// });

const db = new pg.Pool({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: process.env.PG_PSW,
  database: "personalProjOne",
});

// const db = knex({
//   client: "pg",
//   connection: {
//     host: "127.0.0.1",
//     port: 5432,
//     user: "postgres",
//     password: process.env.PG_PSW,
//     database: "personalProjOne",
//   },
// });

const app = express();

app.use(express.json());

app.get("/messages", (req, res) => {
  res.send("is this working?");
});

app.post("/register", (req, res) => {
  const { username, email, password } = req.body;

  if (!username) {
    // throw new ClientError(400, 'Username is a required field');
    res.send("Username is a required field");
    console.log("Username is a required field");
  } else if (!email) {
    // throw new ClientError(400, 'E-mail is a required field');
    res.send("E-mail is a required field");
    console.log("E-mail is a required field");
  } else if (!password) {
    // throw new ClientError(400, 'Password is a required fields');
    res.send("Password is a required field");
    console.log("Password is a required field");
  }

  argon2
    .hash(password)
    .then((hashedpassword) => {
      const sql = `
        INSERT INTO "users" ("username", "email", "hashedpassword")
        VALUES              ($1, $2, $3)
        ON CONFLICT         ("username") DO NOTHING
        RETURNING "userid", "username", "email", "joinedat"
      `;

      const params = [username, email, hashedpassword];
      return db.query(sql, params);
    })
    .then((result) => {
      if (result.rows.length === 0) {
        // throw new UsernameError(409, 'Username is already taken');
        console.log("Username is already taken");
        res.status(409).json({ error: "Username taken" });
      } else {
        const [user] = result.rows;
        res.status(201).json(user);
      }
    })
    .catch((err) => console.log(err));
});

app.post("/sign-in", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    // throw new ClientError(401, 'Invalid login');
    res.send("Invalid login");
    console.log("Invalid login");
  }

  const sql = `
    SELECT "userid",
           "hashedpassword"
    FROM   "users"
    WHERE  "username" = $1
  `;

  const params = [username];
  db.query(sql, params)
    .then((result) => {
      const [user] = result.rows;
      if (!user) {
        // throw new ClientError(401, 'Invalid Login');
        console.log("Invalid Login");
        res.status(401).json({ error: "Invalid Login" });
      }
      const { userid, hashedpassword } = user;
      return argon2.verify(hashedpassword, password).then((isMatching) => {
        if (!isMatching) {
          // throw new ClientError(401, 'Invalid login');
          console.log("Invalid Login");
          res.status(401).json({ error: "Invalid Login" });
        }
        const payload = { userid, username };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET);
        res.json({ token, user: payload });
      });
    })
    .catch((err) => console.error(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  process.stdout.write(`\n\nApp listening on port ${PORT}\n\n`);
});
