const { getDb } = require('../lib/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    try {
        const { username, password } = req.body;
        const db = await getDb();

        const { rows: users } = await db.query('SELECT * FROM admins WHERE username = $1', [username]);

        if (users.length === 0) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const user = users[0];
        const valid = await bcrypt.compare(password, user.password);

        if (!valid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username },
            process.env.JWT_SECRET || 'secret_key',
            { expiresIn: '24h' }
        );

        res.status(200).json({ success: true, token, user: { id: user.id, username: user.username, fullName: user.full_name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
