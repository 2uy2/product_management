const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  title: String,
  
  description: String,
  permissions :{ // quyền hạn
    type: Array,
    default:[]
  },
  deleted: {
    type:Boolean,
    default:false // giá trị mặc định nếu người ta k xét thì sẽ là false 
  },
  deletedAt : Date // tự thêm trường dữ liệu
  },
  {
    timestamps: true // thời gian khởi tạo
  }
);
const Role = mongoose.model("Role",roleSchema, "roles");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khung, tham số ba là bảng dữ liệu
module.exports = Role;