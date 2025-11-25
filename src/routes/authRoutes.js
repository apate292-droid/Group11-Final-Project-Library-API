import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateCreateUser } from '../middleware/userValidation.js';


const router = express.Router();


router.post("/register", validateCreateUser, register);
router.post("/login", login);

export default router;