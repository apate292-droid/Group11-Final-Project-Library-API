import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { exists as bookExists } from '../repositories/bookRepo.js';

export const validateReviewId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Review ID must be a positive integer'),
  handleValidationErrors,
];

const allowedSortFields = ['id', 'rating', 'createdAt', 'updatedAt'];
const allowedSortOrders = ['asc', 'desc'];

export const validateReviewQuery = [
  query('bookId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('bookId must be a positive integer'),
  query('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be an integer between 1 and 5'),
  query('sortBy')
    .optional()
    .isIn(allowedSortFields)
    .withMessage(`sortBy must be one of: ${allowedSortFields.join(', ')}`),
  query('sortOrder')
    .optional()
    .isIn(allowedSortOrders)
    .withMessage(`sortOrder must be one of: ${allowedSortOrders.join(', ')}`),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('limit must be an integer between 1 and 100'),
  query('offset')
    .optional()
    .isInt({ min: 0 })
    .withMessage('offset must be 0 or a positive integer'),
  handleValidationErrors,
];

export const validateCreateReview = [
  body('comment')
    .exists({ values: 'falsy' })
    .withMessage('Comment is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Comment must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Comment must be at least 5 characters'),
  body('rating')
    .exists({ values: 'falsy' })
    .withMessage('Rating is required')
    .bail()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  body('bookId')
    .exists({ values: 'falsy' })
    .withMessage('Book ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Book ID must be a positive integer')
    .bail()
    .custom(async (bookId) => {
      if (!(await bookExists(bookId))) {
        throw new Error(`Book with ID ${bookId} does not exist`);
      }
      return true;
    }),
  handleValidationErrors,
];

export const validateUpdateReview = [
  oneOf([
    body('comment').exists({ values: 'falsy' }),
    body('rating').exists({ values: 'falsy' })
  ], {
    message: 'At least one field (comment, rating) must be provided',
  }),
  body('comment')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Comment must be a string')
    .bail()
    .isLength({ min: 5 })
    .withMessage('Comment must be at least 5 characters'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),
  handleValidationErrors,
];