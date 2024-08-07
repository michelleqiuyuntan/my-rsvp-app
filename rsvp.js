const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/rsvp')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('Error connecting to MongoDB', err);
  });

const nameSchema = new mongoose.Schema({
  name: String,
});

const Name = mongoose.model('Name', nameSchema);

app.get('/api/names', async (req, res) => {
  const names = await Name.find();
  res.json(names);
});

app.post('/api/names', async (req, res) => {
  const name = new Name(req.body);
  await name.save();
  res.json(name);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});