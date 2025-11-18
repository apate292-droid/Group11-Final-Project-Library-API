import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { existsBookByTitle } from '../repositories/bookRepo.js';

const allowedSortFields = ['id', 'title', 'authorId'];
const allowedSortOrders = ['asc', 'desc'];


export const validateBookId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Book ID must be a positive integer'),
  handleValidationErrors,
];


export const validateBookQuery = [
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


export const validateCreateBook = [
  body('title')
    .exists({ values: 'falsy' })
    .withMessage('Book title is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Book title must be a string')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Book title must be at least 2 characters')
    .custom(async (title, { req }) => {
        if (await existsBookByTitle(title, req.body.authorId)) {
          throw new Error(`Book "${title}" by this author already exists`);
        }
        return true;
      }),

  body('authorId')
    .exists({ values: 'falsy' })
    .withMessage('Author ID is required')
    .bail()
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),

  handleValidationErrors,
];


export const validateUpdateBook = [
  oneOf(
    [
      body('title').exists({ values: 'falsy' }),
      body('authorId').exists({ values: 'falsy' }),
    ],
    {
      message:
        'At least one field (title or authorId) must be provided',
    }
  ),

  body('title')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Book title must be a string')
    .bail()
    .isLength({ min: 2 })
    .withMessage('Book title must be at least 2 characters'),

  
  body('authorId')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),

  handleValidationErrors,
];
