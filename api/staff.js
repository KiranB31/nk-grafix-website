const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();
        const { rows: staff } = await db.query('SELECT * FROM staff');
        res.status(200).json(staff);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
