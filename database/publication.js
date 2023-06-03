const mongoose = require("mongoose")

//create publication Schema
const PublicationSchema = mongoose.Schema(
    {
        id:Number,
        name:String,
        books:[String]
    }
)

//create Publication Model
const PublicationModel = mongoose.model("publications",PublicationSchema)

//exporting the model
module.exports = PublicationModel