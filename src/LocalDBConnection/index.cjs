
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();
const port = 3000;

const cors = require("cors");
const corsOptions = {
  origin: '*',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(express.json())
app.use(cors(corsOptions));
// Connect to the SQLite database
const dbPath = path.resolve(__dirname, './users.db');

const db = new sqlite3.Database(dbPath, (err) => {
  console.log("path", dbPath)
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});

// Middleware to parse JSON requests
app.use(express.json());
// Example route to get all rows from a table
app.get('/data', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Example route to get a specific row by id
app.post('/getAddress', (req, res) => {
  console.log("body", req.body)
  const { id } = req.body;
  const sql = `select * from address where id= ?`;

  db.all(sql, [id], function (err, rows) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: rows
    });
  });
});

// Example route to add a new row
app.post('/users', (req, res) => {
  console.log("body", req.body)
  const { uname, password, name, address, id } = req.body;
  const sql = 'INSERT INTO Users (id, name) VALUES (?, ?)';

  db.run(sql, [id, name], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { id: this.lastID }
    });
  });
});





app.post('/userdata', (req, res) => {
  const { uname, password, name, address, id, date } = req.body;

  const sql = 'INSERT INTO Address (username,address,id,date) VALUES (?, ?,?,?)';
  db.run(sql, [uname, address, id, date], function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { id: this.lastID }
    });
  });
});
// Example route to update a row


// Example route to delete a row
app.delete('/data/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM tableName WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: { changes: this.changes }
    });
  });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the process ends
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
