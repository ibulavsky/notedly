const mongoose = require('mongoose');

// Schema
const noteSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true
    },
    author: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);
// Note model with noteSchema
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;