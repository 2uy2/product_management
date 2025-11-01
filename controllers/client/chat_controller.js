// const { uploadToCloudinary } = require("../../helpers/uploadToCloudinary");
const Chat = require("../../models/chat_model");
const User = require("../../models/user_model")
const  uploadToCloudinary = require("../../helpers/uploadToCloudinary")
const chatSocket = require("../../sockets/client/chat_socket")

//get /chat
module.exports.index = async (req, res) => {
    
    //socketio
   chatSocket(res)
    //end socketio
    //lấy ra data
    const chats = await Chat.find({
        deleted:false
    });
    for (const chat of chats) {
        const infoUser = await User.findOne({
            _id:chat.user_id
        }).select("fullName");

        chat.infoUser=infoUser;
    }
    
    

    res.render("client/pages/chat/index", {
        pageTitle: "Chat",
        chats:chats
    })
}