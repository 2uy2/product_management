const express = require("express"); // liên kết express
const router = express.Router();// làm thay cho phương pháp gán thông thường 
//                                bằng cú pháp Router
const controller = require("../../controllers/client/products_controller");   
router.get('/',controller.index);
router.get("/:slug",controller.detail);
module.exports=router;//thay cho cú pháp export thông thường , 
                        //bằng route vì route là thay cho app, là biến của framework

