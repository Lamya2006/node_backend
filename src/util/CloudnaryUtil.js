const cloundary = require("cloudinary").v2

const uploadfileinCloundary = async(file)=>{
    cloundary.config({
        cloud_name:"dormhec2l",
        api_key:"451548233998491",
        api_secret:"JAICXwvr98JA5wSp1nryK3J5CtM"
    })

    const response = await cloundary.uploader.upload(file)

    return response 
    
}

module.exports=uploadfileinCloundary