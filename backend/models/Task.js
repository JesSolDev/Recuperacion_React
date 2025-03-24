const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    checked: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', TaskSchema);
