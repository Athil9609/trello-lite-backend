const Column = require('../Models/columnModel');

exports.createColumn = async (req, res) => {
    try {
        const { boardId, title } = req.body;

        const count = await Column.countDocuments({ boardId });

        const newColumn = new Column({
            boardId,
            title,
            order: count,         });

        await newColumn.save();
        res.status(201).json(newColumn);
    } catch (err) {
        console.error("Create Column Error:", err);
        res.status(500).json({ message: "Error creating column" });
    }
};

exports.getColumnsByBoard = async (req, res) => {
    try {
        const { boardId } = req.params;

        const columns = await Column.find({ boardId }).sort({ order: 1 });
        res.status(200).json(columns);
    } catch (err) {
        console.error("Get Columns Error:", err);
        res.status(500).json({ message: "Error fetching columns" });
    }
};

exports.updateColumn = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const updated = await Column.findByIdAndUpdate(id, { title }, { new: true });

        if (!updated) {
            return res.status(404).json({ message: "Column not found" });
        }

        res.status(200).json(updated);
    } catch (err) {
        console.error("Update Column Error:", err);
        res.status(500).json({ message: "Error updating column" });
    }
};

exports.deleteColumn = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Column.findByIdAndDelete(id);

        if (!deleted) {
            return res.status(404).json({ message: "Column not found" });
        }

        res.status(200).json({ message: "Column deleted successfully" });
    } catch (err) {
        console.error("Delete Column Error:", err);
        res.status(500).json({ message: "Error deleting column" });
    }
};

exports.reorderColumns = async (req, res) => {
    try {
        const { updates } = req.body; 

        for (const { _id, order } of updates) {
            await Column.findByIdAndUpdate(_id, { order });
        }

        res.status(200).json({ message: "Columns reordered successfully" });
    } catch (err) {
        console.error("Reorder Columns Error:", err);
        res.status(500).json({ message: "Error reordering columns" });
    }
};
