const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');

// Khởi tạo plugin mongoose-slug-updater
mongoose.plugin(slug);
const productSchema = new mongoose.Schema({
  title: String,
  product_category_id: {
    type: String,
    default:""
  },
  description: String,
  price: Number,
  discountPercentage: Number,
  stock: Number,
  thumbnail: String,
  status: String,
  featured:String,
  position: Number,
  slug: {
    type: String,
    slug: 'title', // Tạo slug dựa trên trường title
    unique: true// Đảm bảo slug là duy nhất
  },
  createdBy:{
    account_id: String,
    createdAt:{
      type:Date,
      default:Date.now
    }
  },
  deleted: {
    type:Boolean,
    default:false // giá trị mặc định nếu người ta k xét thì sẽ là false 
  },
  // deletedAt : Date // tự thêm trường dữ liệu
  deletedBy:{
    account_id:String,
    deletedAt:Date
  },
  updatedBy:[//ta phải lưu ở dạng mảng vì t phải lưu nhiều lần, vì có nhiều lần hoặc nhiều người update
    {
      account_id:String,
      updatedAt:Date
    }
  ]
  },
  {
    timestamps: true // thời gian khởi tạo, và thời gian cập nhật
  }
);
const Product = mongoose.model("Product",productSchema, "products");
//tham số đầu là tên để gọi dữ liệu, tham số hai là khubg, tham số ba là bảng dữ liệu
module.exports = Product;