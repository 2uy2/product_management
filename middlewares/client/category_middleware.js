const ProductCategory = require("../../models/product-category_model");
const createTreeHelper = require("../../helpers/createTree");
module.exports.category=async (req,res,next)=>{
    // Bỏ qua request cho static files
     if (
        req.url.startsWith("/js") || 
        req.url.startsWith("/css") || 
        req.url.startsWith("/images") ||
        req.url.startsWith("/.well-known")
    ) {
        return next();
    }
    const productsCategory = await ProductCategory.find({
        deleted:false,
    });
    const newProductsCategory = createTreeHelper.tree(productsCategory);
    res.locals.layoutProductsCategory= newProductsCategory; //biến toàn cục cho phần views
    
    
    next();
}