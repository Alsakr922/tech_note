const express = require('express')
const router = express.Router()
const notesControllers = require('../controllers/notesControllers')





  router
    .route("/")
    .post(notesControllers.createNewNote)
    .get(notesControllers.getAllNotes)
  .patch(notesControllers.updateNote)
  .delete(notesControllers.deleteNote);










module.exports = router