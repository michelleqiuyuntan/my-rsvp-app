const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rsvp_db'
});

db.connect(err => {
  if (err) throw err;
  console.log('MySQL connected...');
});

app.post('/names', (req, res) => {
  const { name } = req.body;
  const query = 'INSERT INTO names (name) VALUES (?)';
  db.query(query, [name], (err, result) => {
    if (err) throw err;
    res.send('Name added.');
  });
});

app.get('/names', (req, res) => {
  const query = 'SELECT name FROM names';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results.map(row => row.name));
  });
});

app.listen(5005, () => {
  console.log('Server running on port 5005');
});
