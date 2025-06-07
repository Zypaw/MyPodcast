import sqlite3 from 'sqlite3';
import { Database, open } from 'sqlite';

// Database initialization
export async function initializeDatabase(): Promise<Database> {
    const db = await open({
        filename: './newsletter.db',
        driver: sqlite3.Database
    });

    // Create the subscribers table if it doesn't exist
    await db.exec(`
        CREATE TABLE IF NOT EXISTS subscribers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            is_active BOOLEAN DEFAULT TRUE
        )
    `);

    return db;
}

// Add a new subscriber
export async function addSubscriber(email: string) {
    try {
        const db = await initializeDatabase();
        await db.run(
            'INSERT INTO subscribers (email) VALUES (?)',
            [email.toLowerCase()]
        );
        return { success: true };
    } catch (error: any) {
        if (error.code === 'SQLITE_CONSTRAINT') {
            return { success: false, error: 'Email already subscribed' };
        }
        return { success: false, error: 'Failed to subscribe' };
    }
}

// Get all subscribers
export async function getSubscribers() {
    const db = await initializeDatabase();
    return db.all('SELECT * FROM subscribers WHERE is_active = TRUE');
}

// Unsubscribe
export async function unsubscribe(email: string) {
    const db = await initializeDatabase();
    await db.run(
        'UPDATE subscribers SET is_active = FALSE WHERE email = ?',
        [email.toLowerCase()]
    );
    return { success: true };
} 