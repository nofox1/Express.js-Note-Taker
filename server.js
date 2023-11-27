const fs = require("fs");
const path = require("path");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

const notes = require("./db/db.json");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/notes", (res, req) => {
  res.json(allNotes.slice(1));
});

app.get("/", (res, req) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (res, req) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("*", (res, req) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

function createNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];

  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}

app.post("/api/notes", (res, req) => {
  const newNote = createNote(req.body, allNotes);
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
