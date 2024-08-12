const Todo = require('../models/rsvp3');

const setTodo = asyncHanlder(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please add text field');
  }
  const todo = await Todo.create({
    text: req.body.text,
  });
  res.status(200).json(todo);
})