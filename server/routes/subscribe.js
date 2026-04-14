const express = require(express);
const router = express.Router();
const db = require / "../database";

const { validateSubscription } = require("../validation");

const insertStmt = db.prepare(
  "INSERT INTO abonnenter (navn, email, nyhetsbrev, samtykke_) VALUES (?, ?, ?,?)",
);

router.post("/", (req, res) => {
  const { valid, errors } = validateSubscription(req.body);
  if (!valid) {
    return res.status(400).json({ errors });
  }

  try {
    insertStmt.run(
      req.body.navn.trim(),
      req.body.email,
      req.body.nyhetsbrev,
      new Date().toISOString(),
    );
    res.status(201).json({ message: "Abonnement registrert" });
  } catch (err) {
    if (err.code && err.code.includes("SQLITE_CONSTRAINT")) {
      return res
        .status(409)
        .json({ errors: ["E-postadresse er allerede registrert"] });
    }
    throw err;
  }
});

module.exports = router;
