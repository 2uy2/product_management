const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    user_id:String,
    room_chat_id:String,
    content:String,
    images:Array,
    deleted:{
        type:Boolean,
        default:false
    },
    deletedAt:Date
    },

    {timestamps:true}
);
const Chat = mongoose.model("Chat",chatSchema, "chats");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khung, tham số ba là bảng dữ liệu
module.exports = Chat;