const fs = require("fs");
const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const allNotes = require("./db/db.json");

const { v4: uuidv4 } = require("uuid");

app.use(express.static("public"));
app.use(express.json());

app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    let allNotesData = JSON.parse(data);
    res.json(allNotesData);
  });
});
app.post("/api/notes", (req, res) => {
  const newNote = req.body;

  newNote.id = uuidv4();

  allNotes.push(newNote);

  fs.writeFileSync("./db/db.json", JSON.stringify(allNotes));

  res.json(allNotes);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
