const Task = require('../models/Task');

// Obtener todas las tareas
exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' });
    }
};

// Crear una nueva tarea
exports.createTask = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Verificar si ya existe una tarea con el mismo nombre
        const existingTask = await Task.findOne({ name });
        if (existingTask) {
            return res.status(400).json({ error: 'Ya hay una tarea con ese nombre creada' });
        }

        const newTask = new Task({ name, description });
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' });
    }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
    try {
        const { name, description } = req.body;
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, { name, description }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' });
    }
};

// Cambiar el estado de una tarea
exports.changeTaskStatus = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        task.checked = !task.checked;
        await task.save();
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error updating task status' });
    }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' });
    }
};
