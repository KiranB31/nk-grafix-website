const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        if (req.method === 'GET') {
            const [posts] = await db.execute('SELECT * FROM blog_posts ORDER BY created_at DESC');
            return res.status(200).json(posts);
        }

        if (req.method === 'POST') {
            const { title, content, image_url, author } = req.body;
            await db.execute(
                'INSERT INTO blog_posts (title, content, image_url, author) VALUES (?, ?, ?, ?)',
                [title, content, image_url, author || 'Admin']
            );
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            const { id } = req.query;
            await db.execute('DELETE FROM blog_posts WHERE id = ?', [id]);
            return res.status(200).json({ success: true });
        }

        res.status(405).send('Method Not Allowed');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
