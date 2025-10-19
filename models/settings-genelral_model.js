const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema({
    websiteName:String,
    logo:String,
    phone:String,
    email:String,
    address:String,
    copyright:String, 
  },
  {
    timestamps: true // thời gian khởi tạo
  }
);
const SettingGeneral = mongoose.model("SettingGeneral",settingSchema, "settings-general");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khung, tham số ba là bảng dữ liệu
module.exports = SettingGeneral;