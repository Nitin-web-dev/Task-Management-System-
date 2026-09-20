const mongoose = require('mongoose');


const taskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    description : {
        type: String,
        required: true
    },
    taskStatus : {
        type: String,
        
        enum : ["pending", "done", "inProcess"],
        default: "pending"
    },
    priority : {
        type: String,
        
        enum : ["urgent", "highPriority", "normal"],
        default: "normal"
    },
    dueDate : {
        type: String,
        required: true
    },
    assignedTo : {
        type: String,
        required: true
    },
    // todo: add category for task
},{timestamps: true});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;