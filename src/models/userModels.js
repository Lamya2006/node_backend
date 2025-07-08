const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const userSchema = new Schema({
    name:{
        type:String,
    },
    age:{
        type:Number,
    },
    email:{
        type:String,
    },
})

module.exports = mongoose.model("user",userSchema)