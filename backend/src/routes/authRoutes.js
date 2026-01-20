import express from 'express';
import { checkLogin, googleAuth, logout } from '../controllers/authController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/google', googleAuth);
router.get("/me", authMiddleware, checkLogin);
router.post("/logout", authMiddleware, logout);

export default router;
