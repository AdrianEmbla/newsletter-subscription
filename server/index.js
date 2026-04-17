const express = require("express");
const cors = require("cors");
const path = require("path");
const subscribeRouter = require("./routes/subscribe");
const unsubscribeRouter = require("./routes/unsubscribe");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/subscribe", subscribeRouter);
app.use("/api/unsubscribe", unsubscribeRouter);

if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "..", "dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server kjører på port ${PORT}`);
});
