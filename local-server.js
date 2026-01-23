const express = require('express');
const path = require('path');
const fs = require('fs');

// Load env vars
try { require('dotenv').config(); } catch (e) { }

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve Static Files
app.use(express.static(__dirname));

// Load Vercel Rewrites
let rewrites = [];
try {
    const vercelConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
    rewrites = vercelConfig.rewrites || [];
} catch (e) {
    console.warn("Could not load vercel.json rewrites");
}

// Clean URL support and Vercel Rewrites
app.use((req, res, next) => {
    // Skip API requests
    if (req.path.startsWith('/api/')) return next();

    // 1. Check exact Vercel Rewrites
    const rule = rewrites.find(r => r.source === req.path);
    if (rule) {
        const destPath = path.join(__dirname, rule.destination);
        if (fs.existsSync(destPath)) {
            return res.sendFile(destPath);
        }
    }

    // 2. Fallback: Check if path is a Clean URL for an HTML file (e.g. /login -> /login.html)
    const possibleHtml = path.join(__dirname, req.path + '.html');
    if (fs.existsSync(possibleHtml)) {
        return res.sendFile(possibleHtml);
    }

    next();
});

// Dynamic API Routing using Vercel-style structure
// Maps /api/filename to api/filename.js
app.all('/api/*', async (req, res) => {
    const apiPath = req.path.replace('/api/', '');
    let filePath = path.join(__dirname, 'api', apiPath + '.js');

    // Check if file exists, if not try index.js or subfolders
    if (!fs.existsSync(filePath)) {
        filePath = path.join(__dirname, 'api', apiPath, 'index.js');
    }

    if (fs.existsSync(filePath)) {
        try {
            // Clear cache to allow hot-reloading behavior during dev
            delete require.cache[require.resolve(filePath)];
            const handler = require(filePath);

            // Handle both module.exports = function and export default function
            const func = handler.default || handler;

            if (typeof func === 'function') {
                await func(req, res);
            } else {
                res.status(500).send('Handler is not a function');
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err.message });
        }
    } else {
        res.status(404).json({ error: 'API Endpoint not found' });
    }
});

app.listen(PORT, () => {
    console.log(`\nLocal Development Server running at http://localhost:${PORT}`);
    console.log(`- Static files served from root`);
    console.log(`- API endpoints at /api/*\n`);
});
