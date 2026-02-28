import { body, validationResult } from "express-validator";

export const validateRegister = [
  body("fullname.firstname")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 3 })
    .withMessage("Firstname must be at least 3 characters long"),
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

export const validateLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
