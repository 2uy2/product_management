const mongoose = require("mongoose");
const generate = require("../helpers/generate");
const accountSchema = new mongoose.Schema({
    fullName:String,
    email:String,
    password:String,
    token :String,
    phone:String,
    avatar:String,
    role_id:String,
    status:String,

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
const Account = mongoose.model("Account",accountSchema, "accounts");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = Account;