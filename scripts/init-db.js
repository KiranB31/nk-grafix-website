const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

if (!connectionString) {
    console.error("❌ No DATABASE_URL or POSTGRES_URL found in .env");
    process.exit(1);
}

const pool = new Pool({
    connectionString,
    ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
});

async function initDb() {
    try {
        console.log("🔌 Connecting to database...");
        const client = await pool.connect();
        console.log("✅ Connected.");

        // Read migration files
        const migrationPath = path.join(__dirname, 'migration_images.sql');
        const schemaPath = path.join(__dirname, 'setup.sql');

        // Check if stored_images exists
        const res = await client.query("SELECT to_regclass('public.stored_images') as table_exists;");

        // We might be in a different schema (grafix), let's check that too or just set search path
        await client.query("SET search_path TO grafix, public;");

        console.log("🛠️ Running Migrations...");

        if (fs.existsSync(migrationPath)) {
            const sql = fs.readFileSync(migrationPath, 'utf8');
            await client.query(sql);
            console.log("✅ migration_images.sql executed.");
        }

        // Also ensure the bio/about update column exists from the previous migration
        const migration2Path = path.join(__dirname, 'migration.sql');
        if (fs.existsSync(migration2Path)) {
            const sql = fs.readFileSync(migration2Path, 'utf8');
            await client.query(sql);
            console.log("✅ migration.sql executed.");
        }

        console.log("✨ Database initialization complete.");
        client.release();
        process.exit(0);
    } catch (err) {
        console.error("❌ Database Initialization Logic Error:", err);
        process.exit(1);
    }
}

initDb();
