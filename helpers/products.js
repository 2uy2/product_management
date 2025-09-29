// tính lại giá 1 mảng sản phẩm
module.exports.priceNewProducts = (products)=>{
    //tính giá cũ giá mới
    const newProducts= products.map(item =>{ // phải dùng map để tạo mảng mới , không thay đổi mảng cũ
        item.priceNew=(item.price*(100-item.discountPercentage)/100).toFixed(0);
        return item;
    })
    return newProducts;
}
//tính giá 1 sản phẩm
module.exports.priceNewProduct = (product)=>{
    //tính giá cũ giá mới
   const priceNew=(product.price*(100-product.discountPercentage)/100).toFixed(0);
   return priceNew;
}