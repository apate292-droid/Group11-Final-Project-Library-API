import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';

// Allowed sort fields and order for GET /authors
const allowedSortFields = ['id', 'name'];
const allowedSortOrders = ['asc', 'desc'];

/**
 * Validate author ID in route params (for GET /:id, PUT /:id, DELETE /:id)
 */
export const validateAuthorId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),
  handleValidationErrors,
];


export const validateAuthorQuery = [
  query('authorId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('authorId must be a positive integer'),

  query('search')
    .optional()
    .isString()
    .withMessage('search must be a string'),

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


export const validateCreateAuthor = [
  body('name')
    .exists({ values: 'falsy' })
    .withMessage('Author name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Author name must be a string')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Author name must be at least 2 characters'),
  handleValidationErrors,
];


export const validateUpdateAuthor = [
  oneOf([body('name').exists({ values: 'falsy' })], {
    message: 'At least one field (name) must be provided',
  }),

  body('name')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Author name must be a string')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Author name must be at least 2 characters'),

  handleValidationErrors,
];
