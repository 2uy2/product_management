const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const userSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    tokenUser :{
        type:String,
        default:generate.generateRandomString(20)
    },
    phone:String,
    avatar:String,

    friendList:[
        {
            user_id:String,
            room_chat_id:String
        }

    ],
    acceptFriends:Array,//mảng người gửi yêu cầu cho user
    requestFriends:Array,//mảng user gửi yêu cầu cho user khác

    
    status:{
        type:String,
        default:"active"
    },

    deleted :{
        type:Boolean,
        default:false // giá trị mặc định nếu người ta k xét thì sẽ là false 
    },
    deletedAt : Date // tự thêm trường dữ liệu
    },
    {
    timestamps: true // thời gian khởi tạo
    }
);
const User = mongoose.model("User",userSchema, "users");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = User;