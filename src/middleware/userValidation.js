import { param, body } from 'express-validator';
import { handleValidationErrors } from './handleValidationErrors.js';
import { existsByUserName } from '../repositories/userRepo.js';

export const validateUserId = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('User ID must be a positive integer'),
  handleValidationErrors,
];


export const validateCreateUser = [
  body('username')
    .exists({ values: 'falsy' })
    .withMessage('Username is required')
    .bail()
    .trim()
    .escape()
    .isString()
    .withMessage('Username must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters')    .custom(async (value) => {
      if (await existsByUserName(value)) {
        throw new Error(`Username "${value}" is already taken`);
      }
      return true;
    }),

  body('password')
    .exists({ values: 'falsy' })
    .withMessage('Password is required')
    .bail()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),

  handleValidationErrors,
];


export const validateUpdateUser = [

  body('username')
    .optional()
    .trim()
    .escape()
    .isString()
    .withMessage('Username must be a string')
    .bail()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 6 characters'),

  body('password')
    .optional()
    .isString()
    .withMessage('Password must be a string')
    .bail()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 7 characters'),

  handleValidationErrors,
];
