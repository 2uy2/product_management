const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/home_controller");   
router.get('/',controller.index);//từ hàm controller ta sử dụng hàm index
module.exports=router;