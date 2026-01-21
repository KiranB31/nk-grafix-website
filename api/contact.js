const { v4: uuidv4 } = require('uuid');

// Note: Local file storage on Vercel is temporary and resets. 
// For production, use a database (Supabase, MongoDB, etc.)
module.exports = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { name, email, message } = req.body;
            const newMessage = {
                id: uuidv4(),
                name,
                email,
                message,
                date: new Date().toISOString()
            };

            // On Vercel, we can't reliably save to local files for persistence.
            // We would usually send this to a DB. 
            // For now, we'll just log it and return success to the user.
            console.log('New Contact Message:', newMessage);

            // Redirect back to contact page with success
            res.setHeader('Location', '/contact?success=true');
            res.status(302).end();
        } catch (error) {
            console.error(error);
            res.status(500).send('Error processing request');
        }
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
