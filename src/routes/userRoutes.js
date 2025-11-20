import express from "express";
import {
  getAllUsersHandler,
  getUserByIdHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler
} from "../controllers/userController.js";

import { authenticate } from "../middlewares/authenticate.js";
import authorizeOwnership from "../middlewares/authorizeOwnership.js";
import authorizeRoles from "../middlewares/authorizeRoles.js";
import { 
  validateCreateUser, 
  validateUpdateUser, 
  validateUserId 
} from "../middlewares/userValidation.js";
import { handleValidationErrors } from "../middlewares/handleValidationErrors.js";

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
  '/create',
  validateCreateUser,
  handleValidationErrors,
  createUserHandler
);


router.put(
  '/:id',
  authenticate,
  authorizeOwnership,
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
