import { body, validationResult } from "express-validator";

export const validateCaptainRegister = [
  body("fullname.firstname")
    .notEmpty()
    .withMessage("Firstname is required")
    .isLength({ min: 3 })
    .withMessage("Firstname must be atleast 3 charactors long"),
  body("email").isEmail().withMessage("Please provide valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 charctors long"),
  body("vehicle.color")
    .isLength({ min: 3 })
    .withMessage("Color must be atleast 3 charactors long"),
  body("vehicle.plate")
    .isLength({ min: 3 })
    .withMessage("Plate must be atleast 3 charactors long"),
  body("vehicle.capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be atleast 1"),
  body("vehicle.vehicleType")
    .isIn(["car", "motorcycle", "auto"])
    .withMessage("Invalid vehicle type"),
];

export const validateCaptainLogin = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 charactors long"),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
