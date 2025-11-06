const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express()
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use((req, res) => {
  res.status(404).send("Route not found");
});

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
})
