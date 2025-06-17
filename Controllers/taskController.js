const Task = require('../Models/taskModel');

// Create a task
exports.createTask = async (req, res) => {
  try {
    const { content, columnId } = req.body;
    const newTask = await Task.create({ content, columnId });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task', details: err.message });
  }
};

// Get all tasks by column
exports.getTasksByColumn = async (req, res) => {
  try {
    const { columnId } = req.params;
    const tasks = await Task.find({ columnId }).sort({ order: 1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks', details: err.message });
  }
};

// Update a task
exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Task.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task', details: err.message });
  }
};

// Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task', details: err.message });
  }
};

// Reorder tasks across columns
exports.reorderTasks = async (req, res) => {
  try {
    const { tasksByColumn } = req.body;

    for (const column of tasksByColumn) {
      const { columnId, taskIds } = column;

      for (let i = 0; i < taskIds.length; i++) {
        await Task.findByIdAndUpdate(taskIds[i], {
          columnId,
          order: i,
        });
      }
    }

    res.status(200).json({ message: "Tasks reordered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to reorder tasks", details: err.message });
  }
};
