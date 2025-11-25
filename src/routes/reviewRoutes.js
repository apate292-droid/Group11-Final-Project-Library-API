import express from 'express';
import {
  getAllReviewsHandler,
  createReviewHandler,
  updateReviewHandler,
  deleteReviewHandler,
} from '../controllers/reviewController.js';

import { authenticate } from '../middleware/authenticate.js';
import authorizeOwnership from '../middleware/authorizeOwnership.js';
import { 
  validateCreateReview, 
  validateUpdateReview, 
  validateReviewId, 
  validateReviewQuery 
} from '../middleware/reviewValidation.js';

const router = express.Router();

router.get('/', validateReviewQuery, getAllReviewsHandler);

router.post(
  '/',
  authenticate,
  validateCreateReview,
  createReviewHandler
);

router.put(
  '/:id',
  authenticate,
  authorizeOwnership('Review'),
  validateReviewId,
  validateUpdateReview,
  updateReviewHandler
);

router.delete(
  '/:id',
  authenticate,
  authorizeOwnership('Review'),
  validateReviewId,
  deleteReviewHandler
);

export default router;