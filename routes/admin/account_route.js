const express = require("express")
const router = express.Router();
const multer = require('multer') //multer để load file...

const upload = multer();

const uploadCloud = require("../../middlewares/admin/uploadCloud_middleware");



const controller = require("../../controllers/admin/account_controller"); 

const validate = require("../../validates/admin/account_validate");

router.get('/',controller.index);//từ hàm controller ta sử dụng hàm index
router.get('/create',controller.create);
router.post('/create',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.createPost
    ,controller.createPost);

router.get('/edit/:id',controller.edit);

router.patch('/edit/:id',
    upload.single('avatar'),
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch);

module.exports=router;