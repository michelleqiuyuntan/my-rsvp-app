const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3004;

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'myuser',
  password: 'Fluffycodes12024!',
  database: 'your_database_name'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database with ID', connection.threadId);
});


// API endpoint to add a name
app.post('/api/names', (req, res) => {
  const { name } = req.body;
  console.log('Received name:', name); // Log the received name
  const query = 'INSERT INTO names_list (name) VALUES (?)';
  connection.query(query, [name], (err, results) => {
    if (err) {
      console.error('Error inserting name:', err.stack);
      res.status(500).send('Error inserting name');
      return;
    }
    console.log('Inserted name with ID:', results.insertId); // Log the inserted ID
    res.status(200).send({ id: results.insertId, name });
  });
});

// API endpoint to get all names
app.get('/api/names', (req, res) => {
  const query = 'SELECT * FROM names_list';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching names:', err.stack);
      res.status(500).send('Error fetching names');
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
