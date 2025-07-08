const mongoose = require("mongoose")
const Schema = mongoose.Schema 

const productSchema = new Schema({
    productName:{
        type:String,
    },
    price:{
        type:Number,
    },  
    quantity:{
        type:Number,
    },
    sizes:[
        {
            type:String
        },
    ]
})

module.exports = mongoose.model("product",productSchema)