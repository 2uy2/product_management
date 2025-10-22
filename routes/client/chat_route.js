const express = require("express")
const router = express.Router();
const controller = require("../../controllers/client/chat_controller");   
const { route } = require("./checkout_route");

router.get("/",controller.index);

module.exports = router;