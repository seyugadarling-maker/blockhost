import express from "express"
import rateLimit from "express-rate-limit"
import { register, login, getMe } from "../controllers/authController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

// Stricter rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: "Too many authentication attempts, please try again later.",
  skipSuccessfulRequests: true,
})

// Public routes
router.post("/register", authLimiter, register)
router.post("/login", authLimiter, login)

// Protected routes
router.get("/me", protect, getMe)

export default router
