import express from 'express';
import {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookHandler,
  deleteBookHandler
} from '../controllers/bookController.js';

import { 
  validateCreateBook, 
  validateUpdateBook, 
  validateBookId 
} from '../middleware/bookValidation.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeRoles } from '../middleware/authorizeRoles.js';

const router = express.Router();


router.get('/', getAllBooksHandler);


router.get('/:id', validateBookId, handleValidationErrors, getBookByIdHandler);


router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  validateCreateBook,
  handleValidationErrors,
  createBookHandler
);


router.put(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateBookId,
  validateUpdateBook,
  handleValidationErrors,
  updateBookHandler
);


router.delete(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateBookId,
  handleValidationErrors,
  deleteBookHandler
);

export default router;
