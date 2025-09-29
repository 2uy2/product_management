const Product = require("../../models/product_model")
const productsHelper = require("../../helpers/products")
// get /index
module.exports.index= async (req, res) => {
    //lấy ra phần nổi bật(featured)
    const productsFeatured = await Product.find({
        featured:"1",
        deleted:false,
        status:"active",
    }).limit(6);
    //tính giá khi giảm khuyến mãi
    const newProductsFeatured = productsHelper.priceNewProducts(productsFeatured);
    //hiển thị danh sách sản phẩm mới nhất
    const productsNew = await Product.find({
        deleted:false,
        status:"active",

    }).sort({
        position:"desc"
    }).limit(6);
    //tính giá khi giảm khuyến mãi
    const newProductsNew = productsHelper.priceNewProducts(productsNew);
    
    res.render("client/pages/home/index",{
        pageTitle: "trang chủ",
        productsFeatured:newProductsFeatured,
        productsNew:newProductsNew
    });             
}