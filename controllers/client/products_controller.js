const Product = require("../../models/product_model"); // nhúng model product
const ProductCategory = require("../../models/product-category_model")
const productsHelper = require("../../helpers/products")
const productsCategoryHelper = require("../../helpers/products-category")
// [GET] /products
module.exports.index = async (req, res) => {
  const products = await Product.find({//thêm các tuỳ chọn khi xuất data
    status:"active",
    deleted:false ,

  }).sort({position: "desc"});
  const newProducts = productsHelper.priceNewProducts(products);

   
  res.render("client/pages/products/index.pug", {
    products: newProducts,// kết nối dữ liệu bằng 1 biến
    pageTitle: "Sản Phẩm"
  });
}

//[get]/product/:slugCategory
module.exports.category = async (req, res)=>{
  const category = await ProductCategory.findOne({
    slug:req.params.slugCategory,
    deleted:false
  })
  // xử lí sản phẩm có children category,nếu click vào cha thì cũng sẽ hiện sản phẩm con nhỏ khác
  const listSubCategory= await productsCategoryHelper.getSubCategory(category.id);//lấy ra các category con
  const listSubCategoryId=listSubCategory.map(item=>{ //lấy ra id của các category con cần tìm
    return item.id
  })
  const products =  await Product.find({
    product_category_id:{$in:[category.id,...listSubCategoryId]},//hàm in trong mongo giúp 
    // gán thêm các điều kiện giá trị khác cần tìm trong biến model đó
    deleted:false,
    status:"active"
  }).sort({
    position:"desc"
  });
  const newProducts = productsHelper.priceNewProducts(products);//trả ra giá mới
  res.render("client/pages/products/index",{
    pageTitle:category.title,
    products:newProducts
  })
}

//[get]/product/detail:slugProduct
module.exports.detail = async (req, res)=>{
  try {
    const find={
      deleted:false,
      slug:req.params.slugProduct,
      status:"active"
    }
    const product = await Product.findOne(find); 
   if(product.product_category_id){
    const category = await  ProductCategory.findOne({
      _id:product.product_category_id,
      deleted:false,
      status:"active"
    });
    product.category=category;//khi lấy ra được title category của product đó
   }
    product.priceNew=productsHelper.priceNewProduct(product);

    res.render("client/pages/products/detail", {
        pageTitle:product.title,
        product:product,
    });
        
  }
  catch (error) {
    res.redirect(req.get("referer"));
  }
}