const express = require("express")
const router = express.Router();
const multer = require('multer') //multer để load file...
const controller = require("../../controllers/admin/setting_controller"); 
const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud_middleware"); 


router.get('/general',controller.general);//từ hàm controller ta sử dụng hàm index
router.patch('/general',
    upload.single('logo'),
    uploadCloud.upload,
    controller.generalPatch);



module.exports=router;