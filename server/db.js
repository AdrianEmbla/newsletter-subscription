const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

// Ensure data/ directory exists
fs.mkdirSync(path.join(__dirname, "..", "data"), { recursive: true });

// Open/create database
const db = Database(path.join(__dirname, "..", "data", "newsletter.db"));

// Create table
db.exec(
  `CREATE TABLE IF NOT EXISTS abonnenter (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    navn TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    nyhetsbrev TEXT NOT NULL,
    samtykke_tidspunkt TEXT NOT NULL)`,
);

// GDPR - Registreres rettigheter (personvernforordningen):
// Innsyn:   db.prepare(`SELECT * FROM abonnenter WHERE email = ?`).get(email)
// Retting:  db.prepare(`UPDATE abonnenter SET navn = ? WHERE email = ?`).run(navn, nyhetsbrev, email)
// Sletting: db.prepare(`DELETE FROM abonnenter WHERE email = ?`).run(email)

// GDPR - Begrenset lagringstis:
// Sett opp periodisk gjennomgang/sletting av gamle poster, f.eks.:
// db.prepare(`DELETE FROM abonnenter WHERE samtykke_tidspunkt < ?`).run(grensedato)

module.exports = db;