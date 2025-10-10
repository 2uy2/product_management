const Cart = require("../../models/cart_model");
const Product = require("../../models/product_model");
const productsHelper = require("../../helpers/products")

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
        await Cart.updateOne({//cú pháp cập nhật giá trị object trong mảng  hàm của data trong mongoo
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
// get /cart
module.exports.index=async (req,res)=>{
    const cartId = req.cookies.cartId ;
    const cart = await Cart.findOne({
        _id:cartId,
          
    });
    if (cart.products.length>0){
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id:productId
            })
            productInfo.priceNew =  productsHelper.priceNewProduct(productInfo);
            item.productInfo=productInfo;
            item.totalPrice=item.quantity*productInfo.priceNew
        }

    }
    cart.totalPrice= cart.products.reduce((sum,item)=>sum+item.totalPrice,0);


    res.render("client/pages/cart/index",{
        pageTitle:"Trang giỏ hàng",
        cartDetail:cart   
    })
}
//get /cart/delete/:poductId
module.exports.delete = async (req, res) => {
    const cartId = req.cookies.cartId ;
    const productId = req.params.productId;
   await Cart.updateOne({
    _id:cartId,
   },
   {
    "$pull":{products:{"product_id":productId}}//truy cập vào products và tìm điều kiện productid
    //hàm pull trong mongoo giúp xoá( ngược lại với push)
   }
)
    req.flash("success","đã xoá sản phẩm khỏi giỏ hàng");
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}
//get /cart/update/:productId/:quantity
module.exports.update = async (req, res) => {
    const cartId = req.cookies.cartId;
    const productId = req.params.productId;
    const quantity = req.params.quantity;
    await Cart.updateOne({
        _id:cartId,
        'products.product_id':productId
    },{
        'products.$.quantity':quantity 
    })
    req.flash("success","đã cạp nhật số lượng")
    res.redirect(req.get("referer"));//khi submit trả về trang trước khi submit
}
//hết cập nhật số lượng trong giỏ hàng