const Product = require("../../models/product_model"); // nhúng model product

// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({//thêm các tuỳ chọn khi xuất data
    status:"active",
    deleted:false ,

  }).sort({position: "desc"});
  const newProducts= products.map(item =>{
    item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
    return item
  })

   console.log(newProducts);
  res.render("client/pages/products/index.pug", {
    products: newProducts,// kết nối dữ liệu bằng 1 biến
    pageTitle: "Sản Phẩm"
  });
}
//[get]/product/:slug
module.exports.detail = async (req, res)=>{
  try {
    const find={
      deleted:false,
      slug:req.params.slug
    }
    const product = await Product.findOne(find); 
    console.log(product);
    res.render("client/pages/products/detail", {
        pageTitle:product.title,
        product:product,
        status: "active"
    });
        
  }
  catch (error) {
    res.redirect(req.get("referer"));
  }
}