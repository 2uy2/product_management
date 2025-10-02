const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    // user_id:String,
    cart_id:String,
    userInfo:{
        fullName:String,
        phone:String,
        address:String
    },
    products:[
        {
            product_id:String,
            quantity:Number,
            price:Number,
            discountPercentage:Number
        }
    ]
    },

    {timestamps:true}
);
const Order = mongoose.model("Order",orderSchema, "orders");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khung, tham số ba là bảng dữ liệu
module.exports = Role;