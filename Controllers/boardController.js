const boards = require('../Models/boardModel');

exports.createBoard = async (req, res) => {
  try {
    const { name } = req.body;

    const newBoard = new boards({
      name,
      owner: req.payload, 
    });

    await newBoard.save();
    res.status(201).json(newBoard);
  } catch (err) {
    res.status(500).json({ message: 'Error creating board', error: err.message });
  }
};

exports.getBoards = async (req, res) => {
  try {
    const Boards = await boards.find({ owner: req.payload });
    res.status(200).json(Boards);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching boards', error: err.message });
  }
};

exports.getBoardById = async (req, res) => {
  try {
    const board = await boards.findOne({ _id: req.params.id, owner: req.payload });
    if (!board) return res.status(404).json({ message: 'Board not found' });

    res.status(200).json(board);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching board', error: err.message });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedBoard = await boards.findOneAndUpdate(
      { _id: req.params.id, owner: req.payload },
      { name },
      { new: true }
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: 'Board not found or not authorized' });
    }

    res.status(200).json(updatedBoard);
  } catch (err) {
    res.status(500).json({ message: 'Error updating board', error: err.message });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const board = await boards.findOneAndDelete({
      _id: req.params.id,
      owner: req.payload,
    });

    if (!board) {
      return res.status(404).json({ message: 'Board not found or not authorized' });
    }

    res.status(200).json({ message: 'Board deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting board', error: err.message });
  }
};
