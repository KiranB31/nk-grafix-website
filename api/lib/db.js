try { require('dotenv').config(); } catch (e) { }

const { Pool } = require('pg');

// Use DATABASE_URL first, fallback to local POSTGRES_URL for dev
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

// Determine SSL: disable for local, enable for cloud
const isLocal = connectionString.includes('localhost');

const pool = new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
});

module.exports = {
    getDb: async () => pool
};
