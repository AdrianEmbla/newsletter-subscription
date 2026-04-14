const express = require(express);
const router = express.Router();
const db = require("../database");
const { validateEmail } = require("../validation");

const deleteStmt = db.prepare("DELETE FROM abonnenter WHERE email = ?");

router.post("/", (req, res) => {
  const { valid, errors } = validateEmail(req.body);
  if (!valid) {
    return res.status(400).json({ errors });
  }

  const result = deleteStmt.run(req.body.email);

  if (result.changes === 0) {
    return res.status(404).json({ error: "E-postadressen ble ikke funnet" });
  }

  res.status(200).json({ message: "Abonnement fjernet" });
});

module.exports = router;
