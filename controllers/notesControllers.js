const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const User = require("../models/User");



// Post

const createNewNote = asyncHandler(async (req, res) => {
  const { user, title, text } = req.body;

  if (!user || !title || !text) {
    res.status(400).send("Your information not complete boyaa");
  }
  const duplicate = await Note.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate !== null) {
    return res.status(409).json({ message: "Duplicate Note Title" });
  }

  const noteObject = { user, title, text };
  
  const newNote = await Note.create(noteObject);
  console.log(newNote);

  if (newNote) {
    return res.status(200).send(newNote);
  } else {
    return res.status(400).send({
      message: "new note not create",
    });
  }
});

////////////////////////////////////////////////////////////

//Get

const getAllNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find().lean()
  
  if (!notes?.length) {
    return res.status(400).send
  }

  const notesWithuUser = await Promise.all(notes.map(async (note) => {
    const user = await User.findById(note.user).lean().exec()
    return {...note , username : user.username}
  }))
res.json(notesWithuUser)
})

////////////////////////////////////////////////////////////

//Update
const updateNote = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.send(req.body);
})



////////////////////////////////////////////////////////////

//Delete
const deleteNote = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.send(req.body)
});


////////////////////////////////////////////////////////////
module.exports = {
  createNewNote,
  getAllNotes,
  updateNote,
  deleteNote,
};