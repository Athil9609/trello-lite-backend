const Column = require('../Models/columnModel');

// Create a new column
exports.createColumn = async (req, res) => {
    try {
        const { boardId, title } = req.body;

        // Count existing columns to determine next order
        const count = await Column.countDocuments({ boardId });

        const newColumn = new Column({
            boardId,
            title,
            order: count, // Next order in sequence
        });

        await newColumn.save();
        res.status(201).json(newColumn);
    } catch (err) {
        console.error("Create Column Error:", err);
        res.status(500).json({ message: "Error creating column" });
    }
};

// Get all columns for a specific board, sorted by order
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

// Update a column's title
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

// Delete a column by ID
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

// Reorder columns (for drag-and-drop)
exports.reorderColumns = async (req, res) => {
    try {
        const { updates } = req.body; // Expects: [{ _id, order }, ...]

        for (const { _id, order } of updates) {
            await Column.findByIdAndUpdate(_id, { order });
        }

        res.status(200).json({ message: "Columns reordered successfully" });
    } catch (err) {
        console.error("Reorder Columns Error:", err);
        res.status(500).json({ message: "Error reordering columns" });
    }
};
