import express from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} from "../controllers/userController.js";

import { authenticate } from "../middleware/authenticate.js";
import authorizeOwnerships from "../middleware/authorizeOwnership.js";

import authorizeRoles from "../middleware/authorizeRoles.js";


import { loginUserHandler } from '../controllers/userController.js';

import { 
  validateCreateUser, 
  validateUpdateUser, 
  validateUserId 
} from "../middleware/userValidation.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();


router.get(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  getAllUsersHandler
);


router.get(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateUserId,
  handleValidationErrors,
  getUserByIdHandler
);

router.post(
  '/login',
  loginUserHandler 
);

router.post(
  '/create',

  createUserHandler
);

router.put(
  '/:id',
  authenticate,
  authorizeOwnerships('user'),
  validateUpdateUser,
  handleValidationErrors,
  updateUserHandler
);

router.delete(
  '/:id',
  authenticate,
  validateUserId,
  handleValidationErrors,
  deleteUserHandler
);

export default router;
