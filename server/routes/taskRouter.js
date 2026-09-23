const express = require('express');
const router = express.Router();
const {protect} = require('../middleware/authMiddleware')
const {createTaskReqValidation} = require("../middleware/reqTaskValidation");
const {createTask, getAllTasks ,getTaskById, updateTaskStatusById,  deleteTaskById} = require("../controllers/taskController")


// Protect ALL routes declared below this line
router.use(protect);

router.get("/", getAllTasks);
router.get("/:id", getTaskById);
router.post('/create', createTaskReqValidation, createTask);
router.patch('/updateStatus/:id', updateTaskStatusById);
router.delete('/delete/:id', deleteTaskById);


module.exports = router;