const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        if (req.method === 'GET') {
            const { rows: info } = await db.query('SELECT * FROM business_info LIMIT 1');
            return res.status(200).json(info[0] || {});
        }

        if (req.method === 'POST') {
            const { company_name, address, email, phone, philosophy, vision, owner_name, about_image_url } = req.body;

            await db.query(
                'UPDATE business_info SET company_name = $1, address = $2, email = $3, phone = $4, philosophy = $5, vision = $6, owner_name = $7, about_image_url = $8 WHERE id = 1',
                [company_name, address, email, phone, philosophy, vision, owner_name, about_image_url]
            );

            return res.status(200).json({ success: true });
        }

        res.status(405).send('Method Not Allowed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
