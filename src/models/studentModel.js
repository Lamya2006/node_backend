const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        sparse: true,
    },
    password:{
        type:String,
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("students",studentSchema)