const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

// Khởi tạo plugin mongoose-slug-updater
mongoose.plugin(slug);
const productCategorySchema = new mongoose.Schema({
  title: String,
  parent_id:{
    type:String,
    default:"" // giá trị mặc định là rỗng nếu người ta k xét 
  },
  description: String,
 
 
 
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
const ProductCategory = mongoose.model("ProductCategory",productCategorySchema, "products-category");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = ProductCategory;