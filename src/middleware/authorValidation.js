import { param, query, body, oneOf } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { existsAuthorByName } from '../repositories/authorRepo.js';


export const validateAuthorId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('Author ID must be a positive integer'),
  handleValidationErrors,
];


const allowedSortFields = ['id', 'name'];
const allowedSortOrders = ['asc', 'desc'];

export const validateAuthorQuery = [
  query('search').optional().isString().withMessage('search must be a string'),
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
    .isInt({ min: 1, max: 50 })
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
    .withMessage('Name is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Name must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .bail()
    .custom(async (name) => {
      if (await existsAuthorByName(name)) {
        throw new Error(`Author with name "${name}" already exists`);
      }
      return true;
    }),
  handleValidationErrors,
];


export const validateUpdateAuthor = [
  body('name')
    .trim()
    .escape()
    .isString()
    .withMessage('Name is required')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Name must be at least 3 characters')
    .bail()
    .custom(async (name, { req }) => {
      if (name && (await existsAuthorByName(name))) {
        throw new Error(`Author with name "${name}" already exists`);
      }
      return true;
    }),
  handleValidationErrors,
];
