const Cart = require("../../models/cart_model");
const Product = require("../../models/product_model");
const Order = require("../../models/order_model");
const productsHelper = require("../../helpers/products")
//get /checkout
module.exports.index = async (req, res) => {

    const cartId = req.cookies.cartId;
    const cart = await Cart.findOne({
        _id: cartId,

    });
    if (cart.products.length > 0) {
        for (const item of cart.products) {
            const productId = item.product_id;
            const productInfo = await Product.findOne({
                _id: productId
            })
            productInfo.priceNew = productsHelper.priceNewProduct(productInfo);
            item.productInfo = productInfo;
            item.totalPrice = item.quantity * productInfo.priceNew
        }

    }
    cart.totalPrice = cart.products.reduce((sum, item) => sum + item.totalPrice, 0);
    console.log(cart)

    res.render("client/pages/checkout/index", {
        pageTitle: "Đặt hàng",
        cartDetail: cart
    })
}
// POST /checkout/order
module.exports.order = async (req, res) => {
    const cartId = req.cookies.cartId;
    const userInfo = req.body;
    const cart = await Cart.findOne({
        _id: cartId
    });
    let products = [

    ];
    for (const product of cart.products) {
        const objectProduct = { //tạo ra một object rồi push product có trong giỏ hàng vào
            product_id: product.product_id,
            price: 0,
            discountPercentage: 0,
            quantity: product.quantity
        };
        const productInfo = await Product.findOne({ // từ product trong cart ta tìm đến data product để tìm kiếm giá và thông tin khách            _id:product.product_id,
            _id:product.product_id
        })
        objectProduct.price = productInfo.price;
        objectProduct.discountPercentage = productInfo.discountPercentage;

        products.push(objectProduct); //thêm object vừa tạo vào mảng tạo trước đó
    }
    // console.log(products)
    const objectOrder = { // tạo 1 oject để gắn data vào bảng order
        // user_id:String,
        cart_id: cartId,
        userInfo: req.body,
        products: products
    };
    const order = new Order(objectOrder);
    await order.save();
    await Cart.updateOne({
        _id:cartId,

    },{
        products:[] // cập nhật lại sản phẩm trong giỏ hàng thành rỗng sau khi mua hàng
    })
    for (const product of order.products) { // cập nhật stock trong product
        const product1 = await Product.findOne({
            _id:product.product_id
        });
        const stock1 = product1.stock;
        await Product.updateOne({
            _id:product.product_id
        },{
            stock:stock1-product.quantity
        })
    }
    res.redirect(`/checkout/success/${order.id}`)
}