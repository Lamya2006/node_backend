const productSchema = require("../models/productModel")
const jwt = require("jsonwebtoken")
const secret ="royal"

const getProducts  = async (req,res) =>{

    const products = await productSchema.find();
    res.json({
        message:"products fetched",
        data:products
    })

}



const addProducts  = async (req,res) =>{

    const products = await productSchema.create(req.body);
    res.json({
        message:"products added",
        data:products
    })

}

const deleteProducts  = async (req,res) =>{

    const products = await productSchema.findByIdAndDelete(req.params.id);
    res.json({
        message:"products deleted",
        data:products
    })

}

const addSize = async (req,res) => {

    const id = req.params.id;
    const size = req.body.size;    
    const newproduct = await productSchema.findByIdAndUpdate(id,{ $push: { sizes: size } },{new:true})

    res.status(200).json({
        message:"size added",
        data:newproduct
    })
}



module.exports = {
    getProducts,addProducts,deleteProducts,addSize

}

