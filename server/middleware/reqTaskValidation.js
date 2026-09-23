const { z } = require("zod");

// 1. Reusable Enums matching Mongoose enums
const taskStatusEnum = z.enum(["Todo", "Completed", "In Progress"], {
  errorMap: () => ({
    message: "taskStatus must be either: Progress, Todo, or Completed",
  }),
});

const priorityEnum = z.enum(["Urgent", "High", "Medium", "Low"], {
  errorMap: () => ({
    message: "priority must be either: Urgent, Low,Medium, or High",
  }),
});
const taskSchema = z.object({
  title: z.string().trim().min(1, "title cannot be empty").toLowerCase(),
  description: z.string().trim().min(1, "description cannot be empty"),
  dueDate: z
    .string()
    
  
    .default(() => new Date().toISOString().split("T")[0]),

  assignedTo: z
    .string({ required_error: "assignedTo is required" })
    .trim()
    .min(1, "assignedTo cannot be empty")
    .default("user"),

  category: z
    .string({ required_error: "category is required" })
    .trim()
    .min(2, "category cannot be empty"),

  // Fields with defaults in Mongoose (Optional in request, falls back to default value)
  taskStatus: taskStatusEnum.default("Todo"),
  priority: priorityEnum.default("Low"),
});

module.exports.createTaskReqValidation = function (req, res, next) {
  const result = taskSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      status: "fail",
      message: "invalid data",
      errors: result.error.issues,
    });
  }

  const data = result.data;
  
  req.userTaskData = data;
  next();
};
