module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const { email } = req.body;
        console.log('New Subscriber:', email);
        res.status(200).send('Success');
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
