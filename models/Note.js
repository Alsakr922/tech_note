const mongoose = require("mongoose");
const AutoIncrement = require('mongoose-sequence')(mongoose);

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  user: {
    // type: mongoose.Schema.Types.ObjectId,
    type : String,
    required: true,
    // ref: "User",
  },

},
);

noteSchema.plugin(AutoIncrement, {
  inc_field: 'note',
  start_seq: 500,
  id: 'note_id'
})
const Note = mongoose.model("Note", noteSchema);


module.exports = Note;