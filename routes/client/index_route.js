const homeRoute = require("./home_route");
const productRoute = require("./products_route");
const searchRoute = require("./search_route");
const cartRoute = require("./cart_route");

const categoryMiddleware = require("../../middlewares/client/category_middleware");
const cartMiddleware = require("../../middlewares/client/cart_middleware");

module.exports = (app) => {

    
    app.use(categoryMiddleware.category); // bởi vì trang client lúc 
    // nào cũng dùng productsCategory-Tree nên ta dùng app use, tức là tất cả 
    // router đều có thể sử dụng middleware categoryMiddleware
    app.use(cartMiddleware.cartId);

    app.use("/", homeRoute);

    app.use("/products", productRoute); // gọi file productRoute.JS,
    // vì đã dình get bên file productRoute.Js
    //  nên bên này dùng câu lệnh use

    app.use("/search", searchRoute);
    app.use("/cart", cartRoute);

    //   app.use("/cart", cartRoute);
}