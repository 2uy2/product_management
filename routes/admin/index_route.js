const systemConfig = require("../../config/system");
const dashboarRoute = require("./dashboard_route")
const productRoute = require("./product_route")
module.exports = (app)=>{
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN+"/dashboard",dashboarRoute);
    app.use(PATH_ADMIN+"/products",productRoute);

};