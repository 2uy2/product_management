const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/cart_controller");   
router.post('/add/:productId',controller.addPost);//từ hàm controller ta sử dụng hàm index
router.get('/',controller.index)
router.get('/delete/:productId',controller.delete)
router.get('/update/:productId/:quantity',controller.update)
module.exports=router;