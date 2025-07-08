const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
},{timestamps:true})
module.exports = mongoose.model("employee",employeeSchema)