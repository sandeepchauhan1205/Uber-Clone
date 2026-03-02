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
 * @swagger
 * tags:
 *   name: Captain
 *   description: Captain authentication and profile management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CaptainRegister:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 *     CaptainLogin:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *           format: password
 */

/**
 * @swagger
 * /api/v1/captain/register:
 *   post:
 *     summary: Register a new captain
 *     tags: [Captain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CaptainRegister'
 *     responses:
 *       201:
 *         description: Captain registered successfully
 */
router.post("/register", validateCaptainRegister, validate, register);

/**
 * @swagger
 * /api/v1/captain/login:
 *   post:
 *     summary: Authenticate captain and return token
 *     tags: [Captain]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CaptainLogin'
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
router.post("/login", validateCaptainLogin, validate, login);

/**
 * @swagger
 * /api/v1/captain/profile:
 *   get:
 *     summary: Get current captain profile
 *     tags: [Captain]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Captain profile returned
 *       401:
 *         description: Unauthorized
 */
router.get("/profile", authCaptain, profile);

/**
 * @swagger
 * /api/v1/captain/logout:
 *   get:
 *     summary: Logout current captain
 *     tags: [Captain]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *       401:
 *         description: Unauthorized
 */
router.get("/logout", authCaptain, logout);

export default router;
