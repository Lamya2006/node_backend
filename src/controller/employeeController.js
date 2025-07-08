const employeeSchema = require("../models/employeeModel")
// const encrypt = require("../util/")
const jwt = require("jsonwebtoken")
const secret ="royal"
const mail = require("../util/mail")
const createEmployee = async(req,res)=>{

    const {name,email,password} = req.body;

    //const hashedPassword = encrypt.encryptData(password)
    //const savedEmployee = await employeeSchema.create({name,email,password:hashedPassword})
    const savedEmployee = await employeeSchema.create(req.body)
    
    const token = jwt.sign({id:savedEmployee._id},secret)

    await mail.sendingMail(savedEmployee.email,"Verficaiton",`http://localhost:3000/employee/VerifiedUser?token=${token}`)



  //  mail.sendingMail(savedEmployee.email,"welcome","hello people")
  res.send("ok")

}

const verificationEmployee = (req,res)=>{
    
    const token = req.query.token
    const user = jwt.verify(token,secret)

    res.json({
        message:"user verified"
    })
}

const loginEmployee = async(req,res)=>{

    
    const {email,password} = req.body;
    const foundEmpFromEmail  = await employeeSchema.findOne({email:email})

    if(foundEmpFromEmail){
        const isMatch = encrypt.compareData(password,foundEmpFromEmail.password)
        if(isMatch){

            //token...
            const token = jwt.sign(foundEmpFromEmail.toObject(),secret)
            res.status(200).json({
                message:"user login successfully",
                //data:foundEmpFromEmail
                token:token
            })

        }
        else{
            res.status(401).json({
                message:"password not matched",
            })
        }
    }
    else{
        res.status(404).json({
            message:"user not found.."
        })
    }
    
    




}

module.exports = {
    createEmployee,
    loginEmployee,
    verificationEmployee
}