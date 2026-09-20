const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {createTask, getTask ,getTaskByid, updateTaskById,  deleteTaskById} = require("../controllers/taskController")


// Protect ALL routes declared below this line
router.use(protect);

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post('/create',  createTask);
router.patch('/update/:id', updateTaskById);
router.delete('/delete/:id', deleteTaskById);


module.exports = router;