import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

const validateRequest = (validations: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    };
};

export const validateCreateAnalytics = validateRequest([
    body('metric').isString().withMessage('Metric must be a string'),
    body('value').isNumeric().withMessage('Value must be a number'),
    body('timestamp').isISO8601().withMessage('Timestamp must be a valid date'),
]);

export const validateCreateContent = validateRequest([
    body('title').isString().withMessage('Title must be a string'),
    body('body').isString().withMessage('Body must be a string'),
    body('tenantId').isString().withMessage('Tenant ID must be a string'),
]);

export const validateLogin = validateRequest([
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
]);

export const validateRegister = validateRequest([
    body('email').isEmail().withMessage('Email must be valid'),
    body('password').isString().isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    body('name').optional().isString().withMessage('Name must be a string'),
    body('role').optional().isIn(['admin', 'editor', 'viewer']).withMessage('Role must be admin, editor, or viewer'),
]);

export const validateTenant = validateRequest([
    body('name').isString().notEmpty().withMessage('Tenant name is required'),
    body('domain').optional().isString().withMessage('Domain must be a string'),
    body('config').optional().isObject().withMessage('Config must be an object'),
]);