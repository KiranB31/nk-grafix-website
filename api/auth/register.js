const { getDb } = require('../lib/db');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { username, password, fullName, email } = req.body;
        const db = await getDb();

        // Check if first admin or exists
        const [existing] = await db.execute('SELECT id FROM admins LIMIT 1');

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        await db.execute(
            'INSERT INTO admins (username, password, full_name, email) VALUES (?, ?, ?, ?)',
            [username, hashedPassword, fullName, email]
        );

        res.status(200).json({ success: true, message: 'Admin registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
