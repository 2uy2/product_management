const express = require("express")
const multer = require('multer') //multer để load file...
const router = express.Router();
const upload = multer();

const controller = require("../../controllers/admin/product-category_controller");
const validate = require("../../validates/admin/product-category_validate.js");
const uploadCloud = require("../../middlewares/admin/uploadCloud_middleware");


router.get('/', controller.index); 
router.get('/create', controller.create); 

router.post(
    `/create`,
    upload.single('thumbnail'),
    uploadCloud.upload,
    
    validate.createPost, 
    controller.createPost);

module.exports = router;