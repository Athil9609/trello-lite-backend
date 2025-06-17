const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'columns',
    required: true,
  },
  order: {
    type: Number, 
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tasks=mongoose.model('tasks', taskSchema);

module.exports = tasks
