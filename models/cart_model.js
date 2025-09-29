const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    user_id:String,
    products:[
        {
            product_id:String,
            quantity:Number
        }
    ]
    },

    {timestamps:true}
);
const Role = mongoose.model("Carts",cartSchema, "carts");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khung, tham số ba là bảng dữ liệu
module.exports = Role;