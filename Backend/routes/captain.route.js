import express from "express";
import {
  register,
  login,
  profile,
  logout,
} from "../controllers/captainController.js";
import {
  validate,
  validateCaptainRegister,
  validateCaptainLogin,
} from "../validations/captain.validation.js";
import { authCaptain } from "../middlewares/auth.middleware.js";

const router = express.Router();

/**
 * POST /captain/register
 */
router.post("/register", validateCaptainRegister, validate, register);

/**
 * POST /captain/login
 */
router.post("/login", validateCaptainLogin, validate, login);

/**
 * GET /captain/profile
 */
router.get("/profile", authCaptain, profile);

/**
 * GET /captain/logout
 */
router.get("/logout", authCaptain, logout);

export default router;
