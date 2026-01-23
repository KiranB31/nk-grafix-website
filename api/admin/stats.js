const { getDb } = require('../lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();

        const { rows: products } = await db.query('SELECT COUNT(*) as count FROM products');
        const productCount = products[0]?.count || 0;

        const { rows: messages } = await db.query('SELECT COUNT(*) as count FROM contact_messages');
        const messageCount = messages.length > 0 ? messages[0].count : 0;

        const { rows: logs } = await db.query('SELECT COUNT(*) as count FROM visitor_logs');
        const visitorCount = logs.length > 0 ? logs[0].count : 0;

        // Note: For reviews, posts, subscribers - you would add tables for these as you scale
        // For now returning current MySQL counts
        res.status(200).json({
            productCount,
            messageCount,
            visitorCount,
            postCount: 0, // Placeholder
            subscriberCount: 0 // Placeholder
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
};
