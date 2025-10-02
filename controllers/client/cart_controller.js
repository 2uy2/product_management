const Cart = require("../../models/cart_model");
// post cart//add/:productId
module.exports.addPost = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId; // lấy id product đc thêm vào giỏ hàng
    const quantity = parseInt(req.body.quantity); //lấy ra số lượng từ form
    const cart = await Cart.findOne({
        _id: cartId
    })
    const existProductInCart = cart.products.find(item => item.product_id == productId);
    //hàm find trong JS giúp tìm kiếm điều kiện trong mảng, tác dụng câu lệnh 
    // trên là lấy ra phần tử trong mảng đó
    if (existProductInCart) { //nếu sản phẩm đã có trên giả hàng trc đó r thì chỉ cần
    // cập nhật quantity
        const newQuantity = existProductInCart.quantity+quantity;
        await Cart.updateOne({//cú pháp cập nhật giá trị mảng trong hàm của data trong mongoo
            _id:cartId,
            'products.product_id':productId //cú pháp tìm kiếm
        },{
            'products.$.quantity':newQuantity
        });
    } else {
        const objectCart = {
            product_id: productId,
            quantity: quantity
        }
        await Cart.updateOne({
            _id: cartId
        }, {
            $push: {
                products: objectCart
            }
        })
    }
    req.flash("success", "thêm vào giỏ hàng thành công")
    res.redirect(req.get("referer"));
}