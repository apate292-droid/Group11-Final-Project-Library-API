import express from 'express';
import { signUpHandler } from '../controllers/authController.js';
const router = express.Router();


router.post('/signUp', signUpHandler);

export default router;