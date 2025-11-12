const mongoose = require("mongoose");

const roomChatSchema = new mongoose.Schema({
    title: String,
    avatar: String,
    theme: String,
    typeRoom: String, //friend or group
    status: String,
    users: [
        {
            user_id:String,
            role:String,
            
        }
    ],
    deleted :{
        type:Boolean,
        default:false // giá trị mặc định nếu người ta k xét thì sẽ là false 
    },  
    deletedAt: Date // tự thêm trường dữ liệu
}, {
    timestamps: true // thời gian khởi tạo
});
const RoomChat = mongoose.model("RoomChat", roomChatSchema, "rooms-chat");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khung, tham số ba là bảng dữ liệu
module.exports = RoomChat;