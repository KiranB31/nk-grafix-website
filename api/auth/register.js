const { getDb } = require('../lib/db');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { username, password, fullName, email } = req.body;
        const db = await getDb();

        // Check if username already exists
        const { rows: existing } = await db.query('SELECT id FROM admins WHERE username = $1', [username]);

        if (existing.length > 0) {
            return res.status(400).json({ error: 'Username already taken' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.query(
            'INSERT INTO admins (username, password, full_name, email) VALUES ($1, $2, $3, $4)',
            [username, hashedPassword, fullName, email]
        );

        res.status(200).json({ success: true, message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
