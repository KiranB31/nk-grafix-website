const { getDb } = require('../lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        if (req.method === 'GET') {
            const [info] = await db.execute('SELECT * FROM business_info LIMIT 1');
            return res.status(200).json(info[0] || {});
        }

        if (req.method === 'POST') {
            // In real app, verify JWT here
            const { company_name, address, email, phone, philosophy, vision } = req.body;

            await db.execute(
                'UPDATE business_info SET company_name = ?, address = ?, email = ?, phone = ?, philosophy = ?, vision = ? WHERE id = 1',
                [company_name, address, email, phone, philosophy, vision]
            );

            return res.status(200).json({ success: true });
        }

        res.status(405).send('Method Not Allowed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
