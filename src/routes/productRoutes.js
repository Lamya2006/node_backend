const router = require("express").Router()
const varify = require("../middleware/verifyUser")

const productContoller = require("../controller/productController");
const validateUserRequest = require("../middleware/userMiddleware");

router.get("/getProducts",varify.verifyUser,productContoller.getProducts)
router.post("/addProducts",validateUserRequest,productContoller.addProducts)
router.delete("/deleteProducts/:id",productContoller.deleteProducts)
router.put("/addSize/:id",productContoller.addSize)

module.exports = router
 
