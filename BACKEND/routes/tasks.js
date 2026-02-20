const express = require('express');
const Task = require('../models/Task');
const requireAuth = require('../middleware/auth');

const router = express.Router();

// All task routes are protected
router.use(requireAuth);

router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ owner: req.session.userId }).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    if (!title) return res.status(400).json({ message: 'Title required' });
    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      status,
      owner: req.session.userId
    });
    res.status(201).json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, owner: req.session.userId });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const task = await Task.findOneAndUpdate({ _id: req.params.id, owner: req.session.userId }, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.session.userId });
    if (!task) return res.status(404).json({ message: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
