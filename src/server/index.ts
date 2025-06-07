import express from 'express';
import cors from 'cors';
import newsletterRoutes from './api.js';
import { initializeDatabase } from './db.js';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize database
initializeDatabase().then(() => {
    console.log('Database initialized');
}).catch(console.error);

// Routes 
app.use('/api/newsletter', newsletterRoutes);

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 