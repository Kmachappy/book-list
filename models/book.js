const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    completed: Boolean,
  },
  { timestamps: true }
);

// const bookModel = mongoose.model('Book', bookSchema)
// module.exports = bookModel
module.exports = mongoose.model("Book", bookSchema);
