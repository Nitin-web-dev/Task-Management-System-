const { z } = require("zod");

// 1. Reusable Enums matching Mongoose enums
const taskStatusEnum = z.enum(["pending", "done", "inProcess"], {
  errorMap: () => ({ message: "taskStatus must be either: pending, done, or inProcess" }),
});

const priorityEnum = z.enum(["urgent", "highPriority", "normal"], {
  errorMap: () => ({ message: "priority must be either: urgent, highPriority, or normal" }),
});
const taskSchema = z.object({
  title: z.string().trim().min(1, "title cannot be empty").toLowerCase() ,
  description:  z.string().trim().min(1, "description cannot be empty") ,
 dueDate: z
    .string({ required_error: "Due date is required" })
    .trim()
    .min(1, "Due date cannot be empty"),

  assignedTo: z
    .string({ required_error: "assignedTo is required" })
    .trim()
    .min(1, "assignedTo cannot be empty"),

    // Fields with defaults in Mongoose (Optional in request, falls back to default value)
  taskStatus: taskStatusEnum.default("pending"),
  priority: priorityEnum.default("normal"),

});

module.exports.createTaskReqValidation = function(req,res,next){
    const result = taskSchema.safeParse(req.body);

    if(!result.success){
        return res.status(400).json({
            status: 'fail',
            message: 'invalid data',
           errors: result.error.issues,
        })
    }

    const data = result.data;
    req.userTaskData = data;
    next();
}