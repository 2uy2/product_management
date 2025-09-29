const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/cart_controller");   
router.post('/add/:productId',controller.addPost);//từ hàm controller ta sử dụng hàm index

module.exports=router;