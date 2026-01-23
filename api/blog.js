const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        if (req.method === 'GET') {
            const { rows: posts } = await db.query('SELECT * FROM blog_posts ORDER BY created_at DESC');
            return res.status(200).json(posts);
        }

        if (req.method === 'POST') {
            const { title, content, image_url, author } = req.body;
            await db.query(
                'INSERT INTO blog_posts (title, content, image_url, author) VALUES ($1, $2, $3, $4)',
                [title, content, image_url, author || 'Admin']
            );
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await db.query('DELETE FROM blog_posts WHERE id = $1', [id]);
            return res.status(200).json({ success: true });
        }

        res.status(405).send('Method Not Allowed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
