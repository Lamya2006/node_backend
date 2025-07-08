const router = require("express").Router()

const userController = require("../controller/userController")

router.get("/user",userController.getUsers)
module.exports = router