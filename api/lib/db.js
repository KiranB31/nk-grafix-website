const mysql = require('mysql2/promise');

// Use environment variables for security on Vercel
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: false // Often required for cloud DBs
    }
};

let pool;

export async function getDb() {
    if (!pool) {
        pool = mysql.createPool(dbConfig);
    }
    return pool;
}
