const multer = require("multer")
const uploadfileinCloundary = require("../util/CloudnaryUtil.js")
const path = require("path")
const readData = require("../util/readDataFromExcel.js")
const studentModel = require("../models/studentModel.js")

const storage = multer.diskStorage({
    destination:"./upload",
    filename: (req,file,cb)=>{
        cb(null,file.originalname)
    }
})



const fileFilter = (req,file,cb) =>{
    const allowType = /png|jpeg|jpg|gif/
    const extent = allowType.test(path.extname(file.originalname).toLowerCase())
    const mimeType = allowType.test(file.mimetype)
    console.log(mimeType)
    if(extent && mimeType)
    {
        return cb(null,true)
    }
    else
    {
        return cb(new Error("only images are allowed"),false)
    }
}

const upload = multer({
    storage:storage,
    // fileFilter:fileFilter
}).single("profilepic")

const uploadFile = async(req,res) =>{
    upload(req,res,async(err) =>{
        if(err)
        {
            res.status(500).json({
                message:"error while uploading file....",
                data:err.message
            })
        }else{
            
            // const cloudnaryResponse = await uploadfileinCloundary(req.file.path);
            // console.log(req.body)
            const excelData = readData(req.file.path)
            console.log(excelData)    
            await studentModel.insertMany(excelData)

            res.status(201).json({
                message:"file"+req.file.originalname+"is uploaded successfully..",
                data: req.file,
                // cloundanryresponse: cloudnaryResponse
            })
        }
    })
    
}

module.exports = {
    uploadFile,
};