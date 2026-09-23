const mongoose = require("mongoose");
const taskModel = require("../models/task-model");
module.exports.createTask = async function (req, res) {
  try {

     
    

    const task = await taskModel.create({
      
      title: req.userTaskData.title,
      description: req.userTaskData.description,
      dueDate: req.userTaskData.dueDate,
      assignedTo: req.userTaskData.assignedTo,
      category: req.userTaskData.category,
      taskStatus: req.userTaskData.taskStatus,
      priority: req.userTaskData.priority
    });

    res.status(201).json({
      status: "ok",
      message: "task created",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};

module.exports.getAllTasks = async function (req, res) {
  try {
    const tasks = await taskModel.find();

    res.status(200).json({
      status: "ok",
      message: "ok",
      data: tasks,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};

module.exports.getTaskById = async function (req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "invalid task id",
      });
    }
    const task = await taskModel.findById(id);
    if (!task) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "task found",
      data: task,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};

// todo: need some changes to get id and check in db if task exist then get data to change and then change in db
module.exports.updateTaskStatusById = async function (req, res) {
  try {
    const id = req.params.id;
    const taskStatus = req.body.taskStatus;
    // validate the taskStatus for falsy value like null or undefined;
    if (!taskStatus) {
      return res.status(400).json({
        status: "fail",
        message: "taskStatus is required",
      });
    }
    // validate  id with mongoose objectid formatee
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "invalid task id formate",
      });
    }

    // new: true return new value that is changed not old one and runValidators  check in schema for validate the updated value match with schema validation like enum value
    const updatedtask = await taskModel.findByIdAndUpdate(
      id,
      { taskStatus },
      { new: true, runValidators: true },
    );
    if (!updatedtask) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "task updated successfully",
      data: updatedtask,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};

module.exports.deleteTaskById = async function (req, res) {
  try {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        status: "fail",
        message: "invalid task id",
      });
    }
    const deletedtask = await taskModel.findByIdAndDelete(id);
    if (!deletedtask) {
      return res.status(404).json({
        status: "fail",
        message: "Task not found",
      });
    }

    res.status(200).json({
      status: "ok",
      message: "delete successfully",
      data: deletedtask,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "error", message: "internal server error" });
  }
};
