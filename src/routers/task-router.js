const express = require('express');
const Task = require('../modules/task');
const auth = require('../middlewares/auth');
const router = new express.Router();

router.post('/tasks', auth, (req, res) => {
  Task.create({ ...req.body, owner: req.user._id }, (err, task) => {
    if (err) {
      res.status(400).send(err);
    }

    res.status(201).send(task);
  });
});

router.get('/tasks', auth, async (req, res) => {
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === 'true';
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(':');
    sort[parts[0]] = parts[1] === 'desc' ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: 'tasks',
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get('/tasks/:id', auth, async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById({ id, owner: req.user._id });
    if (!task) {
      return res.status(404).send();
    }
    res.send(task);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/tasks/:id', auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['completed', 'description'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res
      .status(400)
      .send({ error: 'The field does not exist in the tasks object' });
  }

  try {
    const task = await Task.findById({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send({ error: '404 not found task' });
    }

    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    res.send(task);
  } catch (error) {
    return res.status(500).send();
  }
});

router.delete('/tasks/:id', auth, async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    if (!task) {
      return res.status(404).send();
    }

    res.send(task);
  } catch (error) {
    return res.status(500).send(error);
  }
});

module.exports = router;
