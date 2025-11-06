const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express()
const port = 3000;

const json_file = path.join(__dirname, "data.json");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function ensureDataFile() {
  if (!fs.existsSync(json_file)) {
    fs.writeFileSync(json_file, JSON.stringify({ tasks: [] }, null, 2));
  }
}

app.get("/load", (req, res) => {
  ensureDataFile();
  const raw = fs.readFileSync(json_file, "utf8");
  res.type("application/json").send(raw);
});

app.post("/save", (req, res) => {
  try {
    fs.writeFileSync(json_file, JSON.stringify(req.body, null, 2));
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: "Failed to write file" });
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})
