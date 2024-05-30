const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const db = new sqlite3.Database('users.db');
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, username TEXT, email TEXT)");
});

app.post('/addUser', (req, res) => {
    const { username, email } = req.body;

    db.run(`INSERT INTO users (username, email) VALUES (?, ?)`, [username, email], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to add user.' });
        } else {
            res.json({ success: true });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
app.get('/getUserDetails', (req, res) => {
    db.get(`SELECT * FROM users ORDER BY id DESC LIMIT 1`, (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ error: 'Failed to get user details.' });
        } else {
            res.json(row);
        }
    });
});
