const express = require('express');
const app = express();
const PORT = process.env.PORT || 4000;
const fs = require('fs'); 
const { v4: uuidv4 } = require('uuid');

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// static files
app.use(express.static('public'));

// routes here
// HTML routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/public/notes.html');
});

// API routes
app.get('/api/notes', (req, res) => {
  const notes = require('./db/db.json');
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  const notes = require('./db/db.json');

  newNote.id = uuidv4();

  notes.push(newNote);

// updated notes
  fs.writeFileSync('./db/db.json', JSON.stringify(notes));

  // Respond created note
  res.json(newNote);
});

app.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;

  const notes = require('./db/db.json');

  // Find the index of the note
  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex !== -1) {
    notes.splice(noteIndex, 1);

    fs.writeFileSync('./db/db.json', JSON.stringify(notes));

    res.json({ message: 'Note deleted' });
  } else {
    res.status(404).json({ error: 'Note not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


