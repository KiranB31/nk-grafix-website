require('dotenv').config();
const fs = require('fs');
const path = require('path');
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: false // Local development usually doesn't use SSL
});

async function initDb() {
    try {
        console.log('Connecting to database...');
        console.log('Target URL:', process.env.POSTGRES_URL); // Debug url
        const client = await pool.connect();

        console.log('Reading setup.sql...');
        const sqlPath = path.join(__dirname, '..', 'setup.sql');
        const sql = fs.readFileSync(sqlPath, 'utf8');

        console.log('Running schema migration...');
        // Split by semicolon vs running whole file? 
        // pg driver can often run multiple statements if pass them all.
        await client.query(sql);

        console.log('✅ Database setup completed successfully!');
        client.release();
    } catch (err) {
        console.error('❌ Error initializing database:', err);
        console.error('Hint: Make sure:\n1. PostgreSQL is running\n2. Database "grafixDD" exists\n3. Password in .env is correct');
    } finally {
        await pool.end();
    }
}

initDb();
