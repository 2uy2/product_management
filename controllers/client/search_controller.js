const Product = require("../../models/product_model");
const productsHelper = require("../../helpers/products");
//[get] /search/
module.exports.index= async(req,res)=>{
    const keywork = req.query.keywork;
    const keywordRegex= new RegExp(keywork,"i");
    if(keywork){
        const products = await Product.find({
            status:"active",
            title:keywordRegex,
            deleted:false,
        })
        var newProducts = productsHelper.priceNewProducts(products);
    }
    res.render("client/pages/search/index",{
        pageTitle:"Kết quả tìm kiếm",
        keywork:keywork,
        products:newProducts
    });
}