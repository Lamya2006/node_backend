const router = require("express").Router()
const studentController = require("../controller/studentController")
router.post("/",studentController.createStudent)
router.get("/getStudent",studentController.getStudent)
router.delete("/deleteStudent/:id",studentController.deleteStudent)
router.delete("/deleteAllStudent",studentController.deleteAllStudents)
router.delete("/deleteAfter5min",studentController.deleteAfter5min)
module.exports = router