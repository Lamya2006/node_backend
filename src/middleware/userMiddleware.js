const validateUserRequest = async(req,res)=>{
    if(req.body.name)
    {
        if(req.name.Trim().length>0)
        {
            console.log("valid...")
            next()
        }
        else{
            res.json({
                message:"product name must have value"
            })
        }
    }
    else{
        res.json({
            message:"product name must be valid"
        })
    }
}

module.exports = validateUserRequest