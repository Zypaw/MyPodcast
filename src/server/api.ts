import { Router } from 'express';
import { addSubscriber, unsubscribe } from './db.js';
import { body, validationResult } from 'express-validator';

const router = Router();

// Middleware for email validation
const validateEmail = [
    body('email')
        .isEmail()
        .normalizeEmail()
        .withMessage('Please enter a valid email address'),
];

// Newsletter subscription endpoint
router.post('/subscribe', validateEmail, async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email } = req.body;
        const result = await addSubscriber(email);
        
        if (result.success) {
            res.json({ message: 'Successfully subscribed to newsletter!' });
        } else {
            res.status(400).json({ error: result.error });
        }
    } catch (error) {
        console.error('Newsletter subscription error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Unsubscribe endpoint
router.post('/unsubscribe', validateEmail, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { email } = req.body;
        await unsubscribe(email);
        res.json({ message: 'Successfully unsubscribed from newsletter' });
    } catch (error) {
        console.error('Newsletter unsubscribe error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; 