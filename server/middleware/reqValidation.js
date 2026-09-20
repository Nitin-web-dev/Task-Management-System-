const { z } = require("zod");
const registerSchema = z.object({
  userName: z.string().trim().min(3),
  userEmail: z.string().trim().email("Invalid email address").toLowerCase(),
  userPassword: z
    .string()
    .min(5, "Password must be at least 8 characters long"),
  agreeTermAndCondition: z.boolean(),
  emailNotification: z.boolean(),
});

const loginSchema = z.object({
  userEmail: z.string().trim().email("invalid email address").toLowerCase(),
  userPassword: z
    .string()
    .min(5, "password must be at least 5 characters long"),
});

module.exports.registerRequestValidation = function (req, res, next) {
  const result = registerSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: "fail",
      errors: result.error.issues,
    });
  }

  const data = result.data;
  req.userData = data;
  next();
};

module.exports.loginRequestValidation = function (req, res, next) {
  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      status: "fail",
      errors: result.error.issues,
    });
  }

  const data = result.data;
  req.userData = data;
  next();
};
