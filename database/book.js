const mongoose = require("mongoose")

//create book Schema
const BookSchema = mongoose.Schema(
    {
        ISBN: String,
        title: String,
        pubDate: String,
        language: String,
        numPage: Number,
        author: [Number],
        publications:[Number],
        category: [String]
    }
)

//create Book Model
const BookModel = mongoose.model("books",BookSchema)

//exporting the model
module.exports = BookModel