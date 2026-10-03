// import express-validator
import { body } from 'express-validator';

// definisikan validasi untuk post
export const validatePost = [
    body('title').notEmpty().withMessage('Title is required'),
    body('content').notEmpty().withMessage('Content is required'),
];
