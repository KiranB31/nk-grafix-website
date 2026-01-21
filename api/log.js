const { getDb } = require('./lib/db');

module.exports = async (req, res) => {
    try {
        const db = await getDb();
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        const ua = req.headers['user-agent'];

        await db.execute(
            'INSERT INTO visitor_logs (visitor_ip, user_agent) VALUES (?, ?)',
            [ip, ua]
        );

        res.status(200).json({ success: true });
    } catch (error) {
        // Silently fail as it's just background logging
        console.error('Logging error:', error);
        res.status(200).json({ success: false });
    }
};
