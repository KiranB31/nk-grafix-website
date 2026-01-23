const { getDb } = require('../lib/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

    // Retrieve Token
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_key');
        const adminId = decoded.id;

        const { username, password, newPassword } = req.body;
        const db = await getDb();

        // Check if admin exists
        const { rows: admins } = await db.query('SELECT * FROM admins WHERE id = $1', [adminId]);
        if (admins.length === 0) return res.status(404).json({ error: 'Admin not found' });

        const admin = admins[0];

        // If password is provided, verify old password before allowing changes
        if (password) {
            const valid = await bcrypt.compare(password, admin.password);
            if (!valid) return res.status(401).json({ error: 'Incorrect current password' });
        } else {
            // If sensitive changes are requested, require password
            return res.status(400).json({ error: 'Current password required' });
        }

        // Update Fields
        // Update username if provided
        if (username && username !== admin.username) {
            // Check uniqueness
            const { rows: existing } = await db.query('SELECT id FROM admins WHERE username = $1', [username]);
            if (existing.length > 0) return res.status(400).json({ error: 'Username already taken' });

            await db.query('UPDATE admins SET username = $1 WHERE id = $2', [username, adminId]);
        }

        // Update email if provided
        if (req.body.email && req.body.email !== admin.email) {
            const email = req.body.email;
            // Check uniqueness
            const { rows: existing } = await db.query('SELECT id FROM admins WHERE email = $1', [email]);
            if (existing.length > 0) return res.status(400).json({ error: 'Email already registered' });

            await db.query('UPDATE admins SET email = $1 WHERE id = $2', [email, adminId]);
        }

        // Update password if provided
        if (newPassword) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await db.query('UPDATE admins SET password = $1 WHERE id = $2', [hashedPassword, adminId]);
        }

        res.status(200).json({ success: true, message: 'Credentials updated successfully' });

    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: 'Invalid or expired token' });
    }
};
