const express = require("express")
const router = express.Router();
const multer = require('multer') //multer để load file...
const upload = multer();
const controller = require("../../controllers/admin/my-account_controller");   
const uploadCloud = require("../../middlewares/admin/uploadCloud_middleware");
router.get('/',controller.index);//từ hàm controller ta sử dụng hàm index
router.get('/edit',controller.edit);//từ hàm controller ta sử dụng hàm index
router.patch('/edit',
    upload.single('avatar'),
    uploadCloud.upload,
    controller.editPatch);//từ hàm controller ta sử dụng hàm index
module.exports=router;