# Newsletter - App

A GDPR-compliant newsletter subscription and unsubscription app built with React, Node.js/Express, and SQLite.

## Tech Stack

- **Frontend**: React 19 + Vite 8
- **Backend**: Node.js + Express 5
- **Database**: SQLite via better-sqlite3

## Features

- Subscribe to newsletters (ToLOVE-Ru, ToLOVE-Ru - Darkness, ToLOVE-Ru - Motto, Anime, Manga)
- Unsubscribe via email
- Frontend and backend validation
- GDPR-compliant consent tracking with timestamp
- Responsive design
- Accessible (semantic HTML, ARIA attributes, keyboard navigation)
- Privacy policy page (personvern.html

## Project Structure

```
newsletter-subscription/
├── server/
│ ├── index.js # Express app
│ ├── db.js # SQLite connection + table setup
│ ├── validation.js # Shared validation logic
│ └── routes/
│ ├── subscribe.js # POST /api/subscribe
│ └── unsubscribe.js # POST /api/unsubscribe
├── src/
│ ├── main.jsx # React entry
│ ├── App.jsx # Main layout
│ ├── App.css # Styling
│ └── components/
│ ├── SubscribeForm.jsx
│ └── UnsubscribeForm.jsx
├── public/
│ └── personvern.html # Privacy policy
├── index.html # Vite entry
├── vite.config.js
├── Dockerfile
└── package.json)
```

## Getting Started

### Install depenencies

```bash
npm install
```

Development

```bash
node server/index.js

npx vite
```

Production Build

```bash
npm run build
npm start
```

Docker

```bash
docker build -t newsletter .
docker run -p 3000:3000 newsletter
```

## API

### POST /api/subscribe

- **Request Body**:

```json
{
  "navn": "Rito Yuuki",
  "email": "rito@example.com",
  "nyhetsbrev": "ToLOVE-Ru - Darkness",
  "samtykke": true,
  "samtykke_tidspunkt": "2024-06-05T12:34:56"
}
```

| Status | Response                                               |
| ------ | ------------------------------------------------------ |
| 201    | { "message": "Abonnement registrert" }                 |
| 400    | { "errors": ["Navn er påkrevd", ...] }                 |
| 409    | { "errors": ["E-postadresse er allerede registrert"] } |

## POST /api/unsubscribe

- **Request Body**:

```json
{
  "email": "rito@example.com"
}
```

| Status | Response                               |
| ------ | -------------------------------------- |
| 200    | {"message": "Abonnement fjernet"}      |
| 400    | {"errors": ["Ugyldig e-postadresse"]}  |
| 404    | {"error": "E-postadresse ikke funnet"} |

## Database

SQLite database stored in `newsletter.db`. Table `abonnenter`:

| Column             | Type    | Constraint      |
| ------------------ | ------- | --------------- |
| id                 | INTEGER | PRIMARY KEY     |
| navn               | TEXT    | NOT NULL        |
| email              | TEXT    | NOT NULL UNIQUE |
| nyhetsbrev         | TEXT    | NOT NULL        |
| samtykke_tidspunkt | TEXT    | NOT NULL        |

## GDPR

- Consent timestamp recorded on subscription
- Data delete on subscription
- Privacy policy available at /personvern.html
- GDPR routines for access, rectification, and deletion documented in `db.js`
