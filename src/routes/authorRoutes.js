import express from 'express';
import {
  getAllAuthorsHandler,
  createAuthorHandler,
  updateAuthorHandler,
  deleteAuthorHandler
} from '../controllers/authorController.js';

import { validateCreateAuthor, validateUpdateAuthor, validateAuthorId } from '../middleware/authorValidation.js';
import { handleValidationErrors } from '../middleware/handleValidationErrors.js';
import { authenticate } from '../middleware/authenticate.js';
import authorizeRoles from '../middleware/authorizeRoles.js';

const router = express.Router();


router.get('/', getAllAuthorsHandler);


router.post(
  '/',
  authenticate,
  authorizeRoles('ADMIN'),
  validateCreateAuthor,
  handleValidationErrors,
  createAuthorHandler
);


router.put(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateAuthorId,         
  validateUpdateAuthor,     
  handleValidationErrors,
  updateAuthorHandler
);


router.delete(
  '/:id',
  authenticate,
  authorizeRoles('ADMIN'),
  validateAuthorId,
  handleValidationErrors,
  deleteAuthorHandler
);

export default router;
