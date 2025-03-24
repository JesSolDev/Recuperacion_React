const express = require('express');
const { getTasks, createTask, updateTask, changeTaskStatus, deleteTask } = require('../controllers/taskController');

const router = express.Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.put('/tasks/:id', updateTask);
router.put('/tasks/:id/status', changeTaskStatus);
router.delete('/tasks/:id', deleteTask);

module.exports = router;
