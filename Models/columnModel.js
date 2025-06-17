const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'boards',
    required: true,
  },
  order: {
    type: Number, 
    default: 0,
  }
},{
  timestamps: true 
});

columnSchema.index({ boardId: 1, order: 1 });

const columns= mongoose.model('columns', columnSchema);
module.exports =columns
