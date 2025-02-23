const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('uploads'));

// Konfiguracja bazy danych
const db = new sqlite3.Database('./db/database.sqlite', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to SQLite database.');
    }
});

// Tworzenie tabel
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        content TEXT NOT NULL
    )`);
    db.run(`CREATE TABLE IF NOT EXISTS images (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filepath TEXT NOT NULL
    )`);
});

// Konfiguracja multer (przesyłanie zdjęć)
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

// API do logowania (symulowane)
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        res.status(200).json({ message: 'Zalogowano pomyślnie!' });
    } else {
        res.status(401).json({ message: 'Nieprawidłowa nazwa użytkownika lub hasło!' });
    }
});

// API do dodawania wpisów
app.post('/add-post', (req, res) => {
    const { content } = req.body;
    db.run(`INSERT INTO posts (content) VALUES (?)`, [content], function (err) {
        if (err) {
            res.status(500).json({ message: 'Błąd zapisu wpisu.' });
        } else {
            res.status(200).json({ message: 'Wpis zapisany!', id: this.lastID });
        }
    });
});

// API do pobierania wpisów
app.get('/posts', (req, res) => {
    db.all(`SELECT * FROM posts`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Błąd pobierania wpisów.' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// API do przesyłania zdjęć
app.post('/upload-image', upload.single('image'), (req, res) => {
    const filepath = req.file.path;
    db.run(`INSERT INTO images (filepath) VALUES (?)`, [filepath], function (err) {
        if (err) {
            res.status(500).json({ message: 'Błąd przesyłania zdjęcia.' });
        } else {
            res.status(200).json({ message: 'Zdjęcie zapisane!', filepath });
        }
    });
});

// API do pobierania zdjęć
app.get('/images', (req, res) => {
    db.all(`SELECT * FROM images`, [], (err, rows) => {
        if (err) {
            res.status(500).json({ message: 'Błąd pobierania zdjęć.' });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Uruchomienie serwera
app.listen(port, () => {
    console.log(`Serwer działa na http://localhost:${port}`);
});
