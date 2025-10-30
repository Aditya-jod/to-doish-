const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Task = require('../models/Task');

// Get all tasks for the logged-in user
router.get('/', auth, async (req, res) => {
  try {
    const tasks = await Task.findAll({ where: { userId: req.user.id }, order: [['createdAt', 'DESC']] });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add a new task
router.post('/', auth, async (req, res) => {
  const { text, category } = req.body;
  try {
    const newTask = await Task.create({
      text,
      category,
      userId: req.user.id,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a task
router.put('/:id', auth, async (req, res) => {
  const { text, completed } = req.body;
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.text = text ?? task.text;
    task.completed = completed ?? task.completed;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a task
router.delete('/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    await task.destroy();
    res.json({ message: 'Task removed' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
