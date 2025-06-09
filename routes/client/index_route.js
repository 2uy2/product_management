const productsRoutes = require("./products_route");// khai báo file product_router
const homeRoutes = require("./home_route");// khai báo file home_router

module.exports = (app)=>{
    app.use("/",homeRoutes);
    app.use("/products",productsRoutes); // gọi file productRoute.JS,
                                        // vì đã dình get bên file productRoute.Js
                                        //  nên bên này dùng câu lệnh use
};