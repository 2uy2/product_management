const express = require("express")
const router = express.Router();
const controller = require("../../controllers/admin/dashboard_controller");   
router.get('/',controller.dashboard);//từ hàm controller ta sử dụng hàm index
module.exports=router;