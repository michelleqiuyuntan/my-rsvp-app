const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5006;

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
  name: { type: String, required: true },
});

const Name = mongoose.model('Name', nameSchema);

app.get('/api/names', async (req, res) => {
  try {
    const names = await Name.find();
    res.json(names);
  } catch (error) {
    console.error('Error fetching names:', error); // Enhanced logging
    res.status(500).json({ message: 'Error fetching names' });
  }
});

app.post('/api/names', async (req, res) => {
  try {
    const name = new Name(req.body);
    await name.save();
    res.json(name);
  } catch (error) {
    console.error('Error saving name:', error); // Enhanced logging
    res.status(500).json({ message: 'Error saving name' });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


// app.delete('/api/names/:id', async (req, res) => {
//   try {
//     const name = await Name.findById(req.params.id);

//     if (!name) {
//       return res.status(404).json({ message: 'Name not found' });
//     }

//     await name.remove();
//     res.status(200).json({ message: 'Name removed', id: req.params.id });
//   } catch (error) {
//     console.error('Error removing name:', error); // Enhanced logging
//     res.status(500).json({ message: 'Error removing name' });
//   }
// });
