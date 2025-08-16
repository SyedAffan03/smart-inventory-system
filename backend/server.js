const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());

// ===== API ROUTES =====
// Get all inventory
app.get('/api/inventory', (req, res) => {
    db.query(
        'SELECT id, name, category, quantity, price, added_on FROM inventory',
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Database query failed' });
            }
            res.json(results);
        }
    );
});

// Add inventory item
app.post('/api/inventory', (req, res) => {
    const { name, category, quantity, price } = req.body;
    const sql =
        'INSERT INTO inventory (name, category, quantity, price, added_on) VALUES (?, ?, ?, ?, NOW())';
    db.query(sql, [name, category, quantity, price], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database insert failed' });
        }
        res.json({ message: 'Item added successfully', id: result.insertId });
    });
});

// Delete inventory item
app.delete('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM inventory WHERE id = ?', [id], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Database delete failed' });
        }
        res.json({ message: 'Item deleted successfully' });
    });
});

// ===== FRONTEND ROUTES =====
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.get('/inventory.html', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/inventory.html'));
});

// Serve static files (AFTER API ROUTES)
app.use(express.static(path.join(__dirname, '../frontend')));

// ===== DATABASE CONNECTION =====
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to database.');
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
