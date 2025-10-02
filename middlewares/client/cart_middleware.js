const Cart = require("../../models/cart_model.js")
module.exports.cartId =async (req,res,next)=>{

     // Bỏ qua request cho static files
     if (
        req.url.startsWith("/js") || 
        req.url.startsWith("/css") || 
        req.url.startsWith("/images") ||
        req.url.startsWith("/.well-known")
    ) {
        return next();
    }
    if(!req.cookies.cartId){
    const cart = new Cart();
    await cart.save();
    const expiresTime= 1000*60*60*24*365; //thời gian 1 năm
    res.cookie("cartId",cart.id,{ // set thêm thời gian cho cookie nếu không chỉ lưu trên 1 phiên
        expires: new Date (Date.now()+expiresTime)
    });//tạo cookies và lưu 
   }
   else { // khi đã có giỏ hàng
        const cart = await Cart.findOne({
            _id:req.cookies.cartId
        });
        cart.totalQuantity = cart.products.reduce((sum,item)=>sum+item.quantity,0)
        //hàm reduce giúp tính tổng quantity trong mảng products
        res.locals.miniCart = cart;

   }
    
    next();
    
}