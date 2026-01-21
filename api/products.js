const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        if (req.method === 'GET') {
            const [products] = await db.execute('SELECT * FROM products ORDER BY created_at DESC');
            return res.status(200).json(products);
        }

        if (req.method === 'POST') {
            const { name, price, description, image_url, category } = req.body;
            await db.execute(
                'INSERT INTO products (name, price, description, image_url, category) VALUES (?, ?, ?, ?, ?)',
                [name, price, description, image_url, category]
            );
            return res.status(200).json({ success: true });
        }

        res.status(405).send('Method Not Allowed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
