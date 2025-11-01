const express = require("express")
const router = express.Router();

const controller = require("../../controllers/client/users_controller");   
router.get('/not-friend',controller.notFriend);//từ hàm controller ta sử dụng hàm index

module.exports=router;