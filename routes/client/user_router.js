const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/user_controller");   
const validate = require("../../validates/client/user_validate");   

router.get('/register',controller.register);//từ hàm controller ta sử dụng hàm register
router.post('/register',validate.registerPost,controller.registerPost);//từ hàm controller ta sử dụng hàm register

module.exports=router;