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
  res.sendFile(__dirname + '/Develop/public/index.html');
});

app.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/Develop/public/notes.html');
});

// API routes
app.get('/api/notes', (req, res) => {
  const notes = require('./db.json');
  res.json(notes);
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;

  const notes = require('./db.json');

  newNote.id = /* Generate a unique ID here */;

  notes.push(newNote);

// updated notes array back to the db.json file
  fs.writeFileSync('./db.json', JSON.stringify(notes));

  // Respond created note
  res.json(newNote);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

