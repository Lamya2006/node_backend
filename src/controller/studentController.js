const studentSchema = require("../models/studentModel")

const sendingMail = require("../util/mail")
const jwt = require("jsonwebtoken")

const secret = "student"

const getStudent = async(req,res)=>{

    const student = await studentSchema.find();
    res.json({
        message:"data fetch",
        data:student
    })
}
// const createStudent = async(req,res)=>{


//     // const hashedPassword = encrypt.encryptData(req.body.password)
//     // req.body.password = hashedPassword
    
//     try{
//     const savedStudent = await studentSchema.create(req.body)
//     const token = jwt.sign(savedStudent.toObject(),secret)
    
//     sendingMail(savedStudent.email,"welcome mail",`welcome to portal and your token = ${token}`)

//     res.status(201).json({
//         message:"student saved..."
//     })
//     }catch(err){
//         res.status(501).json({
//             message:"student not saved."
//         })
//     }

// }
const createStudent = async (students) => {
    console.log("enterd the createStudent method")
    try {
        console.log("entered the try")
        // await studentSchema.collection.dropIndex("email_1");
        const savedStudents = await studentSchema.insertMany(students, { ordered: false });
        // console.log("Students added successfully.", savedStudents);
    } catch (err) {
        if (err.code === 11000) {
            console.warn("Some students were not added due to duplicate emails.");
        }
        console.error("Error adding students:", err.message);
    }
};
const deleteAfter5min = async () => {
    console.log("Entered deleteAfter5min");

    const now = new Date();  
    const fiveMinAgo = new Date(now.getTime() - 5 * 60 * 1000);  

    try {
        const students = await studentSchema.find({
            createdAt: { $gte: fiveMinAgo } // Find students added 5 min ago
        });

        console.log("Students to delete:", students);

        if (students.length > 0) {
            await studentSchema.deleteMany({ createdAt: { $gte: fiveMinAgo } });
            console.log("Deleted students added 5 minutes ago.");
        } else {
            console.log("No students found to delete.");
        }
    } catch (err) {
        console.error("Error deleting students:", err);
    }
};


const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedStudent = await studentSchema.findByIdAndDelete(id);
        
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found." });
        }

        res.json({ message: "Student deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error deleting student." });
    }
};


const verifyUser = async(req,res)=>{

    //verify...
}
const deleteAllStudents = async (req, res) => {
    try {
        await studentSchema.deleteMany({}); // Deletes all documents in the collection
        res.json({ message: "All students deleted successfully." });
    } catch (err) {
        res.status(500).json({ message: "Error deleting students.", error: err.message });
    }
};


module.exports = {
    createStudent,
    getStudent,
    deleteStudent,
    deleteAllStudents,
    deleteAfter5min 
};
