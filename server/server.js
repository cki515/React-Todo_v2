const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config({ path: ".env.local" });

const app = express();

app.use(express.json());
app.use(cors()); // All Requests

const port = process.env.PORT || 4000;

// only option Requests
var corsOptions = {
  origin: "http://google.com",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
// app.use(cors(corsOptions));

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Select All
app.get("/:user_code/todos", async (req, res) => {
  const { user_code } = req.params;
  const [todoRows] = await pool.query(
    `
    SELECT *
    FROM TODO
    WHERE user_code = ?
    ORDER BY id DESC
    `,
    [user_code]
  );

  res.json({
    resultCode: "s-1",
    msg: "success",
    data: todoRows,
  });
});

// Select one
app.get("/:user_code/todos/:no", async (req, res) => {
  const { user_code, no } = req.params;
  const [[todoRow]] = await pool.query(
    `
    SELECT *
    FROM TODO
    WHERE user_code = ?
    AND no = ?
    `,
    [user_code, no]
  );

  if (todoRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "Page is not found",
    });
    return;
  }

  res.json({
    resultCode: "s-1",
    msg: "success",
    data: todoRow,
  });
});

// Delete
app.delete("/:user_code/todos/:no", async (req, res) => {
  const { user_code, no } = req.params;
  const [[todoRow]] = await pool.query(
    `
    SELECT *
    FROM TODO
    WHERE user_code = ?
    AND no = ?
    `,
    [user_code, no]
  );

  if (todoRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "Page is not found",
    });
    return;
  }

  await pool.query(
    `
    DELETE FROM TODO
    WHERE user_code = ?
    AND no = ?
    `,
    [user_code, no]
  );

  res.json({
    resultCode: "s-1",
    msg: `Deleted No.${no} todo`,
  });
});

// INSERT
app.post("/:user_code/todos", async (req, res) => {
  const { user_code } = req.params;
  const { content, perform_date, is_completed } = req.body;

  if (!content) {
    res.status(400).json({
      resultCode: "F-2",
      msg: "content required.",
    });
    return;
  }

  if (!perform_date) {
    res.status(400).json({
      resultCode: "F-3",
      msg: "perform_date required.",
    });
    return;
  }

  const [[lateTodoRows]] = await pool.query(
    `
    SELECT no
    FROM TODO
    WHERE user_code = ?
    ORDER BY id DESC
    LIMIT 1
    `,
    [user_code]
  );

  const no = lateTodoRows?.no + 1 || 1;
  const [insertTodoRs] = await pool.query(
    `
    INSERT INTO TODO
    SET reg_date = NOW(),
    update_date = NOW(),
    user_code = ?,
    no = ?,
    content = ?,
    perform_date = ?,
    is_completed = ?
    `,
    [user_code, no, content, perform_date, is_completed]
  );

  const [[lastCreateTodoRow]] = await pool.query(
    `
    SELECT *
    FROM TODO
    WHERE id = ?
    `,
    [insertTodoRs.insertId]
  );

  res.json({
    resultCode: "S-1",
    msg: `CREATE NO.${lastCreateTodoRow.id} TODO`,
    data: lastCreateTodoRow,
  });
});

// UPDATE
app.patch("/:user_code/todos/:no", async (req, res) => {
  const { user_code, no } = req.params;

  const [[todoRow]] = await pool.query(
    `
    SELECT *
    FROM TODO
    WHERE user_code = ?
    AND no = ?
    `,
    [user_code, no]
  );

  if (todoRow === undefined) {
    res.status(404).json({
      resultCode: "F-1",
      msg: "Page is not found",
    });
    return;
  }

  const {
    content = todoRow.content,
    perform_date = todoRow.perform_date,
    is_completed = todoRow.is_completed,
  } = req.body;

  await pool.query(
    `
    UPDATE TODO
    SET update_date = NOW(),
    content = ?,
    perform_date = ?,
    is_completed = ?
    WHERE user_code = ?
    AND no = ?
    `,
    [content, perform_date, is_completed, user_code, no]
  );

  const [[updateTodoRow]] = await pool.query(
    `
    SELECT *
    FROM TODO
    WHERE user_code = ?
    AND no = ?
    `,
    [user_code, no]
  );

  res.json({
    resultCode: "S-1",
    msg: `UPDATE NO.${updateTodoRow.id} TODO`,
    data: updateTodoRow,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
