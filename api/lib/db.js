try { require('dotenv').config(); } catch (e) { }

const { Pool } = require('pg');

// DEBUG (temporary)
console.log('DATABASE_URL:', process.env.DATABASE_URL);
console.log('POSTGRES_URL:', process.env.POSTGRES_URL);

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
    throw new Error('❌ No DATABASE_URL or POSTGRES_URL found');
}

const isLocal = connectionString.includes('localhost');

const pool = new Pool({
    connectionString,
    ssl: isLocal ? false : { rejectUnauthorized: false },
});

// 🔥 THIS FIXES NEON POOLER ISSUES
pool.on('connect', async (client) => {
    try {
        await client.query('SET search_path TO grafix');
    } catch (err) {
        console.error('❌ Failed to set search_path', err);
        throw err;
    }
});

module.exports = {
    getDb: async () => pool,
};
