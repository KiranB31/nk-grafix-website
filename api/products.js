const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        if (req.method === 'GET') {
            const { rows: products } = await db.query('SELECT * FROM products ORDER BY created_at DESC');
            return res.status(200).json(products);
        }

        if (req.method === 'POST') {
            const { name, price, description, image_url, category } = req.body;
            await db.query(
                'INSERT INTO products (name, price, description, image_url, category) VALUES ($1, $2, $3, $4, $5)',
                [name, price, description, image_url, category]
            );
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await db.query('DELETE FROM products WHERE id = $1', [id]);
            return res.status(200).json({ success: true });
        }

        res.status(405).send('Method Not Allowed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
