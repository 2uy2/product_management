const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/user_controller");   
const validate = require("../../validates/client/user_validate");   

router.get('/register',controller.register);//từ hàm controller ta sử dụng hàm register
router.post('/register',validate.registerPost,controller.registerPost);//từ hàm controller ta sử dụng hàm register
router.get('/login',controller.login);
router.post("/login",validate.loginPost, controller.loginPost);
router.get("/logout", controller.logout);


module.exports=router;