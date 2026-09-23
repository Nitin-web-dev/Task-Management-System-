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
        
        enum : ["Todo", "Completed", "In Progress"],
        default: "pending"
    },
    priority : {
        type: String,
        
        enum : ["Urgent", "High", "Medium", "Low"],
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
    category: {
        type: String,
        required: true
    }
},{timestamps: true});

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;