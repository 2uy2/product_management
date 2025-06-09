const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

// Khởi tạo plugin mongoose-slug-updater
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  position: Number,
  slug: {
    type: String,
    slug: 'title', // Tạo slug dựa trên trường title
    unique: true// Đảm bảo slug là duy nhất
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
const Product = mongoose.model("Product",productSchema, "products");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = Product;