const express = require("express")
const multer = require('multer') //multer để load file...
const router = express.Router();
const upload = multer();

const controller = require("../../controllers/admin/product-category_controller");
const validate = require("../../validates/admin/product-category_validate");
const uploadCloud = require("../../middlewares/admin/uploadCloud_middleware");





router.get('/', controller.index); 
router.get('/create', controller.create); 
router.patch("/change-status/:status/:id", controller.changeStatus); //hai chấm để truyền data động
router.patch("/change-multi", controller.changeMulti);
router.delete("/delete/:id", controller.deleteItem); //hai chấm để truyền data động
router.post(
    `/create`,
    upload.single('thumbnail'),
    uploadCloud.upload,
    
    validate.createPost, 
    controller.createPost);


//edit item
router.get('/edit/:id', controller.edit);
router.patch(
    "/edit/:id",
    upload.single('thumbnail'), //gửi ảnh đơn(single) có trường là thumnail
    uploadCloud.upload,
    validate.editPatch,
    controller.editPatch);
//detail item
router.get('/detail/:id', controller.detail);

module.exports = router;