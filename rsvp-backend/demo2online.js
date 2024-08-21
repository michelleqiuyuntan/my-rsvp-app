const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3004;

app.use(express.json()); // To parse JSON bodies
app.use(express.urlencoded({ extended: true })); // To parse URL-encoded bodies
app.use(cors());

const connection = mysql.createConnection({
  host: 'database-2.czes8oygqqoo.us-east-2.rds.amazonaws.com',  // e.g., mydbinstance.123456789012.us-east-1.rds.amazonaws.com
  user: 'admin',      // e.g., admin
  password: 'FluffysRDS!',  // Your RDS password
  database: 'your_database_name', // Your database name
  port: 3306  // Default MySQL port
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

// Optional: API endpoint to test the connection
app.get('/api/test', (req, res) => {
  connection.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      res.status(500).send('Error executing query');
      return;
    }
    res.status(200).json(results);
  });
});

app.listen(port, () => {
  const host = process.env.HOST || 'localhost';
  const publicIp = 'ec2-3-18-233-28.us-east-2.compute.amazonaws.com/'; // Replace with your EC2 public IP or DNS
  console.log(`Server running on http://${host}:${port} (access externally via http://${publicIp}:${port}) and connected to RDS`);
});
