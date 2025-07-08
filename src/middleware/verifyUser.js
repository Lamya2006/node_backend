const jwt = require("jsonwebtoken")
const secret ="royal"

const verifyUser = (req,res,next)=>{
    var token = req.headers.authorization;

    if(token){

        if(token.startsWith("Bearer ")){
        token = token.split(" ")[1]

        try{

            const user  = jwt.verify(token,secret);
            next()

        }catch(err){

            res.status(401).json({
                message:err
            })
        }
    }else{
        res.status(401).json({
            message:"only Bearer token is valid"
        })
    }


        
    }else{
        res.status(401).json({
            message:"please provide token"
        })
    }
}

module.exports = 
{
    verifyUser
}