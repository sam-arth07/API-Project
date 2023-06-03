const mongoose = require("mongoose")

//create Author Schema
const AuthorSchema = mongoose.Schema(
    {
        id:Number,
        name:String,
        books:[String]
    }
)

//create Author Model
const AuthorModel = mongoose.model("author",AuthorSchema)

//exporting the model
module.exports = AuthorModel