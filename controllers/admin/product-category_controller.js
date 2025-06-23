const ProductCategory = require("../../models/product-category_model")
const systemConfig = require("../../config/system");

// get /admin/products-category
module.exports.index= async (req, res) => {  
    let find = {
        deleted: false
    };
    const records = await ProductCategory.find(find);
    res.render("admin/pages/products-category/index",{
        pageTitle:"danh much sản phẩmmmm",
        records: records,
        
    });
}
// get /admin/products-category/create
module.exports.create= async (req, res) => {  
    
    res.render("admin/pages/products-category/create",{
        
        pageTitle:"tạo danh mục",
        
    });
}
//[post] admin/products-category/create
module.exports.createPost = async (req, res) => {
    if (req.body.position==""){
        const count= await ProductCategory.countDocuments();
        req.body.position = count + 1;
    }
    else {
        req.body.position = parseInt(req.body.position);
    }    
    const records = new ProductCategory(req.body);
    await records.save();
    req.flash("success",`Bạn đã thêm mới danh mục thành công`);
    res.redirect(`${systemConfig.prefixAdmin}/products-category`);
    
}
//END [post] admin/products/create