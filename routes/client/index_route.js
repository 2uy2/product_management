const categoryMiddleware = require("../../middlewares/client/category_middleware")

const productsRoutes = require("./products_route");// khai báo file product_router
const homeRoutes = require("./home_route");// khai báo file home_router
const searchRoutes = require("./search_route");
module.exports = (app)=>{
    app.use(categoryMiddleware.category) // bởi vì trang client lúc 
    // nào cũng dùng productsCategory-Tree nên ta dùng app use, tức là tất cả 
    // router đều có thể sử dụng middleware categoryMiddleware
    app.use("/",homeRoutes);
    app.use("/products",productsRoutes); // gọi file productRoute.JS,
                                        // vì đã dình get bên file productRoute.Js
                                        //  nên bên này dùng câu lệnh use

    app.use("/search",searchRoutes);
};