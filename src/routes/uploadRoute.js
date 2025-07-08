const router = require("express").Router()
const uploadController = require("../controller/uploadController")
router.post("/upload",uploadController.uploadFile)
module.exports = router

