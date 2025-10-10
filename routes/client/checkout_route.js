const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/checkout_controller");   
router.get('/',controller.index);//từ hàm controller ta sử dụng hàm index
router.post('/order',controller.order);
router.get('/success/:orderId',controller.success);

module.exports=router;