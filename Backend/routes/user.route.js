import express from "express";
import {
  register,
  login,
  profile,
  logout,
} from "../controllers/authController.js";
import {
  validateRegister,
  validateLogin,
  validate,
} from "../validations/auth.validation.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = express.Router();

// register a user
router.post("/register", validateRegister, validate, register);
router.post("/login", validateLogin, validate, login);
router.get("/profile", auth, profile);
router.get("/logout", auth, logout);

export default router;
