require("dotenv/config");
const { default: axios } = require("axios");
const argon2 = require("argon2");
const express = require("express");
const pg = require("pg");
const { knex } = require("knex");
const { bcrypt } = require("bcrypt");

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

app.post("/", (req, res) => {
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
    res.send("Password is a required fields");
    console.log("Password is a required fields");
  }

  // ********* if pg.pool works delete
  // const hash = bcrypt.hashSync(password);
  // db.transaction((trx) => {
  //   trx
  //     .insert({
  //       username: username,
  //       email: email,
  //       hashedpassword: hash,
  //     })
  //     .into("users")
  //     .returning("username", "email", "joinedat");
  // });

  // ******************************************************************************************

  // ************* MAY NOT NEED ARGON2 ***********
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
        // throw new UsernameError(400, 'Username is already taken');
        console.log("User name is already taken");
      }
      const [user] = result.rows;
      res.status(201).json(user);
    })
    .catch((err) => console.log(err));

  // res.send(password);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  process.stdout.write(`\n\nApp listening on port ${PORT}\n\n`);
});
