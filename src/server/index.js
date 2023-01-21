require("dotenv/config");
const argon2 = require("argon2");
const express = require("express");
const pg = require("pg");
const jwt = require("jsonwebtoken");

// const db = new pg.Pool({
//   host: "127.0.0.1",
//   port: 5432,
//   user: "postgres",
//   password: process.env.PG_PSW,
//   database: "personalProjOne",
//   connectionString: process.env.DATABASE_URL,
// });
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();

app.use(express.json());

app.get("/total", (req, res) => {
  const sql = `
    SELECT *
    FROM   "visits"
    WHERE  "visitid" = 1
  `;

  db.query(sql).then((result) => {
    res.status(200).json(result.rows[0]);
  });
});

app.put("/total/:num", (req, res) => {
  const num = Number(req.params.num);

  const sql = `
    UPDATE "visits"
    SET    "totalvisits" = ($1)
    WHERE  "visitid" = 1
  `;

  const params = [num];

  db.query(sql, params).then((result) => {
    if (!result) {
      console.log("Something went wrong");
    } else {
      res.sendStatus(201);
    }
  });
});

app.put("/today/:num", (req, res) => {
  const num = req.params.num;

  const sql = `
    UPDATE "visits"
    SET    "todayvisits" = ($1)
    WHERE  "visitid" = 1
  `;

  const params = [num];
  db.query(sql, params).then((result) => {
    if (!result) {
      console.log("Something went wrong");
    } else {
      res.sendStatus(201);
    }
  });
});

app.put("/today/date/:num", (req, res) => {
  const todayvisits = Number(req.params.num);
  const { currentdate } = req.body;

  const sql = `
    UPDATE "visits"
    SET    "todayvisits" = ($1),
           "currentdate" = ($2)
    WHERE  "visitid" = 1
  `;

  const params = [todayvisits, currentdate];
  db.query(sql, params)
    .then((result) => {
      if (!result) {
        console.log("Something went wrong");
      } else {
        res.sendStatus(201);
      }
    })
    .catch((err) => {
      console.log("Something went wrong", err);
    });
});

app.get("/messages/posts", (req, res) => {
  const sql = `
    SELECT * 
    FROM "comments"
    ORDER BY "commentedat" DESC;
  `;

  db.query(sql)
    .then((result) => {
      if (!result) {
        console.log("no result");
      }
      res.status(200).send(result.rows);
    })
    .catch((err) => console.log("error in getting GET request", err));
});

app.get("/messages/users", (req, res) => {
  const sql = `
    SELECT count(*)
    FROM   "users"
  `;

  db.query(sql).then((result) => {
    if (!result) {
      console.log("no result");
    }
    res.status(200).send(result.rows[0]);
  });
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
    res.status(401).send("Invalid login");
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
      } else {
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
      }
    })
    .catch((err) => console.error(err));
});

app.post("/messages", (req, res) => {
  const { userid, username, comments, commentedat } = req.body;
  if (!comments || !commentedat) {
    // throw new ClientError(406, 'Mesage is a required field');
    console.log("Mesage is a required field");
    res.status(401).send("Mesage is a required field");
  } else if (!userid || !username) {
    // throw new ClientError(404, 'Not logged in');
    console.log("Not logged in");
    res.status(404).send("Not logged in");
  }

  const sql = `
    INSERT INTO "comments" ("userid", "username", "comments", "commentedat")
    VALUES                 ($1, $2, $3, $4)
    RETURNING *;
  `;

  const params = [userid, username, comments, commentedat];
  db.query(sql, params).then((result) => {
    const [userMessage] = result.rows;
    if (!userMessage) {
      // throw new ClientError(401, 'Invalid userMessage');
      console.log("Invalid userMessage");
      res.status(401).json({ error: "Invalid userMessage" });
    }
    res.status(201).json(userMessage);
  });
});

app.delete("/messages/delete/:commentid", (req, res) => {
  const commentid = Number(req.params.commentid);

  if (!commentid || typeof commentid !== "number") {
    // throw new ClientError(404, 'Select a post to delete');
    console.log("Select a post to delete");
    res.status(404).send("Select a post to delete");
  }

  const sql = `
    DELETE FROM "comments"
    WHERE       "commentid" = ($1)
    RETURNING *;
  `;

  const params = [commentid];
  db.query(sql, params).then((result) => {
    if (!result) {
      // throw new ClientError(401, 'No message to delete');
      console.log("No message to delete");
      res.status(401).json({ error: "No message to delete" });
    } else {
      res.sendStatus(204);
    }
  });
});

app.put("/messages/edit/:commentid", (req, res) => {
  const commentid = Number(req.params.commentid);
  const { comments, userid } = req.body;

  if (!commentid || typeof commentid !== "number") {
    // throw new ClientError(404, 'Select a post to delete');
    console.log("Select a post to delete");
    res.status(404).send("Select a post to delete");
  } else if (!comments || !userid) {
    // throw new ClientError(406, 'Mesage is a required field');
    console.log("Mesage is a required field");
    res.status(401).send("Mesage is a required field");
  }

  const sql = `
    UPDATE "comments"
    SET "comments" = ($1)
    WHERE "commentid" = ($2)
    AND   "userid" = ($3)
  `;

  const params = [comments, commentid, userid];
  db.query(sql, params)
    .then((result) => {
      const [updatedContent] = result.rows;
      if (!result) {
        // throw new ClientError(404, 'Something went wrong');
        console.log("Something went wrong");
        res.status(404).send("Something went wrong");
      } else {
        res.status(201).json(updatedContent);
      }
    })
    .catch((err) => console.log(err));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  process.stdout.write(`\n\nApp listening on port ${PORT}\n\n`);
});
